# node-study
    node 基本语法

##  安装注意问题
    node 安装完成后
    由于网络问题导致下载包会出问题，安装nrm来选择资源
    npm install -g nrm
    nrm test 选择网络延迟最少的
## npm 
    npm init  创建package.json文件
    npm install  将package.json中的文件依赖的包从网上下载到本地
    npm install -save 包名  将包下载下来并且加载到dependencies中去
    npm install -save-dev 包名 将包下载下来并且加载到devDependencies中去
    npm install -g 包名 全局安装
    npm docs 包名 查看包的文档
    
## windows 安装node 推挤使用nvm-windows
    详情参考  https://github.com/coreybutler/nvm-windows
## node ？
    1. Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
    2. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
## 执行
    相对路径
    ./当前路径
    ../上级目录
    node +文件路径的形式执行
## module.exports 
    1. module.exports是全局的对象 可简写成exports
        node 帮我们实现了var exports=module.exports
        exports 就是module.exports 的别名
        初始值是空对象
    2. 通过模块间传递module.exports对象，来打破封装性

## 进程和线程

## node framework
    1. express
    2. 
## Node.js RESTful API
    1. 什么是 REST？
        REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。
        REST是设计风格而不是标准。REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。REST 通常使用 JSON作为数据传递的格式。
    
        REST 基本架构的四个方法：GET,PUT 更新或添加数据，DELETE 删除数据,POST 添加数据
    2.  RESTful 又是什么？
        简单的说 就是基于REST 架构的 Web Services 即是 RESTful
## node.js mysql
    1. 安装驱动
        由于已经使用nrm更改了淘宝的数据源所以直接使用npm install mysql
    2. curd ..  Front-End-Study/node/node-mysql  
    3. node orm 
    
## node.js mongoDB
    1. 安装驱动
        由于已经使用nrm更改了淘宝的数据源所以直接使用npm install mongodb
    2. curd ..  Front-End-Study/node/node-mongoDB
## JXcore 
    1. what？

    2. use？


