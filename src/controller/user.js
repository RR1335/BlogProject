const {exec, escape } = require('../db/mysql')


const signin = (username,password) => {
    // 防止SQL注入
    username = escape(username)
    password = escape(password)

    // 去掉 username=‘${username}’ and password=’${password}‘ 去掉单引号
    const sql = `
        select username , realname from users where username=${username} and password=${password}
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })

}

module.exports = {
    signin
}