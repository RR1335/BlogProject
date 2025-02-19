const { getList , 
        getDetail , 
        newBlog,
        delBlog,
        updateBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

//登录验证的函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('Not Sign in .')
        )
    }      
}



const handleBlogRouter = (req,res) => {
    const method = req.method
    const id  = req.query.id
    // const url = req.url
    // const path = url.split('?')[0]

    // 获取博客 List
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        const result = getList(author,keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })

        // const listData = getList(author, keyword)

        // // 按照格式输出内容
        // return new SuccessModel(listData)
    }  

    // 获取博客 Detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(idData => {
            return new SuccessModel(idData)
        })

        // const data = getDetail(id)
        // return new SuccessModel(data)
    }


    // 新建博客 new
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body

        // 登录状态检查
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheck
        }

        // req.body.author = 'san' // 等开发了登录模块，再调整
        // 读取 session 的字段
        req.body.author = req.session.username

        const result = newBlog(blogData)
        return result.then(data => {
            return new SuccessModel(data)
        })

        // const data = newBlog(blogData)
        // return new SuccessModel(data)

    }

    // 更新博客 update
    if (method === 'POST' && req.path === '/api/blog/update') {
        // id 在头部有定义
        const blogData = req.body
        const result = updateBlog(id, blogData)

         // 登录状态检查
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheck
        }

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败 api/blog/update')
            }    
        })
    }

    // 删除博客 update
    if (method === 'POST' && req.path === '/api/blog/del') {
        // id 已经定义了
        // const author = 'san'
            // 登录状态检查
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                // 未登录
                return loginCheck
            }
        
            
        const author = req.session.username

        const result = delBlog(id,author)

        return result.then(delVal => {
            if (delVal) {
                return new  SuccessModel()
            } else {
                return new ErrorModel('删除微博失败 api/blog/del')
            }
        })
    }

}

// 输出函数
module.exports = handleBlogRouter