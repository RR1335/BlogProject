const { exec } = require('../db/mysql')

const getList = (author,keyword) => {
    let sql = `select * from blogs where 1=1 ` //注意 1=1 后应该有一个空格
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)


}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}' `
    // exec 执行的结果是一个数组，getDetail返回一个具体的值（对象）
    // 基于id查询只有一个值，取数组的第一个值就是要返回的对象
    return exec(sql).then(rows => {
        return rows[0]
    })
}


const newBlog = (blogData = {}) => {
    // blogData 是博客的对象，包含 blog 的所有属性值
    const title = blogData.title
    const content = blogData.content
    const createtime = Date.now()
    const author = blogData.author

    const sql = `
        insert into blogs (title,content,createtime,author)
        values ('${title}','${content}',${createtime},'${author}')
    `

    return exec(sql).then(insertData => {
        // console.log('insertData : ',insertData)
        // insertId -- 是MySQL新建数据后的返回值中的一项
        return {
            // 返回，插入成功后的行 id
            id: insertData.insertId
        }
    })

}

const updateBlog = (id, blogData = {}) => {
    // id ，即将更新的Blog的 id
    // blogData 是博客对象
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}' , content='${content}' where id=${id}
    `
    
    return exec(sql).then(updateData => {
        console.log('updateData: ',updateData)
        if (updateData.affectedRows >0 ) {
            return  true
        }
        return false
    })
}

const delBlog = (id,author) => {
    // 传参 id ，返回 true 
    const sql = `delete from blogs where id='${id}' and author='${author}' `

    return  exec(sql).then(delData => {
        console.log('delData: ',delData)
        if (delData.affectedRows >0) {
            return true
        }
        return false
    })
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog

}