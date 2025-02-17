const { getList , 
        getDetail , 
        newBlog,
        delBlog,
        updateBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req,res) => {
    const method = req.method
    const id  = req.query.id
    // const url = req.url
    // const path = url.split('?')[0]

    // 获取博客 List
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        const listData = getList(author, keyword)

        // 按照格式输出内容
        return new SuccessModel(listData)
    }  

    // 获取博客 Detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        
        return new SuccessModel(data)
    }


    // 新建博客 new
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body

        const data = newBlog(blogData)
        return new SuccessModel(data)

    }

    // 更新博客 update
    if (method === 'POST' && req.path === '/api/blog/update') {
        // id 在头部有定义
        const blogData = req.body
        const result = updateBlog(id, blogData)

        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失败 api/blog/update')
        }

    }

    // 删除博客 update
    if (method === 'POST' && req.path === '/api/blog/del') {
        // id 已经定义了
        const result = delBlog(id)
        if (result) {
            return new  SuccessModel()
        } else {
            return new ErrorModel('删除微博失败 api/blog/del')
        }
    }

}

// 输出函数
module.exports = handleBlogRouter