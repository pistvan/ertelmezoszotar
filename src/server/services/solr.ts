import type { FlattenOptions} from 'flat';
import { flatten as rawFlatten } from 'flat';

interface SolrUnifiedHighlighting {
    method: 'unified';
    snippets?: number;
    fragsize?: number;
    tag?: {
        pre?: string;
        post?: string
    }
    encoder?: 'html' | undefined;
    maxAnalyzedChars?: number;
}

interface SolrOriginalHighlighting {
    method: 'original';
}

interface SolrFastVectorHighlighting {
    method: 'fastVector';
}

interface SolrLuceneQueryParser {
    defType: 'lucene';
    q: string;
    df?: string;
    sow?: boolean;
}

interface SolrDisMaxQueryParser {
    defType: 'dismax';
    q: string;
    qf: string;
}

interface SolrEDisMaxQueryParser extends Omit<SolrDisMaxQueryParser, 'defType'> {
    defType: 'edismax';
}

type SolrSearchQuery = (SolrLuceneQueryParser | SolrDisMaxQueryParser | SolrEDisMaxQueryParser) & {
    start?: number;
    /**
     * @default 10
     */
    rows?: number;
    /**
     * Highlighting parameters.
     * 
     * @link https://solr.apache.org/guide/solr/latest/query-guide/highlighting.html
     */
    hl?: SolrUnifiedHighlighting | SolrOriginalHighlighting | SolrFastVectorHighlighting | false;
};

interface SolrQueryResponse<T extends object> {
    responseHeader: {
        status: number;
        QTime: number;
    },
    response: {
        numFound: number;
        start: number;
        numFoundExact: boolean;
        docs: T[];
    };
    highlighting?: {
        [key: string]: {
            [key in keyof T]?: string[];
        };
    };
}

interface SolrWord {
    id: string;
    word: string;
    meaning: string;
    categories?: string[];
}

const flatten = (target: SolrSearchQuery, options?: FlattenOptions) => {
    const flattened = rawFlatten(target, options) as Record<string, string>;

    if (target.hl) {
        flattened.hl = 'true';
    }

    return flattened;
};

export const searchQuery = async (params: SolrSearchQuery) => {
    const flattenedParams = flatten(params) as Record<string, string>;
    flattenedParams.hl = 'true';

    const url = new URL('http://127.0.0.1:8983/solr/meszotar/select');
    url.search = new URLSearchParams(flattenedParams).toString();

    const response = await fetch(url.toString());

    return await response.json() as SolrQueryResponse<SolrWord>;
};
