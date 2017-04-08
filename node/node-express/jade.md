Express框架里内嵌了Jade模板引擎。正好项目里也要用到，本篇整理了下Jade的相关用法。

- 安装与执行
- 标签和属性
- 多行文本
- 变量
- 语句
- Mixin
- 模板
- 注释
- 过滤器

### 安装与执行

安装很简单：

```
npm install jade –global
```

安装后本地随便新建一个sample.jade文件，执行：

```
jade sample.jade
```

就能将其翻译成标准的sample.html源文件了。执行时可以带上参数，通过jade -h查看支持的命令参数：

![img](http://upload-images.jianshu.io/upload_images/1959053-0f0f438662e28957.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

常用的命令参数，比如-P（大写，命令参数是大小写敏感的）。Jade默认编译出来的html源文件里是没有缩进的，不便于开发。加上-P参数后，编译出来的html源文件里就有缩进了：

```
jade -P sample.jade
```

还有-w用来watch监视jade文件，每次改动保存后自动编译成html文件，省去手动执行命令的麻烦：

```
jade -P -w sample.jade
```

-O用来给jade文件传递对象或JSON文件，用以替换模板内的变量：

```
jade -P -w sample.jade -O sample.json
```

### 标签和属性

传统的HTML标签写尖括号很麻烦，Jade里可以省略尖括号，直接写标签名。标签间的嵌套关系用换行加空格来实现。紧接在标签名后加上.xx或#xx，就能给标签添加css类名和id。标签名后第一个空格后面的内容会被编译成标签内的文本内容。例如：

```
doctype html
html
  head
  body
    h1.titleClass#titleID My First Jade Page

//编译出来的结果
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <h1 id="titleID" class="titleClass">My First Jade Page</h1>
  </body>
</html>
```

是不是感觉写起来简单多了。因为css类名和id是最常用的标签属性，所以Jade简化了它俩的写法，可以紧接在标签名后面。但标签属性的正统写法应该是写入()括号内，多个属性用逗号隔开（css类名和id也可以写入()括号内）：

```
a(href='http://www.jackzxl.net', target='_blank') 我的主页

//编译出来的结果
<a href="http://www.jackzxl.net" target="_blank">我的主页</a>
```

HTML里最常用的标签就是div了，所以Jade提供了第二种简化写法，如果不写标签名默认就是div：

```
.divClass#divID 我是一个div

//编译出来的结果
<div id="divID" class="divClass">我是一个div</div>
```

### 多行文本

单行文本像上面这样接在标签名后的空格后面即可。多行文本有两种写法。第一种写法是在标签名后紧接一个.点。这样后面的内容会被Jade模板视作文本域而保留换行符。例如：

```
p.
  第1行文本
  第2行文本
  第3行文本
  第4行文本

//编译出来的结果
<p>
  第1行文本
  第2行文本
  第3行文本
  第4行文本
</p>
```

但由于是文本域，因此用这种写法的话，里面要嵌套标签时，只能写原生的HTML标签了：

```
p.
  第1行文本
  第2行文本
  第3行文本
  第4行文本

//编译出来的结果
<p>
  <span>第1行文本</span>
  第2行文本
  第3行文本
  第4行文本
</p>
```

多行文本的第二种写法是在每行前加上|竖线符。而且如果开发者觉得第一种写法里写原生HTML标签不爽，用这种写法，可以用Jade语法来嵌套标签。例如：

```
p
  span 第1行文本
  | 第2行文本
  | 第3行文本
  | 第4行文本

//编译出来的结果
<p><span>第1行文本</span>第2行文本
  第3行文本
  第4行文本
<p>
```

多行文本的写法不仅可用于p标签等，也常见于style和script标签，例如：

```
script.
  console.log("open mind");
  console.log("learning quick");
  console.log("work hard");
```

### 变量

如果仅仅上面这些快速编写HTML的功能，那Jade也没必要存在了。各种编辑器都有插件可以实现这种快速编写的功能，例如sublime的Emmet插件。模板引擎的真正强大之处可以实现函数式的开发。先看变量。

变量声明很简单，前面加上-横杠。使用变量只要#{变量名}就行了。例如：

```
- var cs = 'UTF-8'
meta(charset='#{cs}')
//编译出来的结果
<meta charset="UTF-8">
```

但注意用#{}输出的变量数据会执行HTML转码，例如：

```
- var alertData = '<script>alert(1);</script>'
p #{alertData}

//编译出来的结果
<p><script>alert(1);</script></p>
```

原本想被执行的script脚本，被直接作为文本打印出来了。如果不想HTML转码，可以将#改成!叹号：

```
- var alertData = '<script>alert(1);</script>'
p !{alertData}

//编译出来的结果
<p><script>alert(1);</script></p>
```

那如果页面就想输出#{}和!{}呢？可以前面加\反斜杠来让Jade引擎不编译变量：

```
p \#{alertData}
p \!{alertData}

//编译出来的结果
<p>#{alertData}</p>
<p>!{alertData}</p>
```

除了用#{}和!{}外，也可以在标签后面紧接=等号（不转义用!=）来输出变量。例如：

```
p= alertData
p!= alertData
```

效果和上面是一样的。这两种写法#{}和=等号输出的区别如下：

```
input(value='#{aaa}')
input(value=aaa)

//编译出来的结果
<input value="undefined">
<input>
```

可以看出用#{}如果变量未定义，将会编译成undefined作为初始值。但用=等号来编译变量的话，如果变量未定义就忽略。

有了变量就能轻松实现前后端分离。数据保存在JSON文件里。前端用Jade模板制作页面，在需要显示数据处用变量来实现。例如sample.json文件里：

```
{
  "charset": "UTF-8",
  "title": "My First Jade Page"
}
```

sample.jade文件里：

```
doctype html
html
  head
    meta(charset='#{charset}')
  body
    h1.titleClass#titleID #{title}
```

执行命令：`jade -P -w sample.jade -O sample.json`后Jade文件里的变量被自动替换。编译出来的sample.html：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <h1 id="titleID" class="titleClass">My First Jade Page</h1>
  </body>
</html>
```

### 语句

Jade模板支持JavaScript语句：

- if-else
- unless
- case-when
- for-in
- each-in
- while

最常见的if-else：

```
- var author = 'Jack';
if author
  p 作者：#{author}
else
  p 无作者

//编译出来的结果
<p>作者：Jack</p>
```

Jade还支持unless语句，它是if-else的反向，写法都一样，用的不多就不举例了。

Jade里的case-when语句就是JavaScript里的switch-case语句（不知为何…）：

```
- var authors = ['Jack', 'Bill'];
case authors[0]
  when 'Jack'
    p 作者是Jack
  when 'Bill'
    p 作者是Bill
  default
    p 无作者

//编译出来的结果
<p>作者是Jack</p>
```

循环遍历用for-in（注意上面的if-else，case-when语句前不用像变量那样加上-横杠，但for的前面要加上-横杠。如果漏写-横杠，会被解析为标签）：

```
- var person = {name:'Jack', gender: 'Male'}
- for (var prop in person)
  p= person[prop]

//编译出来的结果
<p>Jack</p>
<p>Male</p>
```

循环遍历也可以用each-in（each前的-横杠加不加均可）：

```
- var employee = {name:'Jack', gender: 'male'}
- each value, key in person
  p #{key}: #{value}
- var language = ['Java', 'JavaScript', 'C++']
ul
  each item in language
    li #{item}

//编译出来的结果
<p>name: Jack</p>
<p>gender: male</p>
<ul>
  <li>Java</li>
  <li>JavaScript</li>
  <li>C++</li>
</ul>
```

循环遍历也可以用while（同样前面加不加-横杠均可）：

```
- var n = 0
ul
  while n < 4
    li= n++

//编译出来的结果
<ul>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

### Mixin

Mixin也不是个什么新的概念，例如sass里也用Mixin封装css代码，即能重用代码，而且维护简单。Jade也支持Mixin，可以理解为function，最简单的无参数的代码函数：

```
mixin sayHi
  p Hi
+sayHi

//编译出来的结果
<p>Hi</p>
```

上面声明了一个mixin无参函数sayHi，调用时函数名前加上+加号。现在给mixin加上参数：

```
mixin personInfo(name, hobbies)
  p #{name}'s hobbies:
    ul.hobby
      each hobby in hobbies
        li= hobby
+personInfo('Jack', ['movie', 'music'])

//编译出来的结果
<p>Jack's hobbies:</p>
<ul class="hobby">
  <li>movie</li>
  <li>music</li>
</ul>
```

函数内自然也可调用其他函数，例如上面两个函数嵌套起来。这些和普通JavaScript的函数表现一致，没啥好多介绍的：

```
mixin personInfo(name, hobbies)
  +sayHi
  p #{name}'s hobbies:
    ul.hobby
      each hobby in hobbies
        li= hobby
+personInfo('Jack', ['movie', 'music'])
```

### 模板

mixin可以实现代码的复用。文件与文件间常用模板来实现代码复用。Jade用block和extends来实现模板的继承。block块就是定义一段HTML模块：

```
block scripts
  script(src='jquery.js')
  script(src='underscore.js')
  script(src='backbone.js')  

//编译出来的结果
<script src="jquery.js"></script>
<script src="underscore.js"></script>
<script src="backbone.js"></script>
```

上面的块名就是scripts。定义好的block后，本文件内可以直接用block scripts来调用，这和mixin作用差不多，都能实现代码复用。但block真正的作用在于占位，供子文件继承，可以理解为传统OO语言里的虚函数。父文件里定义的block，子文件里用extends来继承并重写。

例如每个文件的页头都一样，就body里内容不一样，可以写一个header.jade：

```
doctype html
html
  head
    meta(charset='#{charset}')
    block scripts
      script(src='jquery.js')
      script(src='underscore.js')
      script(src='backbone.js')
  body
    block content
      p please write content
```

每个页面的header都长这样。而body里定义了block content，这里block可以理解为一个占位符placeholder，需要继承它的文件重写block content。

根据业务需求写页面主体部分，例如sample.jade改成这样：

```
extends header

block content
  h1.titleClass#titleID #{title}
  a(href='http://www.jackzxl.net', target='_blank') 我的主页
  ……
```

在sample.jade里，开头用extends表明和header.jade的继承关系。然后根据业务重写header.jade里的block content。

执行`jade -P -w sample.jade -O sample.json`就能看到和之前一模一样的页面。引擎加载流程是：解析sample.jade，发现开头有extends，就去解析header.jade，将其编译成html。此时html里的body里是`please write content`。解析完header.jade就继续解析sample.jade，发现block content，于是会将定义在header.jade里的block content替换掉。最终输出的是正确的页面内容，而不是`please write content`。

（但如果你执行的是`jade -P -w header.jade -O sample.json`会发现body里内容为`please write content`）

除继承外还可以用include包含。Include会将内容无脑全拷贝进去。例如上面的sample.jade第一行extends header改成include header。编译出来的结果：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="jquery.js"></script>
    <script src="underscore.js"></script>
    <script src="backbone.js"></script>
  </head>
  <body>
    <p>please write content</p>
  </body>
</html>
<h1 id="titleID" class="titleClass">My First Jade Page</h1>
<a href="http://www.jackzxl.net" target="_blank">我的主页</a>
```

可以看出与extends不同，include就是无脑将另一个文件里的内容直接拷贝进去，不像block + extends可以重写block。所以结果是错误的。

小细节注意：include包括extends如果省略后缀名，Jade默认该文件时.jade会进行编译。但如果另一个文件里写的是原生的html，需要写明后缀名为.html（例如include xx.html），明确告诉Jade不要编译。

### 注释

Jade里加上//就能添加注释，用双斜杠的注释会被输出到html源码里。例如：

```
//一行无意义的注释

//编译出来的结果
<!--一行无意义的注释-->
```

如果不想在html源码里输出注释，用//-，在双斜杠后加一横杠。例如：

```
//-一行无意义的注释，编译时直接跳过该行，不会被输出到HTML源码里
```

我们知道html里还可以写注释型的条件语句，常用于兼容IE。Jade里你同样可以写这些条件语句，例如将上面header.jade改成能识别IE89，应用不同的class：

```
doctype html
<!--[if IE 8]><html class='ie8'><![endif]-->
<!--[if IE 9]><html class='ie9'><![endif]-->
<!--[if !IE]><!--><html><!--<![endif]-->
head
  meta(charset='#{charset}')
  block scripts
    script(src='jquery.js')
    script(src='underscore.js')
    script(src='backbone.js')
body
  block content
  p please write content
</html>
```

上面因为有了条件语句，所以html标签用尖括号括了起来，因此最下面要手动加上来闭合标签。而且Jade是空格缩进敏感的，需要将原先的head和body包括里面内容，全往前缩进2个空格。

### 过滤器

Jade同样兼容其他模块，例如写博客爱用的markdown，写css爱用的less，还有coffeeScript等。只要npm安装好后，用:冒号+模块名就能声明使用这些模块，例如：

```
:markdown
  ...
:less
  ...
:coffee
 ...
```

以:markdown 为例，会把下面块里的文本交给markdown去进行处理。
