import React, {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// Le plugin n'expose pas de types ni de champ "exports" : on réutilise son worker lunr tel quel.
// @ts-ignore
import {fetchIndexesByWorker, searchByWorker} from '@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker';
// @ts-ignore
import {highlight} from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faFileLines, faHashtag, faArrowRightLong, faArrowUp, faArrowDown, faArrowTurnDown, faXmark} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

const RESULT_LIMIT = 12;
const HIGHLIGHT_PARAM = '_highlight';
const TYPE_HEADING = 1;

type Hit = {
  document: {i: number; t: string; u: string; h?: string; s?: string; b?: string[]};
  page?: {t: string; b?: string[]} | false;
  type: number;
  tokens: string[];
};

function breadcrumb(hit: Hit): string {
  const items = hit.page
    ? [...(hit.page.b ?? []), hit.page.t]
    : hit.document.b ?? [];
  return items.filter(Boolean).join(' › ');
}

function targetUrl(hit: Hit): string {
  let url = hit.document.u;
  if (hit.tokens.length > 0) {
    const params = new URLSearchParams();
    hit.tokens.forEach((token) => params.append(HIGHLIGHT_PARAM, token));
    url += `?${params.toString()}`;
  }
  return url + (hit.document.h ?? '');
}

type ModalProps = {onClose: () => void};

function Modal({onClose}: ModalProps): ReactNode {
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const requestId = useRef(0);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<Hit[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const input = query.trim();
    const id = ++requestId.current;
    if (!input) {
      setHits([]);
      setSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results: Hit[] = await searchByWorker(baseUrl, '', input, RESULT_LIMIT);
        if (id !== requestId.current) return;
        setHits(results);
        setActive(0);
      } catch {
        if (id === requestId.current) setHits([]);
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

  const go = useCallback((hit: Hit) => {
    onClose();
    history.push(targetUrl(hit));
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
    }
  };

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
            aria-expanded={hits.length > 0}
            aria-controls="search-results"
            aria-activedescendant={hits[active] ? `search-hit-${active}` : undefined}
          />
          <button type="button" className={styles.escButton} onClick={onClose} aria-label="Fermer la recherche">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className={styles.body}>
          {hits.length > 0 && (
            <ul className={styles.results} id="search-results" role="listbox" ref={listRef}>
              {hits.map((hit, index) => {
                const isHeading = hit.type === TYPE_HEADING;
                const path = breadcrumb(hit);
                return (
                  <li key={`${hit.document.i}-${index}`} id={`search-hit-${index}`} role="option"
                    aria-selected={index === active}>
                    <a
                      href={targetUrl(hit)}
                      className={index === active ? `${styles.hit} ${styles.hitActive}` : styles.hit}
                      onMouseMove={() => active !== index && setActive(index)}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                        e.preventDefault();
                        go(hit);
                      }}>
                      <span className={styles.hitIcon}><FontAwesomeIcon icon={isHeading ? faHashtag : faFileLines} fixedWidth /></span>
                      <span className={styles.hitText}>
                        <span className={styles.hitTitle}
                          dangerouslySetInnerHTML={{__html: highlight(hit.document.t, hit.tokens)}} />
                        {path && <span className={styles.hitPath}>{path}</span>}
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
          {query.trim() && searched && !loading && hits.length === 0 && (
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
    fetchIndexesByWorker(baseUrl, '').catch(() => undefined);
  }, [baseUrl]);

  return (
    <>
      <button type="button" className={styles.trigger} onClick={() => setOpen(true)}
        onMouseEnter={prefetch} onFocus={prefetch} aria-label="Rechercher">
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
