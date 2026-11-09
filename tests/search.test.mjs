// Tests de la recherche : ils interrogent l'index généré par `npm run build` (build/search-index.json).
// Lancement : npm run build && npm test
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {describe, it} from 'node:test';
import {createEngine} from '../src/theme/SearchBar/engine.ts';
import {rankPages} from '../src/theme/SearchBar/rank.ts';

const INDEX_PATH = new URL('../build/search-index.json', import.meta.url);
/** Part minimale de pages retrouvées dans le top 3 : tolère quelques titres ambigus. */
const MIN_RATE = 0.95;

if (!existsSync(INDEX_PATH)) {
  throw new Error(`Index de recherche introuvable (${INDEX_PATH.pathname}) : lancez d'abord "npm run build".`);
}

const data = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
const engine = createEngine(data);
const search = (query) => rankPages(engine.search(query, 60));
const rankOf = (query, url) => {
  const index = search(query).findIndex((row) => row.url.split('#')[0] === url);
  return index < 0 ? Infinity : index + 1;
};

describe('requêtes courantes', () => {
  it('trouve un mot à peine commencé', () => {
    assert.match(search('cloudfl')[0].url, /cloudflare/);
  });

  it('ignore la ponctuation isolée', () => {
    assert.ok(rankOf('Comment se connecter sur cPanel ?', '/guides/cpanel/comment-se-connecter/') <= 3);
  });

  it('retrouve une page par un mot-clé absent de son texte', () => {
    assert.ok(rankOf('sftp', '/cpanel/fichiers/comptes-ftp/') <= 3);
    assert.ok(rankOf('crontab', '/cpanel/outils-avances/tache-planifiee-cron/') <= 3);
  });

  it('tolère une faute de frappe', () => {
    assert.ok(rankOf('certficat', '/cpanel/securite/certificat-ssl/') <= 3);
  });

  it("affiche un extrait seulement quand le titre ne correspond pas", () => {
    const [titleMatch] = search('cloudfl');
    assert.equal(titleMatch.excerpt, undefined);
    const bodyOnly = search('retour automatique').find((row) => row.excerpt);
    assert.ok(bodyOnly, 'aucun extrait trouvé pour une correspondance dans le texte');
    assert.ok(bodyOnly.excerpt.length <= 140, `extrait trop long : ${bodyOnly.excerpt.length} caractères`);
  });

  it('ne renvoie rien pour une saisie sans sens', () => {
    assert.deepEqual(search('zzzxx'), []);
  });
});

describe('retrouver chaque page', () => {
  const pages = data[0].documents;
  const words = (title) => title.split(/[\s'’]+/).filter((word) => /^[\p{L}\d._]+$/u.test(word));
  const variants = {
    'par son titre complet': (title) => title,
    'par un début de mot': (title, longest) => title.replace(longest, longest.slice(0, Math.max(3, Math.ceil(longest.length * 0.6)))),
    'avec une faute de frappe': (title, longest) =>
      title.replace(longest, longest.slice(0, 2) + longest[3] + longest[2] + longest.slice(4)),
  };

  for (const [name, build] of Object.entries(variants)) {
    it(`au moins ${MIN_RATE * 100} % des pages sont trouvées ${name}`, () => {
      const failures = [];
      let total = 0;
      for (const page of pages) {
        const longest = [...words(page.t)].sort((a, b) => b.length - a.length)[0];
        if (!longest || longest.length < 6) continue;
        total += 1;
        const query = build(page.t, longest);
        if (rankOf(query, page.u) > 3) failures.push(query);
      }
      const rate = (total - failures.length) / total;
      assert.ok(rate >= MIN_RATE, `${failures.length}/${total} pages non trouvées, par exemple : ${failures.slice(0, 5).join(' | ')}`);
    });
  }
});

describe('saisies inhabituelles', () => {
  const weird = ['', ' ', '*', ':', '~1', '^2', '+mail', '(mail)', 'title:mail', '"', '\\', 'a', '😀', 'de la', '...', 'a'.repeat(500), 'mot '.repeat(60), '<script>alert(1)</script>', '\u0000'];

  for (const query of weird) {
    it(`ne plante pas sur ${JSON.stringify(query.slice(0, 24))}`, () => {
      assert.doesNotThrow(() => search(query));
    });
  }
});
