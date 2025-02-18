const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 以 promise 的方式，解析 post data 
const getPostData = (req) => {
    const promise = new Promise((resolve,reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', ()=> {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}


const serverHandle = (req,res) => {
    res.setHeader('Content-type','application/json')

    // 统一定义 url 的获取
    const url = req.url
    req.path = url.split('?')[0]

    //解析 query
    req.query = querystring.parse(url.split('?')[1])

    // 处理 post data  
    getPostData(req).then(postData => {
        req.body = postData

        // 处理 blog 路由，， mysql执行exec返回 promise
        const blogResult = handleBlogRouter(req,res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }


        // 直接返回值，
        // const blogData = handleBlogRouter(req,res)
        // if (blogData) {
        //     res.end (
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
    

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

        })

}


module.exports = serverHandle 