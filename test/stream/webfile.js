const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const fileD1 = path.resolve(__dirname,'d.txt')

const server = http.createServer((req,res) => {
    if (req.method === 'GET') {
        const readStream = fs.createReadStream(fileD1)
        readStream.pipe(res)
        // req.pipe(res)        // res 数据的处理
    }
})
server.listen(8000)