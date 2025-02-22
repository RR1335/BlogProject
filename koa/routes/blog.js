const router = require('koa-router')()
const { getList , 
    getDetail , 
    newBlog,
    delBlog,
    updateBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel');
const logincheck = require('../middleware/logincheck');

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''

    // 完成登录后，补充 admin 认证,页面判断的逻辑
    // if (ctx.query.isAdmin) {
    //     if (ctx.session.username == null) {
    //         ctx.body = new ErrorModel('未登录')
    //         return
    //     }
    //     author = ctx.session.username
    // }

    const listData = await getList(author,keyword)

   ctx.body = new SuccessModel(listData)

})


router.get('/detail', async (ctx,next) => {
    // const result = getDetail(ctx.query.id)

    const data = await getDetail(ctx.query.id)

    ctx.body = new SuccessModel(data)

    // return result.then(data => {
    //     res.json(
    //         new SuccessModel(data)
    //     )
    // })
})

router.post('/new', async (ctx,next) => {
    // req.body.author = req.session.username
    // ctx.request.body.author = ctx.session.username
    const body = ctx.request.body
    body.author = ctx.session.username

    const data = await newBlog(body)

    ctx.body = new SuccessModel(data)


    // const result = newBlog(req.body)

    // return result.then(data => {
    //     res.json(
    //         new SuccessModel(data)
    //     )
    // })
})

router.post('/update',async (ctx,next) => {

    const val = await updateBlog(ctx.query.id,ctx.request.body)

    if (val) {
        ctx.body = new SuccessModel()
    }
    else {
        ctx.body = new ErrorModel('更新失败')
    }

    // const result = updateBlog(req.query.id,req.body)
    // return result.then(val => {
    //     if (val) {
    //         res.json(
    //             new SuccessModel()
    //         )
    //     } else {
    //         res.json(
    //             new ErrorModel('更新失败')
    //         )  
    //     }
    // })

})

router.post('/del', async (ctx,next) => {
    const author = ctx.session.username
    const val = await delBlog(ctx.query.id,author)

    if (val) {
        ctx.body = new SuccessModel()
    }
    else {
        ctx.body = new ErrorModel('删除失败')
    }

    // const result = delBlog(req.query.id,author)

    // return result.then(val => {
    //     if (val) {
    //         res.json(
    //             new SuccessModel()
    //         )
    //     }else {
    //         res.json (
    //             new ErrorModel('删除失败')
    //         )
    //     }
    // })
})


module.exports = router
