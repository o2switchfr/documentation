/**
 * Classement des résultats de recherche par page.
 *
 * Le plugin renvoie des résultats « bruts » (titres, sections, descriptions, mots-clés, contenu)
 * classés d'abord par type, ce qui fait remonter n'importe quel titre avant un contenu très pertinent.
 * Ici on regroupe par page et on fusionne les classements par type (Reciprocal Rank Fusion),
 * avec un poids par type : un titre ou un mot-clé pèse plus qu'une phrase du contenu.
 */

type PageDocument = {i: number; t: string; u: string; b?: string[]};

export type RawHit = {
  document: PageDocument & {h?: string; s?: string};
  page?: PageDocument | false;
  type: number;
  tokens: string[];
  score: number;
};

export type Row = {
  key: string;
  title: string;
  path: string;
  /** Adresse de destination, sans paramètre de surlignage. */
  url: string;
  /** Vrai si le résultat pointe vers une section précise de la page. */
  isSection: boolean;
  /** Passage du texte qui correspond, affiché seulement quand ni le titre ni les mots-clés ne correspondent. */
  excerpt?: string;
  tokens: string[];
};

const TYPE_TITLE = 0;
const TYPE_HEADING = 1;
const TYPE_AI = 5;

/** Poids par type : titre, section, description, mots-clés, contenu. */
const WEIGHTS = [5, 2.5, 2, 4.5, 1];
/** Constante de la fusion : plus elle est grande, plus les rangs lointains comptent. */
const K = 10;
/** Nombre de correspondances d'une même page qui s'additionnent. */
const MAX_CONTRIBUTIONS = 3;

/**
 * Bonus quand un mot de la requête figure tel quel dans le titre, la section ou les mots-clés.
 * La recherche tolère les fautes de frappe : sans ce bonus, « wp » ressort aussi des pages sur « IP ».
 */
const EXACT_BONUS = 1.6;

const TYPE_DESCRIPTION = 2;
const TYPE_KEYWORDS = 3;
const TYPE_CONTENT = 4;
const EXCERPT_LENGTH = 120;

/** Extrait d'environ 120 caractères autour du premier mot de la requête trouvé dans le texte. */
function excerptOf(text: string, tokens: string[]): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  const lower = clean.toLowerCase();
  let index = -1;
  for (const token of tokens) {
    // On raccourcit le mot pour retrouver ses variantes (« tâche » → « tâches »).
    for (let length = token.length; length >= 4 && index < 0; length--) {
      index = lower.indexOf(token.slice(0, length));
    }
    if (index >= 0) break;
  }
  let start = Math.max(0, index - 40);
  if (start > 0) {
    const space = clean.indexOf(' ', start);
    start = space >= 0 && space < index ? space + 1 : start;
  }
  let end = Math.min(clean.length, start + EXCERPT_LENGTH);
  if (end < clean.length) {
    const space = clean.lastIndexOf(' ', end);
    end = space > start ? space : end;
  }
  return `${start > 0 ? '…' : ''}${clean.slice(start, end)}${end < clean.length ? '…' : ''}`;
}

type Contribution = {value: number; hit: RawHit};

function words(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .split(/[^a-z0-9_]+/)
      .filter(Boolean),
  );
}

function hasExactWord(hit: RawHit): boolean {
  if (hit.type === 4 || hit.type === 2) return false;
  const present = words(hit.document.t);
  return hit.tokens.some((token) => present.has(words(token).values().next().value ?? ''));
}

export function rankPages(hits: RawHit[], max = 10): Row[] {
  const byType = new Map<number, RawHit[]>();
  for (const hit of hits) {
    if (hit.type === TYPE_AI || WEIGHTS[hit.type] === undefined) continue;
    const list = byType.get(hit.type) ?? [];
    list.push(hit);
    byType.set(hit.type, list);
  }

  const pages = new Map<string, {page: PageDocument; contributions: Contribution[]; tokens: Set<string>}>();
  for (const [type, list] of byType) {
    [...list]
      .sort((a, b) => b.score - a.score)
      .forEach((hit, rank) => {
        const page = type === TYPE_TITLE ? hit.document : hit.page;
        if (!page) return;
        const entry = pages.get(page.u) ?? {page, contributions: [], tokens: new Set<string>()};
        const bonus = hasExactWord(hit) ? EXACT_BONUS : 1;
        entry.contributions.push({value: (WEIGHTS[type] * bonus) / (K + rank), hit});
        hit.tokens.forEach((token) => entry.tokens.add(token));
        pages.set(page.u, entry);
      });
  }

  return [...pages.values()]
    .map((entry) => {
      const sorted = [...entry.contributions].sort((a, b) => b.value - a.value);
      const score = sorted.slice(0, MAX_CONTRIBUTIONS).reduce((sum, c) => sum + c.value, 0);
      return {entry, sorted, score};
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(({entry, sorted}) => {
      const section = sorted.find((c) => c.hit.type === TYPE_HEADING)?.hit.document;
      const matchesPageLevel = sorted.some((c) => c.hit.type !== TYPE_HEADING && c.hit.type !== TYPE_CONTENT);
      const matchesByTitle = sorted.some((c) => c.hit.type === TYPE_TITLE || c.hit.type === TYPE_KEYWORDS);
      const excerptHit = matchesByTitle ? undefined : sorted.find((c) => c.hit.type === TYPE_CONTENT || c.hit.type === TYPE_DESCRIPTION)?.hit;
      // On pointe vers la section seulement si la page elle-même ne correspond pas par son titre,
      // sa description ou ses mots-clés.
      const isSection = Boolean(section) && !matchesPageLevel;
      const breadcrumb = [...(entry.page.b ?? []), ...(isSection && section ? [section.t] : [])];
      return {
        key: entry.page.u,
        title: entry.page.t,
        path: breadcrumb.filter(Boolean).join(' › '),
        url: entry.page.u + (isSection && section?.h ? section.h : ''),
        isSection,
        excerpt: excerptHit ? excerptOf(excerptHit.document.t, [...entry.tokens]) : undefined,
        tokens: [...entry.tokens],
      };
    });
}
