const redis = require('ioredis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

// 设置key的值val
function set(key , val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}

// 获取key的值
function get(key) {
    const promise = new Promise((resolve,reject) => {
        redisClient.get(key,(err,val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try{
                resolve(
                    JSON.parse(val)
                )
            }catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}


module.exports = {
    get,
    set
}