# node-study
    node 基本语法

##  安装注意问题
    node 安装完成后
    由于网络问题导致下载包会出问题，安装nrm来选择资源
    npm install -g nrm
    nrm test 选择网络延迟最少的
    
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
    2. 打破封装性，通过模块间传递module.exports对象，来打破封装性
