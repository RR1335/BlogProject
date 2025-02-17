const getList = (author,keyword) => {
    // 先返回假数据，格式正确
    return [
        {
            id:1,
            author:'yiersan',
            title: '标题 1',
            content:'内容 1',
            createTime:1739699033648

        },
        {
            id:2,
            author:'yiersan',
            title: '标题 2',
            content:'内容 2',
            createTime:1739699106576

        }
    ]
}

const getDetail = (id) => {
    // 返回假数据, 有具体 id ，返回一个对象
    return {
            id:1,
            author:'yiersan',
            title: '标题 1',
            content:'内容 1',
            createTime:1739699033648

        }
}


const newBlog = (blogData = {}) => {
    // blogData 是博客的对象，包含 blog 的所有属性值

    return {
        id: 3     // 表示新建博客插入博客表的位置 —— 3
    }
}

const updateBlog = (id, blogData = {}) => {
    // id ，即将更新的Blog的 id
    // blogData 是博客对象

    // 测试
    // console.log('Updata Blog: ' ,id , blogData)

    return true

}

const delBlog = (id) => {
    // 传参 id ，返回 true 

    return  true
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog

}