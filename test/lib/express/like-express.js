const http = require('http')
const slice = Array.prototype.slice

// 定义 express 的基础函数
class LikeExpress{
    constructor() {
        this.routers = {
            all:[],
            get:[],
            post:[]
        }
    }

    // 注册中间件的参数，path是数组，后续的参数存入 stack数组
    register(path) {
        const info = {}
        if (typeof path === 'string') {
            info.path = path
            // 取参数，转换为数组，第二个参数开始
            info.stack = slice.call(arguments,1)
        }
        else {
            info.path = '/'
            // 取参数，转换为数组，第一个参数开始
            info.stack = slice.call(arguments,0)
        }
        return info
    }

    use() {
        const info = this.register.apply(this , arguments)
        this.routers.all.push(info)
    }

    get() {
        const info = this.register.apply(this,arguments)
        this.routers.get.push(info)
    }

    post() {
        const info=this.register.apply(this,arguments)
        this.routers.post.push(info)

    }

    metch(method,url) {
        let stack =[]
        if (url === '/favicon.ico'){
            return stack
        }
        // 获取 routers
        let curRouters =[]
        curRouters = curRouters.concat(this.routers.all)
        curRouters = curRouters.concat(this.routers[method])

        curRouters.forEach(routeInfo => {
            if (url.indexOf(routeInfo.path) === 0) {
                // url === '/api/getCookie' 且 routeInfo.path === '/'
                // url === '/api/getCookie' 且 routeInfo.path === '/api'
                // url === '/api/getCookie' 且 routeInfo.path === '/api/getCookie'
                stack = stack.concat(routeInfo.stack)
            }
        })
        return stack
    }

    // 核心 next 的机制
    handle(req,res,stack) {
        const next = () => {
            // 获取第一个匹配的中间件
            const middleware = stack.shift()
            if (middleware) {
                // 执行中间件函数
                middleware(req,res,next)
            }
        }
        next()
    }

    callback() {
        return (req,res) => {
            res.json = (data) => {
                res.setHeader('Content=type','application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()

            const resultList = this.metch(method,url)
            this.handle(req,res,resultList)
        }
    }


    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }


}

module.exports = {
    LikeExpress
}
