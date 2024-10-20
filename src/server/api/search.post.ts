import type { Hit } from "~/components/interfaces/Hit";
import { searchQuery } from "../services/solr";
import _ from 'lodash';
import * as yup from 'yup';
import validateRequestSchema from "../services/validateRequestSchema";

const requestSchema = yup.object({
    query: yup.string().required(),
});

export default defineEventHandler(async (event): Promise<Hit[]> => {
    const payload = await validateRequestSchema(event, 'POST', requestSchema);

    const results = await searchQuery({
        q: payload.query,
        rows: 100,
        // Use DisMax Query Parser
        // https://solr.apache.org/guide/solr/latest/query-guide/dismax-query-parser.html
        defType: 'dismax',
        qf: 'word meaning',
        // Add highlight.
        // https://solr.apache.org/guide/solr/latest/query-guide/highlighting.html#common-highlighter-parameters
        hl: {
            // return the whole field value in the highlight section
            fragsize: 0,
            method: 'unified',
            encoder: 'html',
        },
    });

    return results.response.docs.map((doc): Hit => ({
        word: results.highlighting?.[doc.id]?.word?.[0]
            ?? _.escape(doc.word),
        meaning: results.highlighting?.[doc.id]?.meaning?.[0]
            ?? _.escape(doc.meaning),
        categories: doc.categories ?? [],
    }));
});
