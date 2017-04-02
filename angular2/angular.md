## Angular-CLI
    是一个命令行界面工具，它可以创建项目、添加文件以及执行一大堆开发任务，比如测试、打包和发布。

### 设置开发环境
1.  requird node 4.x.x 和 npm 3.x.x 以上
2.  全局安装 Angular-CLI
    npm install -g @angular/cli
    
    npm uninstall -g @angular/cli
### 创建新项目以及应用的骨架
    ng new my-app
    请耐心等待。 创建新项目需要花费很多时间，大多数时候都是在安装那些npm包。
### 启动开发服务器
    进入项目目录，并启动服务器。
    cd my-app
    ng serve

    开启成功之后
    在浏览器中打开http://localhost:4200/
    显示 app works!
### 编辑该应用