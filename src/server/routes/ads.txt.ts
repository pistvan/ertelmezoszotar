export default defineEventHandler((event) => {
    const adsenseClientId = process.env.GOOGLE_ADSENSE_CLIENT_ID;

    if (!adsenseClientId) {
        event.node.res.statusCode = 404;
        event.node.res.end();
        return;
    }

    event.node.res.setHeader('Content-Type', 'text/plain');
    event.node.res.write(`google.com, ${adsenseClientId}, DIRECT, f08c47fec0942fa0\n`);
    event.node.res.end();
});
