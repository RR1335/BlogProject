const router = require('koa-router')()
const { signin } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {username , password } = ctx.request.body

    const data = await signin(username,password)

    if (data.username) {
        ctx.session.username = data.username
        ctx.session.realname = data.realname
        ctx.body = new SuccessModel()
        return
    }
    ctx.body = new ErrorModel('Login error')

})


// session 测试
router.get('/s-t', async function(ctx,next) {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0
    }  

    ctx.session.viewCount++

    ctx.body = {
        errno: 0,
        viewCount:ctx.session.viewCount
    }
})


module.exports = router