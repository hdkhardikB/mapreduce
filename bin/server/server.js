const http = require('http');
const router = require('./routes/router');

const bootstrapServer = (childProcessCount) => {
    global["maxProcessCount"] = childProcessCount
    const server = http.createServer(router)
    server.listen(5000);
    console.info(`Server running at http://127.0.0.1:5000/ for maximum concurrent process ${childProcessCount}`);
}

module.exports = bootstrapServer