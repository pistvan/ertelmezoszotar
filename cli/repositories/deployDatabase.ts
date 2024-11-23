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

const getDatabase = (filename: string): Database => {
    return new Database(filename, { readonly: true });
}

export const getNumberOfWordsFromSqlite = (filename: string): number => {
    const query = getDatabase(filename).query<{c: number}, []>('SELECT COUNT(*) as c FROM words');

    return query.get()!.c;
}

/**
 * Get buffer chunks, convert them to a SQLite database, and return the words.
 */
export function* getWordsFromSqlite(
    filename: string,
    chunkSize: number = 5000,
): Generator<Word[]> {
    const query = getDatabase(filename).query<SqliteWord, []>('SELECT * FROM words');

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
