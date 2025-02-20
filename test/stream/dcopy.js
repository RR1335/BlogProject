const fs = require('fs')
const path = require('path')

const fileD1 = path.resolve(__dirname,'d.txt')
const fileD2 = path.resolve(__dirname,'dd.txt')

const readStream = fs.createReadStream(fileD1)
const writeStream = fs.createWriteStream(fileD2)

readStream.pipe(writeStream,{end : false})

readStream.on('data',chunk => {
    console.log(chunk.toString())
})
readStream.on('end', () => {
    console.log('copy done')
})