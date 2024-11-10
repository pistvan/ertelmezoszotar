import type { Hit } from "~/components/interfaces/Hit";
import { searchQuery } from "../services/solr";
import { createHash } from 'crypto';

export default defineEventHandler(async (_event): Promise<Hit[]> => {
    // The seed is the current date as string.
    const hash = createHash('sha256');
    hash.update(new Date().toISOString().split('T')[0]);
    const seed = hash.digest('hex');

    const results = await searchQuery({
        q: '*:*',
        rows: 10,
        sort: `random_${seed} desc`,
    });

    return results.response.docs.map((doc): Hit => ({
        word: doc.word,
        meaning: doc.meaning,
        categories: doc.categories ?? [],
    }));
});
