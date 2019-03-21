var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const appLogger= require('./logger-setup')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var debug = require('debug')('debug-log-demo:app');

var app = express();

//testing logs
appLogger.log('error', "127.0.0.1 - there's no place like home");
appLogger.log('warn', "127.0.0.1 - there's no place like home");
appLogger.log('info', "127.0.0.1 - there's no place like home");
appLogger.log('verbose', "127.0.0.1 - there's no place like home");
appLogger.log('debug', "127.0.0.1 - there's no place like home");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

debug("Before middlewares")

// app.use(logger('dev'));
app.use(require("morgan")("combined", { stream: appLogger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
