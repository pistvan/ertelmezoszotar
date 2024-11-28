import { XMLBuilder } from "fast-xml-parser";
import * as fs from 'fs';

/**
 * Folder where the sitemap files are stored.
 */
const SITEMAPS_FOLDER = '/sitemaps';

/**
 * Maximum allowed size of the URL tags in a sitemap file.
 */
const SITEMAP_FILE_SIZE_LIMIT = 40 * 1024 * 1024;

/**
 * Maximum allowed number of URLs in a sitemap file.
 */
const SITEMAP_MAX_URLS = 50000;

const XMLNS = `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`;

const clearOldSitemapFiles = () => {
    const regex = /^sitemap.*\.xml$/;

    fs.readdirSync(SITEMAPS_FOLDER)
        .filter(file => regex.test(file))
        .map(file => `${SITEMAPS_FOLDER}/${file}`)
        .forEach(fs.unlinkSync);
}

/**
 * Saves the given encoded tags to a sitemap file.
 */
const saveSitemapFile = (index: number, encodedTags: string[]) => {
    fs.writeFileSync(
        `${SITEMAPS_FOLDER}/sitemap${index}.xml`,
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset ${XMLNS}>\n${encodedTags.join('')}</urlset>`,
    );
}

const saveSitemapIndexFile = (numberOfFiles: number) => {
    const sitemapBuilder = new XMLBuilder({
        arrayNodeName: 'sitemap',
        format: true,
    });

    const sitemaps = Array.from(
        { length: numberOfFiles },
        (_, i) => ({ loc: `${process.env.SITEMAP_URL_BASE}/sitemap.xml?index=${i + 1}` }),
    );

    fs.writeFileSync(
        `${SITEMAPS_FOLDER}/sitemap.xml`,
        `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex ${XMLNS}>\n${sitemapBuilder.build(sitemaps)}</sitemapindex>`,
    );
}

/**
 * Builds the sitemap files from the given tokens.
 *
 * @returns The number of created sitemap files.
 */
export default (
    tokens: Set<string>,
): number => {
    clearOldSitemapFiles();

    const urlBuilder = new XMLBuilder({ format: true });

    /** Number of sitemap files. */
    let fileCounter = 0;
    /** Array of the encoded URL tags. */
    let urlTags: string[] = [];
    /** Size of the current sitemap file in bytes. */
    let filesize = 0;

    tokens.forEach((token) => {
        const tag = urlBuilder.build({
            url: {
                loc: `${process.env.SITEMAP_URL_BASE}/keres/${encodeURIComponent(token)}`,
            },
        }) as string;

        // If the current sitemap file is too big or contains too many URLs, then create a new one.
        // The first condition is necessary to avoid creating empty sitemap files.
        if (
            urlTags.length > 0
            && (filesize + tag.length > SITEMAP_FILE_SIZE_LIMIT || urlTags.length >= SITEMAP_MAX_URLS)
        ) {
            ++fileCounter;
            saveSitemapFile(fileCounter, urlTags);

            urlTags = [];
            filesize = 0;
        }

        urlTags.push(tag);
        filesize += tag.length;
    });

    // Save the last sitemap file.
    if (urlTags.length > 0) {
        ++fileCounter;
        saveSitemapFile(fileCounter, urlTags);
    }

    // Create the sitemap index file.
    saveSitemapIndexFile(fileCounter);

    return fileCounter;
}
