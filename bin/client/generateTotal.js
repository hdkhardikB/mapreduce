const { encrypt } = require("../common/util/encryption");
const httpRequest = require("./httpClient")

/**
 * To send a json object to server for processing
 * @param {*} numberArrays - an object containing arrays of numbers
 */
const generateTotal = async (numberArrays) => {
    const data = encrypt(numberArrays) //Encrypt the data before sending to server
    const params = {
        host: '127.0.0.1',
        port: 5000,
        method: 'POST',
        path: '/count',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };
    return httpRequest(params, data)
}
module.exports = generateTotal