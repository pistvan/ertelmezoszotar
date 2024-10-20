import { getWordsFromSqlite } from "./repositories/deployDatabase";
import * as SolrRepository from './repositories/solr';

if (process.argv.length < 3) {
    console.error("Usage: deploy.ts <filename>");
    process.exit(1);
}

const filename = process.argv[2];

const iterator = getWordsFromSqlite(filename);

console.log('Clearing Solr...');
await SolrRepository.clear();

console.log('Adding words to Solr...');
let counter: number = 0;
for (const chunkOfWords of iterator) {
    await SolrRepository.add(chunkOfWords);

    counter += chunkOfWords.length;
    console.log(`Added ${counter} words.`);
}

console.log('Committing changes.');
await SolrRepository.commit();
