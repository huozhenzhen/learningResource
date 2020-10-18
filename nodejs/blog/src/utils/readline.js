const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.resolve(__dirname, '../', '../', 'logs', 'access.log');

const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0;
let sum = 0;

rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }
    sum++
    const arr = lineData.split("---")
    if (arr[2] && arr[2].includes("Chrome")) {
        chromeNum++
    }
})

rl.on('close', ()=> {
    console.log("chrome", (chromeNum/sum).toFixed(2));
})