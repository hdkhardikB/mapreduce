const fs = require('fs')

const convertLinesToArray = (lines) => {
    let numberLines = {}
    for (let lineIndex = 0; lineIndex <= lines.length - 1; lineIndex++) {
        const currentLine = lines[lineIndex].trim()
        if (currentLine.length > 0) {
            numberLines[lineIndex] = currentLine.split(/[ ,]+/).map(number => number.trim())
        } else {
            numberLines[lineIndex] = [0]
        }
        if(numberLines[lineIndex].filter(num=>isNaN(num)).length>0){
            throw new Error("File is not valid")
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
            resolve(convertLinesToArray(data.toString().replace(/\r\n/g,'\n').split('\n')));
        });
    });
}
module.exports = readFileConent