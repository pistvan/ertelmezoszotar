import { writeFileSync } from 'fs';
import { Database } from "bun:sqlite";
import type { Word } from './solr';

/**
 * Representation of a Word in the SQLite database.
 */
interface SqliteWord {
    id: number;
    word: string;
    meaning: string;
    cat: string;
}

/**
 * Get buffer chunks, convert them to a SQLite database, and return the words.
 */
export function* getWordsFromSqlite(
    filename: string,
    chunkSize: number = 5000,
): Generator<Word[]> {
    const db = new Database(filename, { readonly: true });

    const query = db.query<SqliteWord, []>('SELECT * FROM words');

    const words = query.all().map((raw: SqliteWord): Word => ({
        id: raw.id,
        word: raw.word,
        meaning: raw.meaning,
        categories: raw.cat.split('/'),
    }));

    // Yield the words in chunks.
    for (let i = 0; i < words.length; i += chunkSize) {
        yield words.slice(i, i + chunkSize);
    }
}
