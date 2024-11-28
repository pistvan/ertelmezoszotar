import * as SolrRepository from '../repositories/solr';
import type { Word } from "../repositories/solr";

/**
 * Split the words into tokens using Solr analysis.
 *
 * @param iterator The iterator that yields chunks of words.
 * @param onChunkFinised An optional callback that is called when a chunk is finished.
 */
export default async (
    iterator: Generator<Word[]>,
    onChunkFinised?: (size: number) => void,
): Promise<Set<string>> => {
    const tokens = new Set<string>();

    for (const chunkOfWords of iterator) {
        const words = chunkOfWords
            .map(w => `${w.word} ${w.meaning}`.split(' '))
            .reduce((acc, val) => acc.concat(val), []);

        const analyzedWordIterator = SolrRepository.analyzeWords(words);

        // Add tokens to the set, if they are long enough.
        for await (const { text } of analyzedWordIterator) {
            if (text.length >= 5) {
                tokens.add(text);
            }
        }

        onChunkFinised?.(chunkOfWords.length);
    }

    return tokens;
}
