## 面试js 部分
### 1,get/post
    1. 请求方式不同(get/post)
    2. 在请求正文上 
        post请求 输入的信息在请求信息的请求正文中
        get请求   请求正文在请求地址后面 url？+key=value&key1=value1
    3. 在请求头中
        post需要写Content-Type:application/x-www-form-urlencoded
    4. 在请求内容的长度上
        get请求的内容的长度是有限的 
        post请求的的内容的长度是无限的
    5. 在安全问题上
        get请求相对来说不安全
        post请求是相对安全的        
    6.  get 请求有缓存的效果
### 2, 跨域
    * 同源策略:
        是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。
    * 跨域：不同源则跨域（域名，协议，端口完全不相同）

    * 跨域方案：
        1、顶级域名相同的可以通过domain.name来解决，
        即同时设置 domain.name = 顶级域名（如example.com）
        2、document.domain + iframe
        3、window.name + iframe
        4、location.hash + iframe
        5、window.postMessage()

    * jquery jsonp:
        原理：利用了<script src=""></script>标签具有可跨域的特性，
        由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来
        只能以GET方式请求
        
    *cors 服务器响应了响应头: Access-Control-Allow-Origin http 协议规定.
         header("Access-Control-Allow-Origin:*");
        
```javascript
            $.ajax({
            //请求方式必须是get
            type:'get',
            //请求地址
            url:'http://api.map.baidu.com/telematics/v3/weather',
            //请求数据
            data:{'name':'test'},
            //请求方式  如果想要实现jsonp跨域，必须声明是dataType:'jsonp'
            dataType:'jsonp',
            //成功时的回调
            success:function(data){
                }
            })
```
### 3,document load 和document ready的区别
    document.onload 是在结构和样式加载完才执行js
    document.ready原生中没有这个方法，jquery中有 $().ready(function)
    DOMCententLoaded事件：页面的文档结构（DOM树）加载完之后就会触发
    window.onload：不仅仅要在结构和样式加载完，还要执行完所有的外部样式、图片这些资源文件，
    全部加载完才会触发window.onload事件
### 4,介绍js有哪些内置对象？
		Object 是 JavaScript 中所有对象的父对象
		数据封装类对象：Object、Array、Boolean、Number 和 String
		其他对象：Function、Arguments、Math、Date、RegExp、Error
### 5,Javascript作用链域?
		全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节。
		当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，
		直至全局函数，这种组织形式就是作用域链。
### 6,闭包
        闭包：就是能够读取其他函数内部变量的函数。
        闭包的优缺点:
            闭包的结构可以缓存数据，这是其优点，同时也是缺点。
            由于闭包可以缓存数据，本质上就是让数据常驻内存。如此，使用闭包就增大内存开销，使用不当就会造成内存泄漏。

        作用：
            可以访问其他函数内部的数据
            缓存数据

```javascript
	function foo() {
		var obj = {};
		function fn() {
			return obj;
		}
		return fn;
	}
    // 或者下面的写法
	function foo() {
		var obj = {};
		
		return function() {
			return obj;
		};
	}
	// 包含多个函数的闭包
	function foo() {
		var obj = {};
		
		return {
			setObj: function(val) {
				obj.name = val;
			},
			getObj: function() {
				return obj;
			}
		};
	}

        <ul id="testUL">
	        <li> index = 0</li>
	        <li> index = 1</li>
	        <li> index = 2</li>
	        <li> index = 3</li>
	    </ul>
		<script type="text/javascript">
		  	var nodes = document.getElementsByTagName("li");
			for(i = 0;i<nodes.length;i+= 1){
			    nodes[i].onclick = (function(i){
			              return function() {
			                 console.log(i);
			              } //不用闭包的话，值每次都是4
			    })(i);
			}
		</script>
```
### 7,js延迟加载的方式有哪些？
		defer和async、动态创建DOM方式（用得最多）、按需异步载入js
### 8,documen.write和 innerHTML的区别
		document.write只能重绘整个页面
		innerHTML可以重绘页面的一部分
### 9,事件委托是什么
    利用事件冒泡的原理，将事件绑定在父容器中，让父容器代为触发