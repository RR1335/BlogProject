const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const fs = require('node:fs')
const path = require('node:path')
const morgan = require('koa-morgan')


const { REDIS_CONF } = require('./config/db')


const index = require('./routes/index')
const users = require('./routes/users')
const blogs = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const ENV = process.env.NODE_ENV
if ( ENV !== 'production' ) {
  app.use(morgan('dev'))
} else {
  const logFilename = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFilename, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }))
}

// redis and session 要实现在 routers 注册之前

// session 配置
app.keys =['ad;dfj^*&^YDFH#KJ#Nj323sdJKLJDC&*(*^']
app.use(session({
  //配置 cookies
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置redis 
  store: redisStore ({
    prefix: 'Koa2-S: ',
    // all: '127.0.0.1:6379',
    all : `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blogs.routes(), blogs.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
