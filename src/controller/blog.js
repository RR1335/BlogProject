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

module.exports = {
    getList,
    getDetail

}