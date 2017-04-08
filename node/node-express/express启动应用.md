# Express

express启动应用

Windows 平台使用如下命令：

```
> set DEBUG=myapp & npm start

```

然后在浏览器中打开 `http://localhost:3000/` 网址就可以看到这个应用了。







# 一个简单的 Express 路由

这篇教程只是对 Express 路由做一个简单的介绍。路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。

每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个/些函数将被执行。

路由的定义由如下结构组成：`app.METHOD(PATH, HANDLER)`。其中，`app` 是一个 `express` 实例；`METHOD` 是某个 [HTTP 请求方式](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)中的一个；`PATH` 是服务器端的路径；`HANDLER` 是当路由匹配到时需要执行的函数。

本教程假定已经存在一个命名为 `app` 的 `express` 实例了，并且应用程序是运行状态。如果你还不熟悉如何创建一个应用并使其运行，请参考 [Hello world 实例](http://www.expressjs.com.cn/starter/hello-world.html)。

下面的代码展示了几个路由实例：

```
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});



```







# 利用 Express 托管静态文件

通过 Express 内置的 `express.static` 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

将静态资源文件所在的目录作为参数传递给 `express.static` 中间件就可以提供静态资源文件的访问了。例如，假设在 `public` 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

```
app.use(express.static('public'));

```

现在，`public` 目录下面的文件就可以访问了。

```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html

```

所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。

如果你的静态资源存放在多个目录下面，你可以多次调用 `express.static` 中间件：

```
app.use(express.static('public'));
app.use(express.static('files'));

```

访问静态资源文件时，`express.static` 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 `express.static` 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录[指定一个挂载路径](http://www.expressjs.com.cn/4x/api.html#app.use)的方式来实现，如下所示：

```
app.use('/static', express.static('public'));

```

现在，你就爱可以通过带有 “/static” 前缀的地址来访问 `public` 目录下面的文件了。

```
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html

```











# 路由

路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： `app.METHOD(path, [callback...], callback)`， `app` 是 `express`对象的一个实例， `METHOD` 是一个 [HTTP 请求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)， `path` 是服务器上的路径， `callback` 是当路由匹配时要执行的函数。

下面是一个基本的路由示例：

```
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

```

## 路由方法

路由方法源于 HTTP 请求方法，和 `express` 实例相关联。

下面这个例子展示了为应用跟路径定义的 GET 和 POST 请求：

```
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});


```

Express 定义了如下和 HTTP 请求对应的路由方法： `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, 和 `connect`。

有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如： `app['m-search']('/', function ...`

`app.all()` 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 [http 模块](https://nodejs.org/api/http.html#http_http_methods)支持的 HTTP 请求，句柄都会得到执行。

```
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

```

## 路由路径

路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

Express 使用 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) 匹配路由路径，请参考文档查阅所有定义路由路径的方法。 [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) 是测试基本 Express 路径的好工具，但不支持模式匹配。

查询字符串不是路由路径的一部分。

使用字符串的路由路径示例：

```
// 匹配根路径的请求
app.get('/', function (req, res) {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});

```

使用字符串模式的路由路径示例：

```
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});

```

字符 ?、+、* 和 () 是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。

使用正则表达式的路由路径示例：

```
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});

```

## 路由句柄

可以为请求处理提供多个回调函数，其行为类似 [中间件](http://www.expressjs.com.cn/guide/using-middleware.html)。唯一的区别是这些回调函数有可能调用 `next('route')` 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示.

使用一个回调函数处理路由：

```
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});

```

使用多个回调函数处理路由（记得指定 `next` 对象）：

```
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

```

使用回调函数数组处理路由：

```
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

```

混合使用函数和函数数组处理路由：

```
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

```

## 响应方法

下表中响应对象（`res`）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

| 方法                                       | 描述                             |
| ---------------------------------------- | ------------------------------ |
| [res.download()](http://www.expressjs.com.cn/4x/api.html#res.download) | 提示下载文件。                        |
| [res.end()](http://www.expressjs.com.cn/4x/api.html#res.end) | 终结响应处理流程。                      |
| [res.json()](http://www.expressjs.com.cn/4x/api.html#res.json) | 发送一个 JSON 格式的响应。               |
| [res.jsonp()](http://www.expressjs.com.cn/4x/api.html#res.jsonp) | 发送一个支持 JSONP 的 JSON 格式的响应。     |
| [res.redirect()](http://www.expressjs.com.cn/4x/api.html#res.redirect) | 重定向请求。                         |
| [res.render()](http://www.expressjs.com.cn/4x/api.html#res.render) | 渲染视图模板。                        |
| [res.send()](http://www.expressjs.com.cn/4x/api.html#res.send) | 发送各种类型的响应。                     |
| [res.sendFile](http://www.expressjs.com.cn/4x/api.html#res.sendFile) | 以八位字节流的形式发送文件。                 |
| [res.sendStatus()](http://www.expressjs.com.cn/4x/api.html#res.sendStatus) | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。 |

## app.route()

可使用 `app.route()` 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。请参考 [Router() 文档](http://www.expressjs.com.cn/4x/api.html#router) 了解更多有关路由的信息。

下面这个示例程序使用 `app.route()` 定义了链式路由句柄。

```
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

