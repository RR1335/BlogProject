const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF 

// 开发环境
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user:'root',
        password:'12379010',
        port:'3306',
        database:'MyBlog'
    }
} 

// 生产环境
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user:'root',
        password:'12379010',
        port:'3306',
        database:'MyBlog'
    }
}

module.exports = {
    MYSQL_CONF
}