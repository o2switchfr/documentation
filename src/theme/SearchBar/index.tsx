import React, {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// Le plugin n'expose ni types ni champ "exports" : on n'en réutilise que l'utilitaire de surlignage.
// @ts-ignore
import {highlight} from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faFileLines, faHashtag, faArrowRightLong, faArrowUp, faArrowDown, faArrowTurnDown, faXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {prefetchIndex, searchIndex} from './client';
import {rankPages, type Row} from './rank';
import styles from './styles.module.css';

// Nombre de résultats bruts demandés au plugin avant le classement par page.
const RAW_LIMIT = 60;

type ModalProps = {onClose: () => void};

function Modal({onClose}: ModalProps): ReactNode {
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const requestId = useRef(0);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<Row[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // À la fermeture, le focus revient là où il était (le bouton de recherche ou le raccourci clavier).
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const input = query.trim();
    const id = ++requestId.current;
    if (!input) {
      setHits([]);
      setSearched(false);
      setFailed(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchIndex(baseUrl, input, RAW_LIMIT);
        if (id !== requestId.current) return;
        setHits(rankPages(results));
        setFailed(false);
        setActive(0);
      } catch (error) {
        console.error('[recherche] impossible de charger ou d\'interroger l\'index', error);
        if (id === requestId.current) {
          setHits([]);
          setFailed(true);
        }
      } finally {
        if (id === requestId.current) {
          setLoading(false);
          setSearched(true);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [query, baseUrl]);

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({block: 'nearest'});
  }, [active]);

  const go = useCallback((hit: Row) => {
    onClose();
    history.push(hit.url);
  }, [history, onClose]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, hits.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter' && hits[active]) {
      event.preventDefault();
      go(hits[active]);
    } else if (event.key === 'Tab') {
      // Le focus reste dans la modale : il alterne entre le champ et le bouton de fermeture.
      const first = inputRef.current;
      const last = closeRef.current;
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  // Annonce vocale (lecteurs d'écran) de l'état de la recherche.
  let status = '';
  if (failed) status = 'La recherche est momentanément indisponible.';
  else if (loading) status = 'Recherche en cours.';
  else if (hits.length > 0) status = `${hits.length} résultat${hits.length > 1 ? 's' : ''}.`;
  else if (searched && query.trim()) status = 'Aucun résultat.';

  return createPortal(
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Rechercher dans la documentation"
        onKeyDown={onKeyDown}>
        <div className={styles.inputRow}>
          <span className={styles.inputIcon}><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input
            ref={inputRef}
            className={styles.input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans la documentation…"
            aria-label="Rechercher"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={hits.length > 0}
            aria-controls="search-results"
            aria-activedescendant={hits[active] ? `search-hit-${active}` : undefined}
          />
          <button ref={closeRef} type="button" className={styles.escButton} onClick={onClose} aria-label="Fermer la recherche">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className={styles.visuallyHidden} role="status" aria-live="polite">{status}</div>

        <div className={styles.body}>
          {hits.length > 0 && (
            <ul className={styles.results} id="search-results" role="listbox" ref={listRef}>
              {hits.map((hit, index) => {
                return (
                  <li key={hit.key} id={`search-hit-${index}`} role="option"
                    aria-selected={index === active}>
                    <a
                      href={hit.url}
                      tabIndex={-1}
                      className={index === active ? `${styles.hit} ${styles.hitActive}` : styles.hit}
                      onMouseMove={() => active !== index && setActive(index)}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                        e.preventDefault();
                        go(hit);
                      }}>
                      <span className={styles.hitIcon}><FontAwesomeIcon icon={hit.isSection ? faHashtag : faFileLines} fixedWidth /></span>
                      <span className={styles.hitText}>
                        <span className={styles.hitTitle}
                          dangerouslySetInnerHTML={{__html: highlight(hit.title, hit.tokens)}} />
                        {hit.path && <span className={styles.hitPath}>{hit.path}</span>}
                        {hit.excerpt && (
                          <span className={styles.hitExcerpt}
                            dangerouslySetInnerHTML={{__html: highlight(hit.excerpt, hit.tokens)}} />
                        )}
                      </span>
                      <span className={styles.hitEnter}><FontAwesomeIcon icon={faArrowRightLong} /></span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          {!query.trim() && (
            <p className={styles.placeholder}>
              Tapez un mot-clé : <em>wordpress</em>, <em>certificat SSL</em>, <em>cron</em>, <em>messagerie</em>…
            </p>
          )}
          {failed && (
            <p className={styles.placeholder} role="alert">
              <FontAwesomeIcon icon={faTriangleExclamation} /> La recherche est momentanément indisponible.<br />
              Rechargez la page et réessayez.
            </p>
          )}
          {!failed && query.trim() && searched && !loading && hits.length === 0 && (
            <p className={styles.placeholder}>
              Aucun résultat pour « <strong>{query.trim()}</strong> ».<br />
              Essayez avec un autre mot-clé ou une orthographe différente.
            </p>
          )}
        </div>

        <div className={styles.footer}>
          <span><kbd><FontAwesomeIcon icon={faArrowUp} /></kbd><kbd><FontAwesomeIcon icon={faArrowDown} /></kbd> naviguer</span>
          <span><kbd><FontAwesomeIcon icon={faArrowTurnDown} rotation={90} /></kbd> ouvrir</span>
          <span><kbd>Échap</kbd> fermer</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function SearchBar(): ReactNode {
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Précharge l'index (dès l'ouverture ou au survol) pour que la première frappe soit instantanée.
  const prefetch = useCallback(() => {
    prefetchIndex(baseUrl);
  }, [baseUrl]);

  // Précharge aussi l'index quand le navigateur est inactif, sauf en mode économie de données
  // ou sur une connexion très lente.
  useEffect(() => {
    const connection = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')) return;
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => prefetchIndex(baseUrl), {timeout: 5000})
      : window.setTimeout(() => prefetchIndex(baseUrl), 3000);
    return () => {
      if (window.requestIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [baseUrl]);

  return (
    <>
      <button type="button" className={styles.trigger} onClick={() => setOpen(true)}
        onMouseEnter={prefetch} onFocus={prefetch} aria-label="Rechercher"
        aria-haspopup="dialog" aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span className={styles.triggerLabel}>Rechercher</span>
        <span className={styles.triggerKeys}>
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
        </span>
      </button>
      {open && <Modal onClose={close} />}
    </>
  );
}