```

## express.Router

可使用 `express.Router` 类创建模块化、可挂载的路由句柄。`Router` 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

在 app 目录下创建名为 `birds.js` 的文件，内容如下：

```
var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;

```

然后在应用中加载路由模块：

```
var birds = require('./birds');
...
app.use('/birds', birds);

```

应用即可处理发自 `/birds` 和 `/birds/about` 的请求，并且调用为该路由指定的 `timeLog` 中间件。









# 使用中间件

Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

*中间件（Middleware）* 是一个函数，它可以访问请求对象（[request object](http://www.expressjs.com.cn/4x/api.html#req) (`req`)）, 响应对象（[response object](http://www.expressjs.com.cn/4x/api.html#res) (`res`)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 `next` 的变量。

中间件的功能包括：

- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件。

如果当前中间件没有终结请求-响应循环，则必须调用 `next()` 方法将控制权交给下一个中间件，否则请求就会挂起。

Express 应用可使用如下几种中间件：

- [应用级中间件](http://www.expressjs.com.cn/guide/using-middleware.html#middleware.application)
- [路由级中间件](http://www.expressjs.com.cn/guide/using-middleware.html#middleware.router)
- [错误处理中间件](http://www.expressjs.com.cn/guide/using-middleware.html#middleware.error-handling)
- [内置中间件](http://www.expressjs.com.cn/guide/using-middleware.html#middleware.built-in)
- [第三方中间件](http://www.expressjs.com.cn/guide/using-middleware.html#middleware.third-party)

使用可选则挂载路径，可在应用级别或路由级别装载中间件。另外，你还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个子中间件栈。

## 应用级中间件

应用级中间件绑定到 [app 对象](http://www.expressjs.com.cn/4x/api.html#app) 使用 `app.use()` 和 `app.METHOD()`， 其中， `METHOD` 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：

```
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});

```

下面这个例子展示了在一个挂载点装载一组中间件。

```
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

```

作为中间件系统的路由句柄，使得为路径定义多个路由成为可能。在下面的例子中，为指向 `/user/:id` 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环。

```
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});

```

如果需要在中间件栈中跳过剩余中间件，调用 `next('route')` 方法将控制权交给下一个路由。 **注意**： `next('route')` 只对使用 `app.VERB()` 或 `router.VERB()` 加载的中间件有效。

```
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 否则将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});

```

## 路由级中间件

路由级中间件和应用级中间件一样，只是它绑定的对象为 `express.Router()`。

```
var router = express.Router();

```

路由级使用 `router.use()` 或 `router.VERB()` 加载。

上述在应用级创建的中间件系统，可通过如下代码改写为路由级：

```
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// 将路由挂载至应用
app.use('/', router);
```

## 错误处理中间件

错误处理中间件有 *4* 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 `next` 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： `(err, req, res, next)`。

```
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

