import type {ClientModule} from '@docusaurus/types';

/**
 * Les images des pages sont chargées en différé (`loading="lazy"`) et n'ont pas de dimensions :
 * la page grandit après le défilement vers une ancre, et le titre visé se retrouve hors de l'écran.
 * Tant que la mise en page bouge, on recale la page sur l'ancre. Dès que la personne reprend la main
 * (molette, toucher, clavier, clic), on arrête.
 */
const SETTLE_MS = 3000;
const USER_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;

let stop: (() => void) | undefined;

function holdAnchor(id: string): () => void {
  const align = () => document.getElementById(id)?.scrollIntoView({block: 'start', behavior: 'instant'});
  const observer = new ResizeObserver(align);
  observer.observe(document.documentElement);
  // Un événement « load » ne remonte pas : on l'écoute en phase de capture pour attraper celui des images.
  document.addEventListener('load', align, true);
  const timer = window.setTimeout(release, SETTLE_MS);

  function release(): void {
    observer.disconnect();
    document.removeEventListener('load', align, true);
    USER_EVENTS.forEach((name) => window.removeEventListener(name, release));
    window.clearTimeout(timer);
  }

  USER_EVENTS.forEach((name) => window.addEventListener(name, release, {passive: true, once: true}));
  align();
  return release;
}

const clientModule: ClientModule = {
  onRouteDidUpdate({location}) {
    stop?.();
    stop = undefined;
    if (!location.hash) return;
    stop = holdAnchor(decodeURIComponent(location.hash.slice(1)));
  },
};

export default clientModule;
