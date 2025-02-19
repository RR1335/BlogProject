const redis = require('ioredis')

// import { createClient } from "redis"


// 创建客户端
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error',err => {
    console.error(err)
})


// 测试
await redisClient.set('NameId','RR1335')
await redisClient.get('NameId',(err,val) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('val', val)

    //退出
    redisClient.quit()
})


// import { createClient } from 'redis';
// const redis = require('redis')

// const client = redis.createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('NameId', 'RR1335');
// const value = await client.get('RR1335');
// console.log('value: ', value)

// client.quit()