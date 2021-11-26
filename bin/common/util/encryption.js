const crypto = require('crypto')
const secret = 'm@pRedUce$#9'

const createDigest = (encodedData, format) => {
    return crypto
        .createHmac('sha256', secret)
        .update(encodedData)
        .digest(format);
}
module.exports = {
    encrypt(data) {
        const json = JSON.stringify(data);
        const encodedData = Buffer.from(json).toString('base64');
        return `${encodedData}!${createDigest(encodedData, 'base64')}`;
    },

    decrypt(data) {
        let [encodedData, sourceDigest] = data.split('!');
        if (!encodedData || !sourceDigest) throw new Error('invalid value(s)');
        const json = Buffer.from(encodedData, 'base64').toString('utf8');
        const decodedData = JSON.parse(json);
        const checkDigest = createDigest(encodedData);
        const digestsEqual = crypto.timingSafeEqual(
            Buffer.from(sourceDigest, 'base64'),
            checkDigest
        );
        if (!digestsEqual) throw new Error('invalid value(s)');
        return decodedData;
    }
}
