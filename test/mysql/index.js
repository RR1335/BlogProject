const mysql = require('mysql2')

// 创建连接对象 
const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'12379010',
    port:'3306',
    database:'MyBlog'
})

// 开始连接
conn.connect()

// 执行SQL语句
// const sql = 'select * from users;'
// const sql =`update users set realname='三哥的三' where username='san';`
const sql = `delete from blogs where id = 3;`


conn.query(sql, (err,result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// 关闭连接
conn.end()