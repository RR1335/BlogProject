const handleBlogRouter = (req,res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    // 获取博客 List
    if (method === 'GET' && path === '/api/blog/list') {
        return {
            msg: '获取博客list'
        }
    }  

    // 获取博客 Detail
    if (method === 'GET' && path === '/api/blog/detail') {
        return {
            msg: '获取博客详情'
        }
    }


    // 新建博客 new
    if (method === 'POST' && path === '/api/blog/now') {
        return {
            msg: '新建博客 new'
        }
    }

    // 更新博客 update
    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: '更新博客 update'
        }
    }

    // 删除博客 update
    if (method === 'POST' && path === '/api/blog/del') {
        return {
            msg: '删除博客 del'
        }
    }


    

}