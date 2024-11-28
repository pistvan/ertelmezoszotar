import accumulate from "./accumulate";

const solrUrl = process.env.SOLR_URL;
if (!solrUrl) {
    throw new Error('SOLR_URL environment variable is not set.');
}

/**
 * Maximum length of a URL that can be sent to Solr.
 */
const MAX_URL_LENGTH = 8000;

/**
 * Name of the query parameter that contains the text to be analyzed.
 */
const SORL_QUERY_PARAM_NAME = 'analysis.fieldvalue';

export interface Word {
    id: number;
    word: string;
    meaning: string;
    categories: string[];
}

const update = async (body: any, commit: boolean) => {
    const response = await fetch(`${solrUrl}/meszotar/update?commit=${commit}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Failed to update Solr. ${response.status} ${response.statusText}`);
    }
}

export const clear = async () => {
    await update({
        delete: {
            query: '*:*',
        },
    }, true);
};

export const add = async (words: Word[]) => {
    await update(words, false);
};

export const commit = async () => {
    await update(null, true);
}

interface AnalyzedWordToken {
    text: string;
    position: number;
    type: string;
}

interface AnalyzedTextToken extends AnalyzedWordToken {
    start: number;
    end: number;
}

const createURL = (fieldvalue: string = ''): URL => {
    const url = new URL(`${solrUrl}/meszotar/analysis/field`);

    url.searchParams.set('analysis.fieldtype', 'dictionarytext');
    url.searchParams.set('analysis.showmatch', 'true');
    url.searchParams.set('wt', 'json');
    url.searchParams.set(SORL_QUERY_PARAM_NAME, fieldvalue);

    return url;
}

/**
 * Call the Solr analysis API with the given search parameters, and return the analyzed tokens.
 */
const rawAnalyzeUsingURL = async (url: URL): Promise<AnalyzedTextToken[]> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to analyze text. ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    const indexes = json.analysis.field_types.dictionarytext.index;

    const index = indexes[indexes.length - 1];

    return index.map((element: AnalyzedTextToken): AnalyzedTextToken => ({
        text: element.text.startsWith(':') ? element.text.substring(1) : element.text,
        start: element.start,
        end: element.end,
        position: element.position,
        type: element.type,
    }));
};

/**
 * Send the given text through Solr's analysis API, and return the analyzed tokens.
 *
 * This method does not check the length of the text!
 */
export const analyzeText = async (text: string): Promise<AnalyzedTextToken[]> => {
    const url = createURL(text);

    return rawAnalyzeUsingURL(url);
}

/**
 * Send the given words through Solr's analysis API, and return the analyzed tokens.
 *
 * The words are sent in chunks, to avoid the URL length limit.
 */
export async function* analyzeWords(
    words: Iterable<string>,
): AsyncGenerator<AnalyzedWordToken> {
    // Split the words into chunks that are small enough to be sent in a URL query parameter.
    const iterator = accumulate(words, (url, word) => {
        const old = url.searchParams.get(SORL_QUERY_PARAM_NAME);

        if (old === null || old === '') {
            // First word is always added.
            url.searchParams.set(SORL_QUERY_PARAM_NAME, word);
            return true;
        }

        url.searchParams.set(SORL_QUERY_PARAM_NAME, `${old} ${word}`);

        if (url.toString().length < MAX_URL_LENGTH) {
            return true;
        }

        // URL is too long now. Reverse the change.
        url.searchParams.set(SORL_QUERY_PARAM_NAME, old);

        return false;
    }, createURL);

    for await (const searchParams of iterator) {
        const chunk = await rawAnalyzeUsingURL(searchParams);

        yield* chunk.map(token => ({
            text: token.text,
            position: token.position,
            type: token.type,
        }));
    }
}
