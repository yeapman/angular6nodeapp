var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var indexRouter = require('./app_api/routes/index');
var usersRouter = require('./app_api/routes/users');
var apiRouter = require('./app_api/routes/api');
var app = express();
var server = require('http').createServer(app);
var http = require('http').Server(app);
var io = require('socket.io')(server);
// require('./api/models/db');
// require('./api/config/passport');

/* mongoose connection */
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/testDB';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function call() {
   console.log('mongose opened')
});
/*mongoose connection end*/

io.on('connection', function(socket) {
    socket.on('disconnect', function() {
        // console.log('user disconnedcted');
    });
    setInterval(function(){ socket.emit('news', {for: 'everyone'})}, 3000);
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
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
server.listen(8080);