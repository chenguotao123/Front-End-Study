//1,引入 http 模块
var http = require("http");
//2,创建服务器
http.createServer(function (req, res) {

  // 发送 HTTP 头部 
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.method == "GET") {
    res.end("this is get");
  } else if (req.method == "POST") {
    res.end("this is POST");
  } else {
    // 发送响应数据 "Hello World"
    res.end('Hello World');
  }

}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');


//等价于
// function onRequest(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello World");
//   response.end();
// }
// http.createServer(onRequest).listen(8888);

//我们向 createServer 函数传递了一个匿名函数。