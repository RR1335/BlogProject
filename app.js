const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


const serverHandle = (req,res) => {
    res.setHeader('Content-type','application/json')

    // 统一定义 url 的获取
    const url = req.url
    req.path = url.split('?')[0]

    //解析 query
    req.query = querystring.parse(url.split('?')[0])

    const blogData = handleBlogRouter(req,res)
    if (blogData) {
        res.end (
            JSON.stringify(blogData)
        )
        return
    }

    const userData = handleUserRouter(req,res)
    if (userData) {
        res.end (
            JSON.stringify(userData)
        )
        return
    }



    // 没有对应的路由匹配，则返回 404
    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 Not Found\n")
    res.end()

// 测试的数据，初次建立测试 server 创建成功
    // const resData = {
    //     name: 'RR1335',
    //     site: 'Node.js Beginning',
    //     env: process.env.NODE_ENV
    // }

    // res.end(
    //     JSON.stringify(resData)
    // )
}


module.exports = serverHandle 