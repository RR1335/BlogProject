const http = require('http')

const querystring = require('querystring')

const server = http.createServer((req,res) => {
    console.log('method: ', req.method)
    const url = req.url
    console.log('URL: ', url)
    req.query = querystring.parse(url.split('?')[1])
    console.log('Query: ', req.query)
    res.end(
        JSON.stringify(req.query)
    )
})

server.listen(8000)
console.log('OKK!')