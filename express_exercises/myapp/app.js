var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require("cookie-session")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jokeRouter = require("./routes/joke")
var jokesRouter = require("./routes/jokes")
var addJokeRouter = require("./routes/addJoke")
var storeJokeRouter = require("./routes/storeJoke")
var loginRouter = require("./routes/login")
var apiRouter = require("./routes/api")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: "session",
  secret: "I_should_never_be_visible_in_code",
  maxAge: 30 * 60 * 1000 // 24 hours
}))



app.use((req, res, next) => {
  console.log("\n\n------Session-Before-----------")
  console.log("jokeCount",req.session.jokeCount);
  console.log("jokesCount",req.session.jokesCount);
  console.log("storeJoke",req.session.storeJokeCount);
  console.log("-------------------------------\n")

  
  console.log("Method is", req.method);
  if (req.method == "POST") {
    let userName = req.body.userName
    if(userName){
      console.log("logging in with username:", req.query.userName);
      req.session.userName = userName
      console.log("session username:", req.session.userName)

      //change the method to get:
      req.method = "GET"
    }
  }
  next()
})

app.use("/api",apiRouter)

app.use((req,res,next)=>{
  console.log("User session:", req.session.userName)
  if(!req.session.userName){
     req.url = "/login"
  }
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/joke", jokeRouter)
app.use("/jokes", jokesRouter)
app.use("/addJoke", addJokeRouter)
app.use("/storeJoke", storeJokeRouter)
app.use("/login", loginRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.rest){
    const status = err.status ? err.status : 500
    res.status(status)
    console.log(req.app.get("env"))
    let error = req.app.get("env") === "development" ? err.stack : {}
    return res.json({status, message: err.message, error})
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
