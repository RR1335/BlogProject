const { LikeExpress } = require('./express/like-express')

const app = new LikeExpress()

app.use((req,res,next) => {
    console.log('请求开始……',req.method ,req.url )
    next()
})

app.use((req,res,next) => {
    console.log('处理 Cookie')
    req.cookie = {
        userId: 'Sanliuqiu'
    }
    next()
})

app.use('/api',(req,res,next) => {
    console.log('处理 /api 路由')
    next()
})

app.get('/api',(req,res,next) => {
    console.log('get /api 路由')
    next()
})

//模拟登录
function loginCheck(req,res,next) {
    setTimeout(() => {
        console.log('模拟登录')
        next()
    })
}

app.get('/api/getCookie',loginCheck,(req,res,next) => {
    console.log('get /api/getCookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.listen(8000,() => {
    console.log('server is running…… port 8000')
})