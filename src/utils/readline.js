const fs = require('node:fs')
const path = require('node:path')
const readline = require('node:readline')

const fileName = path.join(__dirname,'../','logs','access.log')
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rlObj = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let Mozilla = 0
let SUM = 0

// 逐行读取
rlObj.on('line' , (lineData) => {
    if (!lineData) {
        return
    }

    SUM++

    const arr = lineData.split(' -- ')
    if (arr[2] && arr[2].indexOf('Chrome') > 0 ) {
        chromeNum++
    }
    if (arr[2] && arr[2].indexOf('Mozilla') > 0 ) {
        Mozilla++
    }

})

// 结束
rlObj.on('close', () => {
    console.log('Chrome占比： ' , chromeNum / SUM)
    console.log('\n')
    console.log("Mozilla占比：", Mozilla / SUM)

})