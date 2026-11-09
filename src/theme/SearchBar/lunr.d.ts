// Types minimaux pour lunr et lunr-languages, qui n'en fournissent pas.
// Seuls les membres utilisés par engine.ts sont décrits.

declare module 'lunr' {
  type QueryOptions = {usePipeline?: boolean; boost?: number};

  interface LunrQuery {
    term(term: string, options?: QueryOptions): LunrQuery;
  }

  interface LunrResult {
    ref: string;
    score: number;
  }

  interface LunrIndex {
    invertedIndex: Record<string, unknown>;
    pipeline: {runString(token: string): string[]};
    query(builder: (query: LunrQuery) => void): LunrResult[];
  }

  interface Lunr {
    Index: {load(serialized: unknown): LunrIndex};
    fr: {stopWordFilter(token: string): string | undefined};
  }

  const lunr: Lunr;
  export default lunr;
}

declare module 'lunr-languages/lunr.stemmer.support.js' {
  const install: (lunr: unknown) => void;
  export default install;
}

declare module 'lunr-languages/lunr.fr.js' {
  const install: (lunr: unknown) => void;
  export default install;
}
