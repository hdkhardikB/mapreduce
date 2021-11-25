const fs = require('fs')

const convertLinesToArray = (lines) => {
    let separator = ","
    let numberLines = {}
    for (let lineIndex = 0; lineIndex <= lines.length - 1; lineIndex++) {
        const currentLine = lines[lineIndex]
        if (currentLine.length > 0) {
            separator = currentLine.indexOf(separator) > -1 && `,` || ` `
            numberLines[lineIndex] = currentLine.split(separator)
        }
    }
    return numberLines
}

const readFileConent = async (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(convertLinesToArray(data.toString().split(`\n`)));
        });
    });
}
module.exports = readFileConent