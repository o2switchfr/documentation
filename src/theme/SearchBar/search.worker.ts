import {createEngine, type Engine, type SerializedIndex} from './engine';
import type {RawHit} from './rank';

export type WorkerRequest =
  | {kind: 'init'; url: string}
  | {kind: 'search'; id: number; url: string; input: string; limit: number};

export type WorkerResponse = {id: number; hits: RawHit[]} | {id: number; error: string};

// Dans un worker, `self` n'a pas le même `postMessage` que `window` : on le type à la main.
const scope = self as unknown as {
  postMessage(message: WorkerResponse): void;
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
};

let loaded: {url: string; engine: Promise<Engine>} | undefined;

function getEngine(url: string): Promise<Engine> {
  if (loaded?.url !== url) {
    const engine = fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Index de recherche introuvable (${response.status}) : ${url}`);
        return response.json() as Promise<SerializedIndex[]>;
      })
      .then(createEngine);
    loaded = {url, engine};
  }
  return loaded.engine;
}

scope.onmessage = async ({data}) => {
  if (data.kind === 'init') {
    // Préchargement : l'erreur éventuelle sera renvoyée à la première vraie recherche.
    getEngine(data.url).catch(() => {
      loaded = undefined;
    });
    return;
  }
  try {
    const engine = await getEngine(data.url);
    scope.postMessage({id: data.id, hits: engine.search(data.input, data.limit)});
  } catch (error) {
    loaded = undefined;
    scope.postMessage({id: data.id, error: error instanceof Error ? error.message : String(error)});
  }
};
