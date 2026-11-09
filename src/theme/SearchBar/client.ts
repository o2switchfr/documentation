// @ts-ignore Le plugin n'a pas de types ; ce module ne fait que réexporter ses constantes générées.
import {searchIndexUrl} from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGeneratedConstants';
import type {RawHit} from './rank';
import type {WorkerRequest, WorkerResponse} from './search.worker';

type Pending = {resolve: (hits: RawHit[]) => void; reject: (error: Error) => void};

let worker: Worker | undefined;
let sequence = 0;
const pending = new Map<number, Pending>();

function indexUrl(baseUrl: string): string {
  const path = `${baseUrl}${String(searchIndexUrl).replace('{dir}', '')}`;
  return new URL(path, window.location.origin).toString();
}

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./search.worker.ts', import.meta.url));
    worker.onmessage = ({data}: MessageEvent<WorkerResponse>) => {
      const request = pending.get(data.id);
      if (!request) return;
      pending.delete(data.id);
      if ('error' in data) request.reject(new Error(data.error));
      else request.resolve(data.hits);
    };
  }
  return worker;
}

function post(message: WorkerRequest): void {
  getWorker().postMessage(message);
}

/** Charge l'index en arrière-plan. Sans effet hors production : l'index n'existe qu'après un build. */
export function prefetchIndex(baseUrl: string): void {
  if (process.env.NODE_ENV !== 'production') return;
  post({kind: 'init', url: indexUrl(baseUrl)});
}

export function searchIndex(baseUrl: string, input: string, limit: number): Promise<RawHit[]> {
  if (process.env.NODE_ENV !== 'production') return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, {resolve, reject});
    post({kind: 'search', id, url: indexUrl(baseUrl), input, limit});
  });
}
