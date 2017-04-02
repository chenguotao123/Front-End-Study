//Node.js模块系统
// 1，创建模块

// NodeJS 提供了exports 和 require 两个对象

//exports 是模块公开的接口
// require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
// ./ 为当前目录
// 可以使用绝对路径
// 1,
//var hello = require('./hello');
// hello.world();

// 2,引用
var Hello1 = require('./hello');
var Hello2 = require('./hello');
var hello = new Hello1();
console.log(Hello1)
console.log(Hello2)
hello.setName("我靠");
hello.sayHello();
exports.name = "wokao";
console.log(module)

