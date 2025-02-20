const fs = require('node:fs')
const path = require('path')

//生成 write stream 
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname,'../','logs',fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flogs: 'a'      // 追加
    })
    return writeStream
}

// 写日志
function writelog(writeStream,log) {
    writeStream.write(log + '\n')   // 写入 log 并换行
}

const accessWriteStream = createWriteStream('access.log')
const eventWriteStream = createWriteStream('event.log')
// const errorWriteStream = createWriteStream('error.log')

/**
 * 写访问日志
 * @param {string} log 
 */
function access(log) {
    writelog(accessWriteStream, log)
}

function event(log) {
    writelog(eventWriteStream, log)
}

// function error(log) {
//     writelog(errorWriteStream, log)
// }

module.exports = {
    access,
    event,

}
