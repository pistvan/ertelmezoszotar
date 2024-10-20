const solrUrl = process.env.SOLR_URL;
if (!solrUrl) {
    throw new Error('SOLR_URL environment variable is not set.');
}

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
