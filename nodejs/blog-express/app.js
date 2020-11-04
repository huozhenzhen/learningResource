var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');

const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')
const path = require('path')
const fs = require('fs');
const logger = require('morgan');
// var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var blogRouter = require('./routes/blog');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV

if (ENV !== 'production') {
  app.use(logger('dev', {
    stream: process.stdout
  }));
} else {
  const logFileName = path.resolve(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const sessionStore = new RedisStore(
  {
    client: redisClient
  }
)
app.use(session({
  secret: 'jiasuola_1',  
  
  cookie: {
    // path: '/',
    // httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}))

// app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
