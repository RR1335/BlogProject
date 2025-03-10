const querystring = require('querystring')
const { set,get } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 设置 Cookie 过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// session data 
// const SESSION_DATA = {}


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
    // 记录 access logs
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    res.setHeader('Content-type','application/json')

    // 统一定义 url 的获取
    const url = req.url
    req.path = url.split('?')[0]

    //解析 query
    req.query = querystring.parse(url.split('?')[1])

    // 解析 Cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // console.log('req.cookie is: ',req.cookie)

    // 解析 session 
    // let needSetCookie = false
    // let userId = req.cookie.userid 
    // if (userId) {
    //     if (!SESSION_DATA[userId]){
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]

    // redis ,解析 session
    let needSetCookie = false
    let userId = req.cookie.userid

    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        //初始化 redis 中 session Value
        set(userId, {})
    }

    // 获取 session 
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中 session 值
            set(req.sessionId, {})
            // 设置 session 
            req.session ={}
        } else {
            //设置 session
            req.session = sessionData
        }

        console.log('req.session ', req.session) // 开发环节，监测数据

        // 处理 post data
        return getPostData(req)
    })
    .then(postData => {
        req.body = postData

        // 处理 blog 路由，， mysql执行exec返回 promise
        const blogResult = handleBlogRouter(req,res)
        if (blogResult) {
            blogResult.then(blogData => {
                //设置 Session
                if (needSetCookie) {
                    // res.setHeader('Set-Cookie',`userid=${userId} ; path = / ; httpOnly; expires = ${getCookieExpires}`)
                    // res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires}`)
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly`)
                }

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
    
        const userResult = handleUserRouter(req,res)
        if (userResult) {
            userResult.then(userData => {
                // 设置 session
                if (needSetCookie) {
                    // res.setHeader('Set-Cookie',`userid=${userId} ; path = / ; httpOnly; expires = ${getCookieExpires}`)
                    // res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires}`)
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly`)
                }

                res.end(
                    JSON.stringify(userData)
                )
            })
            return 
        }


        // const userData = handleUserRouter(req,res)
        // if (userData) {
        //     res.end (
        //         JSON.stringify(userData)
        //     )
        //     return
        // }




        // 没有对应的路由匹配，则返回 404
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write("404 Not Found\n")
        res.end()

        })

}


module.exports = serverHandle 