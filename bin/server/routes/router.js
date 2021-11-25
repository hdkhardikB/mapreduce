const count = require("./count");
const url = require('url')

const router = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' }); // http header
    const requestUrl = req.url;

    const { pathname } = url.parse(requestUrl, true)
    switch (pathname) {
        case "/count":
            count(req, res)
            break;
        default:
            res.write('<h1>Hello World!<h1>'); //write a response
            res.end(); //end the response
            break;

    }
}
module.exports = router