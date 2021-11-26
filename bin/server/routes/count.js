const { decrypt } = require("../../common/util/encryption");
const makeTotal = require("../services/makeTotal");

module.exports = async (req, res) => {
    try {
        if (!req.method === "POST") {
            res.writeHead(404, 'Resource Not Found', { 'Content-Type': 'text/html' });
            res.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
        }
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        const data = Buffer.concat(buffers).toString(); // Convert chunks to string data
        const jsonData = decrypt(data) // Decrypt encoded data
        const resultSum = await makeTotal(jsonData)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(resultSum));
    } catch (error) {
        console.error(error)
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error }));
    } finally {
        res.end()
    }
}