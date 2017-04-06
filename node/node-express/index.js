//生成一个express 实例 挂载根路由的控制器
var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//     res.send('hello, express1');
// });

//路由

//:name 起了占位符的作用
//express 使用了 path-to-regexp 模块实现的路由匹配。
// app.get('/users/:name', function(req, res) {
//   res.send('hello, ' + req.params.name);
// });
// app.get('/users/:name',(req,res)=>res.send("hello",+req.params.name));

// req.query: 解析后的 url 中的 querystring，如 ?name=haha，req.query 的值为 {name: 'haha'}
// req.params: 解析 url 中的占位符，如 /:name，访问 /haha，req.params 的值为 {name: 'haha'}
// req.body: 解析后请求体，需使用相关的模块，如 body-parser，请求体为 {"name": "haha"}，则 req.body 为 {name: 'haha'}

// var indexRouter=require('./routes/index');
// var userRouter=require('./routes/users');
// app.use('/',indexRouter);
// app.use('/users',userRouter);

//模板引擎 ejs 和express 集成的较好
// npm i ejs --save
var path = require('path');

app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs

var indexRouter=require('./routes/index');
var userRouter=require('./routes/users');

app.use('/',indexRouter);
app.use('/users',userRouter);


app.listen(3000);