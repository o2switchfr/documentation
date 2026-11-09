import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// Le plugin n'expose ni types ni champ "exports" : on n'en réutilise que l'utilitaire de surlignage.
// @ts-ignore
import {highlight} from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {searchIndex} from '../SearchBar/client';
import {rankPages, type Row} from '../SearchBar/rank';
import styles from './styles.module.css';

// Résultats bruts demandés au moteur, puis nombre de pages affichées.
const RAW_LIMIT = 100;
const MAX_RESULTS = 30;

/**
 * Page /search/ : même moteur et même classement que la modale (Ctrl/Cmd+K), avec plus de résultats.
 * L'adresse garde la requête (`?q=…`), ce qui permet de la partager ou d'y revenir.
 */
export default function SearchPage(): ReactNode {
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  const history = useHistory();
  const location = useLocation();
  const urlQuery = new URLSearchParams(location.search).get('q') ?? '';
  const inputRef = useRef<HTMLInputElement>(null);
  const requestId = useRef(0);
  const [value, setValue] = useState(urlQuery);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [failed, setFailed] = useState(false);

  // Retour arrière ou lien partagé : le champ suit l'adresse.
  useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (!urlQuery) inputRef.current?.focus();
  }, [urlQuery]);

  useEffect(() => {
    const input = value.trim();
    const id = ++requestId.current;
    if (!input) {
      setRows([]);
      setSearched(false);
      setFailed(false);
      setLoading(false);
      if (urlQuery) history.replace({search: ''});
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      if (input !== urlQuery) history.replace({search: `?q=${encodeURIComponent(input)}`});
      try {
        const results = await searchIndex(baseUrl, input, RAW_LIMIT);
        if (id !== requestId.current) return;
        setRows(rankPages(results, MAX_RESULTS));
        setFailed(false);
      } catch (error) {
        console.error('[recherche] impossible de charger ou d\'interroger l\'index', error);
        if (id === requestId.current) {
          setRows([]);
          setFailed(true);
        }
      } finally {
        if (id === requestId.current) {
          setLoading(false);
          setSearched(true);
        }
      }
    }, 150);
    return () => clearTimeout(timer);
    // L'adresse est mise à jour par cet effet : elle ne doit pas le relancer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, baseUrl]);

  const input = value.trim();
  let status = '';
  if (failed) status = 'La recherche est momentanément indisponible.';
  else if (loading) status = 'Recherche en cours…';
  else if (searched && rows.length > 0) status = `${rows.length} résultat${rows.length > 1 ? 's' : ''} pour « ${input} »`;
  else if (searched && input) status = 'Aucun résultat.';

  return (
    <Layout title="Recherche" description="Recherche dans la documentation o2switch">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Recherche</h1>

          <form role="search" className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="search-page-input" className={styles.visuallyHidden}>Rechercher dans la documentation</label>
            <div className={styles.field}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.fieldIcon} />
              <input
                ref={inputRef}
                id="search-page-input"
                className={styles.input}
                type="search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Rechercher dans la documentation…"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>

          <p className={styles.status} role="status" aria-live="polite">{status}</p>

          {failed && (
            <p className={styles.message} role="alert">
              <FontAwesomeIcon icon={faTriangleExclamation} /> Rechargez la page et réessayez.
            </p>
          )}

          {!failed && searched && rows.length === 0 && input && (
            <p className={styles.message}>Essayez avec un autre mot-clé ou une orthographe différente.</p>
          )}

          {rows.length > 0 && (
            <ul className={styles.results}>
              {rows.map((row) => (
                <li key={row.key}>
                  <Link to={row.url} className={styles.result}>
                    <span className={styles.resultTitle} dangerouslySetInnerHTML={{__html: highlight(row.title, row.tokens)}} />
                    {row.path && <span className={styles.resultPath}>{row.path}</span>}
                    {row.excerpt && (
                      <span className={styles.resultExcerpt} dangerouslySetInnerHTML={{__html: highlight(row.excerpt, row.tokens)}} />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!input && (
            <p className={styles.message}>
              Tapez un mot-clé : <em>wordpress</em>, <em>certificat SSL</em>, <em>cron</em>, <em>messagerie</em>…
            </p>
          )}
        </div>
      </main>
    </Layout>
  );
}
