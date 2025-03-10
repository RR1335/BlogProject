const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF 
let REDIS_CONF

// 开发环境
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user:'root',
        password:'12379010',
        port:'3306',
        database:'MyBlog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
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

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}