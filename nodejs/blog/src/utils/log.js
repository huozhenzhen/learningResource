const path = require('path')
const fs = require('fs')

function createWriteStream(fileName) {
    const fullFileName = path.resolve(__dirname, '../', '../', 'logs', fileName);
    return fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
}

function writeLog(writeStream, log) {
    writeStream.write(log + "\n")
}


const accessWriteStream = createWriteStream('access.log');
function accessLog(log) {
    writeLog(accessWriteStream, log)
}


module.exports = {
    accessLog
}