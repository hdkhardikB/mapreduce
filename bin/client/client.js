const generateTotal = require("./generateTotal")
const readFileConent = require("./file-utility")

module.exports = (filePath) => {
    (async () => {
        try {
            const formattedLines = await readFileConent(filePath) // Read the file contents and convert it into json format
            const result = await generateTotal(formattedLines) // Send the json object to server for calculation
            console.info(result)
        } catch (err) {
            if (err.code === "ECONNREFUSED") {
                console.error('Seems the server is not running. Please try running server first using `mapreduce --server {number_of_processes}` ')
                return
            }
            console.error(err)
        }
    })()
}