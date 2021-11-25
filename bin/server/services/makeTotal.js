const child_process = require('child_process')

/**
 * Distribute tasks equally to each individual process
 * @param {*} maxTasks - maximum number of child process allowed
 * @param {*} numberOfJobs - total number of tasks to be performed
 */
const distributeTasks = (maxTasks, numberOfJobs) => {
    let result = new Array(maxTasks).fill().map(_=>([])) //we create empty result set, then we'll fill it

    const jobsPerProcess = Math.ceil(numberOfJobs.length / maxTasks)

    for (let task = 0; task < maxTasks; task++) {
        for (let i = 0; i < jobsPerProcess; i++) {
            const value = numberOfJobs[i + task * jobsPerProcess]
            if (!value) continue //avoid adding "undefined" values
            result[task].push(value)
        }
    }
    return result
}

/**
 * To fork a new process for every single number list
 * @param {*} numberList - an array of numbers to be summed for
 * @param {*} i - an index of array/process
 */
const processForker = async (numberList, i) => {
    return new Promise((resolve, reject) => {
        const child = child_process.fork(__dirname + '/accumulator.js');
        child.on('error', reject);
        child.on('exit', reject);
        child.on('message', resolve); // should happen before exit
        child.send(numberList);
    }).then(mesage => {
        if (mesage.err) {
            throw mesage.err;
        } else {
            return mesage.data;
        }
    }, (err) => {
        throw err;
    })
}

/**
 * Run tasks for each child process
 * @param {*} taskList - list of arrays to be operated
 */
const runConcurrentTask = async (taskList) => {
    const maxAllowedTask = parseInt(global["maxProcessCount"])
    const mappedTasks = distributeTasks(maxAllowedTask, Object.values(taskList))
    let resultList = await Promise.all(new Array(maxAllowedTask).fill().map(async (p, index) => {
        return Promise.all(mappedTasks[index].map(async (task, i) => {
            return await processForker(task, i)
        }))
    }))
    resultList = resultList.reduce((a, b) => a.concat(b), []) // Combining the result of all the process into one array
    return resultList
}

/**
 * To perform asynchronous operation and child process
 * @param {*} numberArrays - an object containing list of arrays of numbers
 */
const makeTotal = async (numberArrays) => {
    const sumList = await runConcurrentTask(numberArrays)
    let formattedOutput = {}

    // As we have an array of sum, we are formatting them desired output as well making a sum of all the sum arrays
    formattedOutput["Total"] = sumList.reduce((acc, c, i) => {
        formattedOutput[`Array ${i + 1}`] = c
        return acc + c
    }, 0)

    return formattedOutput
}

module.exports = makeTotal
