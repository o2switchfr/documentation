/**
 * Moteur de recherche de la modale.
 *
 * Il réutilise l'index lunr généré au build par @easyops-cn/docusaurus-search-local, mais remplace
 * sa façon d'interroger l'index. Le plugin passe le début d'un mot dans le stemmer français
 * (« cloudfl* » ne correspond alors à rien alors que l'index contient « cloudflar »).
 * Ici, chaque mot de la requête est traduit en termes réellement présents dans l'index :
 *   1. le radical exact du mot ;
 *   2. les termes qui commencent par ce qui est tapé (dernier mot seulement, saisie en cours) ;
 *   3. à défaut, les termes à une ou deux fautes de frappe près.
 * Tous les mots doivent être présents (ET) ; si rien ne correspond, on retombe sur « au moins un mot ».
 */
import lunr from 'lunr';
import stemmerSupport from 'lunr-languages/lunr.stemmer.support.js';
import french from 'lunr-languages/lunr.fr.js';
import type {RawHit} from './rank';

stemmerSupport(lunr);
french(lunr);

type SearchDocument = RawHit['document'] & {p?: number};

export type SerializedIndex = {documents: SearchDocument[]; index: unknown};

export type Engine = {search(input: string, limit: number): RawHit[]};

type TypedIndex = {
  type: number;
  documents: Map<string, SearchDocument>;
  index: ReturnType<typeof lunr.Index.load>;
  terms: string[];
};

const MAX_TOKENS = 8;
const MAX_PREFIX_TERMS = 40;
const MIN_FUZZY_LENGTH = 4;
const WEIGHT = {exact: 1, prefix: 0.7, fuzzy: 0.4};
/** Pénalité quand seule une partie des mots de la requête correspond. */
const PARTIAL_PENALTY = 0.4;

function fold(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Distance de Levenshtein, interrompue dès qu'elle dépasse `max`. */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let previous = Array.from({length: b.length + 1}, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      best = Math.min(best, current[j]);
    }
    if (best > max) return max + 1;
    previous = current;
  }
  return previous[b.length];
}

function tokenize(input: string): string[] {
  // On retire la ponctuation autour des mots (« cPanel ? » → « cpanel ») et les signes isolés (« & », « ? »).
  const tokens = (input.toLowerCase().match(/[^-\s]+/g) ?? [])
    .map((token) => token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
    .filter(Boolean);
  const meaningful = tokens.filter((token) => lunr.fr.stopWordFilter(token) !== undefined);
  return (meaningful.length > 0 ? meaningful : tokens).slice(0, MAX_TOKENS);
}

/** Documents correspondant à un mot, avec un score. */
function matchToken(typed: TypedIndex, token: string, isLast: boolean): Map<string, number> {
  const {index, terms} = typed;
  const folded = fold(token);
  const stems = index.pipeline.runString(token);
  const stemsOrToken = stems.length > 0 ? stems : [folded];

  const exact = stemsOrToken.filter((stem) => stem in index.invertedIndex);
  // Début de mot : toujours pour le mot en cours de saisie, et pour les autres mots seulement
  // s'ils ne correspondent à rien tels quels.
  const prefix = isLast || exact.length === 0
    ? terms
        .filter((term) => !exact.includes(term) && (term.startsWith(folded) || stemsOrToken.some((s) => term.startsWith(s))))
        .slice(0, MAX_PREFIX_TERMS)
    : [];

  let fuzzy: string[] = [];
  if (exact.length === 0 && prefix.length === 0 && folded.length >= MIN_FUZZY_LENGTH) {
    const max = folded.length >= 8 ? 2 : 1;
    const bases = [folded, ...stemsOrToken];
    fuzzy = terms.filter((term) => bases.some((base) => distance(term, base, max) <= max));
  }

  const found = new Map<string, number>();
  if (exact.length + prefix.length + fuzzy.length === 0) return found;
  const results = index.query((query) => {
    exact.forEach((term) => query.term(term, {usePipeline: false, boost: WEIGHT.exact}));
    prefix.forEach((term) => query.term(term, {usePipeline: false, boost: WEIGHT.prefix}));
    fuzzy.forEach((term) => query.term(term, {usePipeline: false, boost: WEIGHT.fuzzy}));
  });
  results.forEach(({ref, score}) => found.set(ref, score));
  return found;
}

type Matches = {scores: Map<string, number>; complete: boolean};

function matchAll(typed: TypedIndex, tokens: string[]): Matches {
  const perToken = tokens.map((token, position) => matchToken(typed, token, position === tokens.length - 1));
  const [first, ...rest] = perToken;
  const together = new Map<string, number>();
  for (const [ref, score] of first) {
    if (rest.every((other) => other.has(ref))) {
      together.set(ref, rest.reduce((sum, other) => sum + (other.get(ref) ?? 0), score));
    }
  }
  if (together.size > 0 || tokens.length === 1) return {scores: together, complete: together.size > 0};

  // Aucun document ne contient tous les mots : on accepte ceux qui en contiennent au moins un.
  const partial = new Map<string, number>();
  for (const matches of perToken) {
    for (const [ref, score] of matches) {
      partial.set(ref, (partial.get(ref) ?? 0) + score * PARTIAL_PENALTY);
    }
  }
  return {scores: partial, complete: false};
}

export function createEngine(data: SerializedIndex[]): Engine {
  const typed: TypedIndex[] = data.map(({documents, index}, type) => {
    const loaded = lunr.Index.load(index);
    return {
      type,
      documents: new Map(documents.map((document): [string, SearchDocument] => [String(document.i), document])),
      index: loaded,
      terms: Object.keys(loaded.invertedIndex),
    };
  });
  const pages = typed[0].documents;

  return {
    search(input, limit) {
      const tokens = tokenize(input);
      if (tokens.length === 0) return [];
      const matches = typed.map((entry) => ({entry, ...matchAll(entry, tokens)}));
      // Dès qu'un type (titre, section, texte…) contient tous les mots, les correspondances partielles
      // des autres types sont ignorées : elles remonteraient sinon devant les bonnes pages.
      const useful = matches.some((match) => match.complete) ? matches.filter((match) => match.complete) : matches;
      const hits: RawHit[] = [];
      for (const {entry, scores} of useful) {
        const ranked = [...scores].sort((a, b) => b[1] - a[1]).slice(0, limit);
        for (const [ref, score] of ranked) {
          const document = entry.documents.get(ref);
          if (!document) continue;
          const page = entry.type === 0 ? false : pages.get(String(document.p));
          hits.push({document, page: page || false, type: entry.type, tokens, score});
        }
      }
      return hits;
    },
  };
}
