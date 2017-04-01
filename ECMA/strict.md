# 严格模式

## 目的

1. 消除JavaScript语法的一些不合理、不严谨之处，减少一些怪异行为；
2. 消除代码运行的一些不安全之处，保证代码运行的安全；
3. 提高编译效率，增加运行效率；
4. 为未来新版本的JavaScript做好铺垫。

## 严格模式标记

```javascript
"use strict";
```
在老版本浏览器会将其当做一行普通字符串忽略。

## 使用模式

### 针对整个脚本文件

将"use strict;"放在脚本文件的第一行，则整个脚本将以“严格模式”运行。如果此语句不放在第一行，则无效，整个脚本以“正常模式”运行。

```javascript
<script>
　　"use strict";
　　console.log("这是严格模式。");
</script>
<script>
　　console.log("这是正常模式。");
	"use strict";
</script>
```
### 针对单个函数

将"use strict;"放在函数体的第一行，则整个函数以"严格模式"运行。

```javascript
function strict() {
	"use strict";
	console.log("这是严格模式。");
}

function noStrict() {
	console.log("这是正常模式。");
	"use strict";
}
```

### 脚本文件的变通写法

由于第一种方式不利于文件合并，所以最好的做法是：将整个脚本文件放在一个沙箱模式（立即执行的匿名函数）中。

```javascript
(function() {
	"use strict";
	// 代码块
}());
```
## 语法以及行为变化

严格模式下，对JavaScript的语法和行为，都做一些变化。

### 全局变量的隐式声明

在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。但是在严格模式已禁止这种用法，全局变量必须显式声明。

```javascript
"use strict";
v = 1; // 报错，v is not defined。
// 在严格模式下，变量必须先使用var定义，在赋值。
```

### 静态绑定

JavaScript语言一个特点，就是允许"动态绑定"，即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在运行时确定的。

严格模式对动态绑定做一些限制。某些情况下，只允许静态绑定。也就是说，属性和方法到底归属哪个对象，在编译阶段就确定。这样做有利于编译效率的提高，也使代码更易阅读，更少出现bug。

详细涉及以下几方面：

1.禁止使用with语句

由于with语句无法再编译阶段就确定 属性到底归属哪个对象

```javascript
"use strict";
var v = 1;
// 报错，语法异常
with(o){
	v = 2;
}
```

2.eval作用域

正常模式，JavaScript语言具有两种变量作用域：全局作用域 和 函数作用域（局部作用域）。
严格模式，具有第三种作用域：eval作用域。

正常模式下，eval语句的作用域取决于 它处于全局作用域，还是函数作用域。
严格模式下，eval语句本身就是一个作用域，不再能够产生全局变量，其所生产的变量只能用于eval内部。

```javascript
"use strict";
var x = 2;
console.log(eval("var x = 3; x")); // 3
console.log(x); // 2
```

3.增强安全性

* 在普通函数执行模式下，禁止this关键字指向全局对象.
* 因此，使用构造函数时，忘记new，this不再指向window对象，而是报错。就不会意外给window对象添加属性或方法。

```javascript
function foo() {
	console.log(this);// window
}

function foo() {
	"use strict";
	console.log(this); // undefined
}

function foo() {
	"use strict";
	this.name = "tom";
}

var f = foo(); // 报错
```

4.禁止在函数内部访问caller以及arguments

```javascript
function fn() {
	"use strict";
	fn.caller;	  // 报错
	fn.arguments; // 报错
}
fn();
```

5.删除变量会显示报错

在严格模式下无法删除变量，并且会显示抛出异常。只有configurable设置为true的对象属性，才能被删除。

```javascript
"use strict";
var x;
delete x; // 报错
var o = Object.create(null, {
	"x": {
		value: 10,
		configurable: true
	}
});
delete o.x; // success
```

6.显式报错

* 在正常模式下，为一个对象的只读属性进行赋值，不会报错，只会默默的失败。
而严格模式下，会抛出异常。

```javascript
"use strict";
var o = {};
Object.defineProperty(o, "v", { value: 1, writable: false });
o.v = 2; // 报错
```

* 严格模式下，对一个使用getter方法读取的属性进行赋值，会报错。

```javacript
"use strict";
var o = {
	get v() { return 1; }
};
o.v = 2; // 报错
```

* 严格模式下，对禁止扩展的对象添加新属性，会报错。

```javascript
"use strict";
var o = {};
Object.preventExtensions(o);
o.v = 1; // 报错
```

* 严格模式下，删除一个不可删除的属性，会报错。

```javascript
"use strict";
delete Object.prototype; // 报错
```

7.重名错误: 严格模式新增了一些语法错误。

* 对象不能有重名的属性
正常模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值。严格模式下，这属于语法错误。

```javascript
"use strict";
var o = {
	p: 1,
	p: 2
}; // 语法错误
```

* 函数不能有重名的参数
正常模式下，如果函数有多个重名的参数，可以用arguments[i]读取。严格模式下，这属于语法错误。

```javascript
"use strict";
function f(a, a, b) { // 语法错误
	return;
}
```

8.禁止八进制表示法
正常模式下，整数的第一位如果是0，表示这是八进制数，比如0100等于十进制的64。严格模式禁止这种表示法，整数第一位为0，将报错。

```javascript
"use strict";
var n = 0100; // 语法错误
```

### arguments对象的限制
arguments是函数的参数对象，严格模式对它的使用做了限制。
1.不允许对arguments赋值

```javascript
"use strict";
arguments++; // 语法错误
var obj = { set p(arguments) { } }; // 语法错误
try { } catch (arguments) { } // 语法错误
function arguments() { } // 语法错误
var f = new Function("arguments", "'use strict'; return 17;"); // 语法错误
```

2.arguments不再追踪参数的变化

```javascript
function f(a) {
	a = 2;
	return [a, arguments[0]];
}
f(1); // 正常模式为[2,2]
function f(a) {
	"use strict";
	a = 2;
	return [a, arguments[0]];
}
f(1); // 严格模式为[2,1]
```

3.禁止使用arguments.callee
这意味着，无法在匿名函数内部调用自身了。

```javascript
"use strict";
var f = function() { return arguments.callee; };
f(); // 报错
```

### 函数必须声明在顶层
将来Javascript的新版本会引入"块级作用域"。为了与新版本接轨，严格模式只允许在全局作用域或函数作用域的顶层声明函数。也就是说，不允许在非函数的代码块内声明函数。

```javascript
"use strict";
if (true) {
	function f() { } // 语法错误
}
for (var i = 0; i < 5; i++) {
	function f2() { } // 语法错误
}
```

### 保留字
为了向将来Javascript的新版本过渡，严格模式新增了一些保留字：implements, interface, let, package, private, protected, public, static, yield，const。
使用这些词作为变量名将会报错。

```javascript
function package(protected) { // 语法错误
	"use strict";
	var implements; // 语法错误
}
```

此外，ECMAscript第五版本身还规定了另一些保留字（class, enum, export, extends, import, super），以及各大浏览器自行增加的const保留字，也是不能作为变量名的。
