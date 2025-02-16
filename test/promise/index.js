const fs = require('fs')
const path = require('path')


// 使用 Promise 获取文件
function getFileContent(fileName) {
    const promise = new Promise((resolve,reject)=> {
            const fullFilename = path.resolve(__dirname,'files',fileName)
        
            fs.readFile(fullFilename, (err,data) => {
                if (err) {
                    reject(err)
                    return
                }
        
                resolve(
                    JSON.parse(data.toString())
                )
        })
    })
    return promise
}

// Promise 链式引用 和 then操作
getFileContent('a.json').then(aData => {
    console.log('a Data:', aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log("b Data: ", bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log("c Data:" ,cData)
})



// Promise 函数的基本框架
// function getFileContent(fileName) {
//     const promise = new Promise((resolve,reject)=> {

//     })
//     return promise
// }


// 测试 getFileContent 
// Callback - hell 
// getFileContent('a.json', aData => {
//     console.log('aData: ', aData)
//     getFileContent(aData.next , bData => {
//         console.log('bData:', bData)
//         getFileContent(bData.next, cData => {
//             console.log('cData: ', cData)
//         })
//     })
// })