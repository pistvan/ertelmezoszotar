import { readFileSync } from 'fs';
import type { EventHandlerRequest, H3Event } from 'h3';

/**
 * Folder where the sitemap files are stored.
 */
const SITEMAPS_FOLDER = '/sitemaps';

/**
 * Writes the given sitemap file to the response, while catching file not found errors.
 */
const respondWithFile = (
    event: H3Event<EventHandlerRequest>,
    fileName: string,
): void => {
    let fileContent: Buffer;
    try {
        fileContent = readFileSync(`${SITEMAPS_FOLDER}/${fileName}`);
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
            });
        }

        throw error;
    }
    event.node.res.setHeader('Content-Type', 'application/xml');
    event.node.res.end(fileContent);
}

export default defineEventHandler((event) => {
    const query = getQuery(event);

    if (!('index' in query)) {
        // Respond with the sitemap index file.
        return respondWithFile(event, 'sitemap.xml');
    }

    const index = parseInt(query.index as string);

    if (isNaN(index) || index < 1) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
        });
    }

    // Respond with the proper sitemap file.
    return respondWithFile(event, `sitemap${index}.xml`);
});
