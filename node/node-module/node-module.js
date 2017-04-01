//Node.js模块系统
// 1，创建模块

// NodeJS 提供了exports 和 require 两个对象

//exports 是模块公开的接口
// require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
// ./ 为当前目录
// 1,
//var hello = require('./hello');
// hello.world();

// 2,
var Hello = require('./hello');
let hello = new Hello();
hello.setName("我靠");
hello.sayHello();
