import { getNumberOfWordsFromSqlite, getWordsFromSqlite } from "./repositories/deployDatabase";
import * as SolrRepository from './repositories/solr';
import cliProgress from 'cli-progress';
import getDistinctSolrTokens from "./services/getDistinctSolrTokens";
import buildSitemapFromSolrTokens from "./services/buildSitemapFromSolrTokens";

/**
 * Workaround, required to be able to stop the process with Ctrl+C.
 */
process.on('SIGINT', () => {
    process.exit(1);
});

if (process.argv.length < 3) {
    console.error("Usage: deploy.ts <filename>");
    process.exit(1);
}

const filename = process.argv[2];

const numberOfWords = getNumberOfWordsFromSqlite(filename);
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

console.log('Clearing Solr...');
await SolrRepository.clear();

console.log('Adding words to Solr...');
progressBar.start(numberOfWords, 0);
for (const chunkOfWords of getWordsFromSqlite(filename)) {
    await SolrRepository.add(chunkOfWords);

    progressBar.increment(chunkOfWords.length);
}

await SolrRepository.commit();

progressBar.stop();

console.log('Create sitemap from Solr tokens...');
progressBar.start(numberOfWords, 0);
const tokens = await getDistinctSolrTokens(
    getWordsFromSqlite(filename, 200),
    (size) => progressBar.increment(size),
);
progressBar.stop();
console.log(`Number of tokens: ${tokens.size}`);

buildSitemapFromSolrTokens(tokens);
