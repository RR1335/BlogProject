const redis = require('ioredis')

const redisClient = redis.createClient()
redisClient.on('error', err => {
    console.error(err)
})


redisClient.set('NameId','RR1335',redis.print)
redisClient.get('NameId',(err,val) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('val', val)

    redisClient.quit()
})