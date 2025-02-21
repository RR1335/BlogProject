// import { RedisStore} from "connect-redis";
const createError = require('http-errors');
const express = require('express');
const fs = require('fs')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const {RedisStore} = require('connect-redis');

const redisClient = require('./db/redis');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
if ( ENV !== 'production' ) {
  app.use(logger('dev'))
} else {
  const logFilename = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFilename, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new RedisStore({
  client : redisClient,
  prefix : "BlogAPP : "
})

// The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }.
app.use(session({
  secret: 'jfiewo34*U(Ukj32@NKJH3#JLkj',
  cookie:{
    path: '/',             // 默认配置
    httpOnly: true,        // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog',blogRouter)
app.use('/api/user',userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
