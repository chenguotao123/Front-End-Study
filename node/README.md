# node-study
    node base use
##  安装注意问题
    node 安装完成后
    由于网络问题导致下载包会出问题，安装nrm来选择资源
    npm install -g nrm
    nrm test 选择网络延迟最少的
## npm 
    npm init  创建package.json文件
    npm install  将package.json中的文件依赖的包从网上下载到本地
    npm shrinkwrap 保证任何机器上安装的都是同样版本的模块（不管嵌套多少层）,存在则优先将npm-shrinkwrap.json 文件依赖的包进行安装，没有则package.json
    npm install  包名 -save 将包下载下来并且加载到dependencies中去
    npm install  包名 -save-dev  将包下载下来并且加载到devDependencies中去
    npm install  包名 -g  全局安装
    npm docs 包名 查看包的文档

    语义化版本号
        1.2.3
        1表示重大更新
        2表示向下兼容
        3表示补丁包更新
    
    dependencies 
    -  包名：“版本号” 
    -  > +版本号   下载大于某个版本号，npm会下最新版
    -  < +版本号   下载小于某个版本号，npm会下小于这个版本号最新版
    -  <= 小于等于 一定会下你写的这个版本，除非没有你写的这个版本
    -  >= 大于等于  下载最新版
    -   *、" "、X  任意 npm会给你下最新版
    -   ^ +版本号  不跃迁版本下载，^2.1.0 npm会下载大版本不变，去下载2.x.x版本里的最近版
    -   ~ +版本号  会去下约等于这个版本的最新版，在大版本不变的情况下下一个比较新的版本

    npm 启动 node 
    "scripts": {
    "start": "node ./bin/www",
    "test": "node ./bin/test",
    "qm":"node ./bin/test"
    },
    默认 npm start
    可以占用npm 中的命令 npm test
    可以自定义 npm run qm 
## windows 安装node 推荐使用nvm-windows
    详情参考  https://github.com/coreybutler/nvm-windows
## node ？
    1. Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
    2. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
## 执行
    相对路径
    ./当前路径
    ../上级目录
    node +文件路径的形式执行
## 调试
    每次修改代码保存后，我们都需要手动重启程序
    使用 supervisor 可以解决这个繁琐的
    npm install -g supervisor
    运行supervisor --harmony index启动程序
    supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。
## module.exports 
    1. module.exports是全局的对象 可简写成exports
        node 帮我们实现了var exports=module.exports
        exports 就是module.exports 的别名
        初始值是空对象
    2. 通过模块间传递module.exports对象，来打破封装性

## 进程和线程
    1. 进程：
        每一个正在运行的应用程序都被称之为进程
        每一个应用程序都至少有一个进程
        进程是用来给应用程序体用一个执行的环境
        给应用程序分配资源的一个单位

    2. 线程：
        用来执行应用程序中的代码
        在一个进程内部，有很多的线程
## node 事件驱动模型
    主线程：
        1. 执行node的代码，把代码放入队列
        2. 事件循环程序（主线程）把队列里面的同步代码都先执行了
        3. 同步代码执行完成，执行异步代码
        4. 异步代码非2种状况
            1. 异步非io setTimeout() setInterval()
                判断是否可执行，如果可以执行就执行，不可以跳过。
            2. 异步io 文件操作
                会从线程池当中去取一条线程，帮助主线程去执行。
        5. 主线程会一直轮训，队列中没有代码了，主线程就会退出。

    子线程：被放在线程池里面的线程，用来执行异步io操作
        1. 在线程池里休息
        2. 异步io的操作来了，执行异步io操作。
        3. 子线程会把异步io操作的callback函数，扔回给队列
        4. 子线程会回到线程池了去休息。
        callback
        在异步io代码执行完成的时候被扔回主线程。
## 网络协议
     OSI（开放系统互联(Open System Interconnection)）模型中，把网络通信的工作分为了7层，它们分别是：
        HTTP、SMTP、IMAP等 应用层
        加密/解密等 表示层
        通信连接/维持会话 会话层
        TCP/UDP 传输层
        IP 网络层
        网络特有的链路接口 链路层
        网络物理硬件 物理层
        也有人将网络通信的工作分为了5层，便于我们的理解。

        应用层（Application Layer） http
        传输层（Transport Layer） tcp协议
        网络层（Network Layer） ip协议
        链路层（Link Layer） 局域网
        实体层（Physical Layer） 双绞线、光缆
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