```

请参考 [错误处理](http://www.expressjs.com.cn/guide/error-handling.html) 一章了解更多关于错误处理中间件的内容。

## 内置中间件

从 4.x 版本开始，, Express 已经不再依赖 [Connect](https://github.com/senchalabs/connect) 了。除了 `express.static`, Express 以前内置的中间件现在已经全部单独作为模块安装使用了。请参考 [中间件列表](https://github.com/senchalabs/connect#middleware)。

#### express.static(root, [options])

`express.static` 是 Express 唯一内置的中间件。它基于 [serve-static](https://github.com/expressjs/serve-static)，负责在 Express 应用中提托管静态资源。

参数 `root` 指提供静态资源的根目录。

可选的 `options` 参数拥有如下属性。

| 属性             | 描述                                       | 类型       | 缺省值          |
| -------------- | ---------------------------------------- | -------- | ------------ |
| `dotfiles`     | 是否对外输出文件名以点（`.`）开头的文件。可选值为 “allow”、“deny” 和 “ignore” | String   | “ignore”     |
| `etag`         | 是否启用 etag 生成                             | Boolean  | `true`       |
| `extensions`   | 设置文件扩展名备份选项                              | Array    | `[]`         |
| `index`        | 发送目录索引文件，设置为 `false` 禁用目录索引。             | Mixed    | “index.html” |
| `lastModified` | 设置 `Last-Modified` 头为文件在操作系统上的最后修改日期。可能值为 `true` 或 `false`。 | Boolean  | `true`       |
| `maxAge`       | 以毫秒或者其[字符串格式](https://www.npmjs.org/package/ms)设置 Cache-Control 头的 max-age 属性。 | Number   | 0            |
| `redirect`     | 当路径为目录时，重定向至 “/”。                        | Boolean  | `true`       |
| `setHeaders`   | 设置 HTTP 头以提供文件的函数。                       | Function |              |

下面的例子使用了 `express.static` 中间件，其中的 `options` 对象经过了精心的设计。

```
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));

```

每个应用可有多个静态目录。

```
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));

```

更多关于 `serve-static` 和其参数的信息，请参考 [serve-static](https://github.com/expressjs/serve-static) 文档。

## 第三方中间件

通过使用第三方中间件从而为 Express 应用增加更多功能。

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： `cookie-parser`

```
$ npm install cookie-parser

```

```
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());

```

请参考 [第三方中间件](http://www.expressjs.com.cn/resources/middleware.html) 获取 Express 中经常用到的第三方中间件列表。









# 错误处理

定义错误处理中间件和定义其他中间件一样，除了需要 4 个参数，而不是 3 个，其格式如下 `(err, req, res, next)`。例如：

```
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

```

在其他 `app.use()` 和路由调用后，最后定义错误处理中间件，比如：

```
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // 业务逻辑
});

```

中间件返回的响应是随意的，可以响应一个 HTML 错误页面、一句简单的话、一个 JSON 字符串，或者其他任何您想要的东西。

为了便于组织（更高级的框架），您可能会像定义常规中间件一样，定义多个错误处理中间件。比如您想为使用 XHR 的请求定义一个，还想为没有使用的定义一个，那么：

```
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

```

`logErrors` 将请求和错误信息写入标准错误输出、日志或类似服务：

```
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

```

`clientErrorHandler` 的定义如下（注意这里将错误直接传给了 `next`）：

```
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}

```

`errorHandler` 能捕获所有错误，其定义如下：

```
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

```

如果向 `next()` 传入参数（除了 ‘route’ 字符串），Express 会认为当前请求有错误的输出，因此跳过后续其他非错误处理和路由/中间件函数。如果需做特殊处理，需要创建新的错误处理路由，如下节所示。

如果路由句柄有多个回调函数，可使用 ‘route’ 参数跳到下一个路由句柄。比如：

```
app.get('/a_route_behind_paywall', 
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) { 
    
      // 继续处理该请求
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });

```

在这个例子中，句柄 `getPaidContent` 会被跳过，但 `app` 中为 `/a_route_behind_paywall` 定义的其他句柄则会继续执行。

`next()` 和 `next(err)` 类似于 `Promise.resolve()` 和 `Promise.reject()`。它们让您可以向 Express 发信号，告诉它当前句柄执行结束并且处于什么状态。`next(err)` 会跳过后续句柄，除了那些用来处理错误的句柄。

## 缺省错误处理句柄

Express 内置了一个错误处理句柄，它可以捕获应用中可能出现的任意错误。这个缺省的错误处理中间件将被添加到中间件堆栈的底部。

如果你向 `next()` 传递了一个 error ，而你并没有在错误处理句柄中处理这个 error，Express 内置的缺省错误处理句柄就是最后兜底的。最后错误将被连同堆栈追踪信息一同反馈到客户端。堆栈追踪信息并不会在生产环境中反馈到客户端。

设置环境变量 `NODE_ENV` 为 “production” 就可以让应用运行在生产环境模式下。

如果你已经开始向 response 输出数据了，这时才调用 `next()` 并传递了一个 error，比如你在将向客户端输出数据流时遇到一个错误，Express 内置的缺省错误处理句柄将帮你关闭连接并告知 request 请求失败。

因此，当你添加了一个自定义的错误处理句柄后，如果已经向客户端发送包头信息了，你还可以将错误处理交给 Express 内置的错误处理机制。

```
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

```

