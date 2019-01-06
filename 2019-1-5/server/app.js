var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
/* datura接口 20170302 */
// var appData = require('./api/checklogin.json')  /* 引入根目录下goods.json数据文件 */
// var goods = appData.users   /* goods.json文件文件下的.goods数据赋值给变量goods */
// var apiRoutes = express.Router()  /* 定义express.Router() 对象 */
// apiRoutes.post('/users', function(req, res){   /* 定义接口并返回数据 */
//   res.json({
//     data: users
//   })
// })
// app.use('/api', apiRoutes)  /* 定义接口在/api目录下，方便管理 */
/* datura接口 _end */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
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
app.listen(8888,()=>{
  console.log('服务器已启动')
})
module.exports = app;
