/**
 * To make a sum of numbers in array
 * @param {*} numbers - an array of numbers
 */
const makeTotal = (numbers) => {
    return new Promise((resolve, reject) => {
        try {
            const total = numbers.reduce((a, b) => (+a) + (+b), 0)
            resolve(total)
        } catch (err) {
            reject(err)
        }
    })
}

process.on('message', async (m) => {
    try {
        const sum = await makeTotal(m)
        return new Promise((resolve, reject) => {
            const result = {
                child: process.pid,
                data: sum
            }
            process.send(result, (err) => {
                if (err) reject(err);
                else resolve(result);
            });
        })
    } catch (e) {
        console.error(process.pid + " FAILED to send result", e)
    } finally {
        process.disconnect()
    }
});