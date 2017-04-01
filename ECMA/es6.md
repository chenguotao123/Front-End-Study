# es6知识点

## let和const
1. let 用法类似var.只在代码块内有效
```javascript
    {
        let a=10,
        var b=1
    }
    a // ReferenceError: a is not defined.
    b // 1
```
2. 不存在变量提升
```javascript
    var tmp = 123;

    if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
    }

    if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
    }
```
3. 暂时性死区
    ES6明确规定.如果区块中存在let和const命令.这个区块对这些命令声明的变量.从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量.就会报错。
    总之.在代码块内.使用let命令声明变量之前.该变量都是不可用的。这在语法上.称为“暂时性死区”（temporal dead zone.简称 TDZ）。

4. 不允许重复声明
    let不允许在相同作用域内.重复声明同一个变量。
```javascript
    // 报错
    function () {
    let a = 10;
    var a = 1;
    }

// 报错
function () {
  let a = 10;
  let a = 1;
}
因此.不能在函数内部重新声明参数。

function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

### const声明一个只读的常量。一旦声明.常量的值就不能改变。
    const的作用域与let命令相同：只在声明所在的块级作用域内有效。
```javascript
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```
### 顶层对象
```javascript
    var a = 1;
    // 如果在Node的REPL环境.可以写成global.a
    // 或者采用通用方法.写成this.a
    window.a // 1

    let b = 1;
    window.b // undefined
```
## 变量的解构赋值
1. 数组的解构赋值
```javascript
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    foo // 1
    bar // 2
    baz // 3

    let [ , , third] = ["foo", "bar", "baz"];
    third // "baz"

    let [x, , y] = [1, 2, 3];
    x // 1
    y // 3

    let [head, ...tail] = [1, 2, 3, 4];
    head // 1
    tail // [2, 3, 4]

    let [x, y, ...z] = ['a'];
    x // "a"
    y // undefined
    z // []
```
2. 对象的解构赋值
```javascript
    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb
```
3. 字符串的解构赋值
```javascript
    const [a, b, c, d, e] = 'hello';
    a // "h"
    b // "e"
    c // "l"
    d // "l"
    e // "o"
```
4. 函数参数的解构赋值
```javascript
    function add([x, y]){
    return x + y;
    }

    add([1, 2]); // 3
```
5. 用途
```javascript
（1）交换变量的值
    let x = 1;
    let y = 2;
    [x, y] = [y, x];

（2）从函数返回多个值
    // 返回一个数组
    function example() {
    return [1, 2, 3];
    }
    let [a, b, c] = example();
    // 返回一个对象
    function example() {
    return {
        foo: 1,
        bar: 2
    };
    }
    let { foo, bar } = example();
（3）函数参数的定义

    // 参数是一组有次序的值
    function f([x, y, z]) { ...  }
    f([1, 2, 3]);

    // 参数是一组无次序的值
    function f({x, y, z}) { ...  }
    f({z: 3, y: 2, x: 1});
    （4）提取JSON数据
    let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
    };

    let { id, status, data: number } = jsonData;

    console.log(id, status, number);
    // 42, "OK", [867, 5309]

（5）函数参数的默认值

    jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ...  more config
    }) {
    // ...  do stuff
    };
    指定参数的默认值.就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

（6）遍历Map结构

    任何部署了Iterator接口的对象.都可以用for...of循环遍历。Map结构原生支持Iterator接口.配合变量的解构赋值.获取键名和键值就非常方便。

    var map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
    console.log(key + " is " + value);
    }
    // first is hello
    // second is world
    如果只想获取键名.或者只想获取键值.可以写成下面这样。

    // 获取键名
    for (let [key] of map) {
    // ...
    }

    // 获取键值
    for (let [,value] of map) {
    // ...
    }
（7）输入模块的指定方法
    const { SourceMapConsumer, SourceNode } = require("source-map");
```
## 字符串的扩展
    includes(), startsWith(), endsWith()

    includes()：返回布尔值.表示是否找到了参数字符串。
    startsWith()：返回布尔值.表示参数字符串是否在源字符串的头部。
    endsWith()：返回布尔值.表示参数字符串是否在源字符串的尾部。
```javascript    
    var s = 'Hello world!';

    s.startsWith('Hello') // true
    s.endsWith('!') // true
    s.includes('o') // true
    这三个方法都支持第二个参数.表示开始搜索的位置。

    var s = 'Hello world!';
    s.startsWith('world', 6) // true
    s.endsWith('Hello', 5) // true
    s.includes('Hello', 6) // false
 模板字符串
    // 普通字符串
    `In JavaScript '\n' is a line-feed.`

    // 多行字符串
    `In JavaScript this is
    not legal.`

    console.log(`string text line 1
    string text line 2`);

    // 字符串中嵌入变量
    var name = "Bob", time = "today";
    `Hello ${name}, how are you ${time}?`

```
## 数组的扩展
1. Array.from()
    Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
```javascript 
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
实际应用中.常见的类似数组的对象是DOM操作返回的NodeList集合.以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。

// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
上面代码中.querySelectorAll方法返回的是一个类似数组的对象.只有将这个对象转为真正的数组.才能使用forEach方法。

只要是部署了Iterator接口的数据结构.Array.from都能将其转为数组。

Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
上面代码中.字符串和Set结构都具有Iterator接口.因此可以被Array.from转为真正的数组。

如果参数是一个真正的数组.Array.from会返回一个一模一样的新数组。

Array.from([1, 2, 3])
// [1, 2, 3]
值得提醒的是.扩展运算符（...）也可以将某些数据结构转为数组。

// arguments对象
function foo() {
  var args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]
扩展运算符背后调用的是遍历器接口（Symbol.iterator）Array.from方法则是还支持类似数组的对象。所谓类似数组的对象.本质特征只有一点.即必须有length属性。
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
上面代码中.Array.from返回了一个具有三个成员的数组.每个位置的值都是undefined。扩展运算符转换不了这个对象。

对于还没有部署该方法的浏览器.可以用Array.prototype.slice方法替代。

const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
Array.from还可以接受第二个参数.作用类似于数组的map方法.用来对每个元素进行处理.将处理后的值放入返回的数组。

Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
下面的例子是取出一组DOM节点的文本内容。

let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)
下面的例子将数组中布尔值为false的成员转为0。

Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']
如果map函数里面用到了this关键字.还可以传入Array.from的第三个参数.用来绑定this。

Array.from()可以将各种值转为真正的数组.并且还提供map功能。这实际上意味着.只要有一个原始的数据结构.你就可以先对它的值进行处理.然后转成规范的数组结构.进而就可以使用数量众多的数组方法。

Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
上面代码中.Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

Array.from()的另一个应用是.将字符串转为数组.然后返回字符串的长度。因为它能正确处理各种Unicode字符.可以避免JavaScript将大于\uFFFF的Unicode字符.算作两个字符的bug。

function countSymbols(string) {
  return Array.from(string).length;
}
```
2. Array.of()

 Array.of方法用于将一组值，转换为数组。
 ```javascript
 Array.of(3, 11, 8) // [3,11,8]
 Array.of(3) // [3]
 Array.of(3).length // 1

 Array.of 
 基本上可以用来替代Array()或new Array()，
 并且不存在由于参数不同而导致的重载。它的行为非常统一。

 Array.of() // []
 Array.of(undefined) // [undefined]
 Array.of(1) // [1]
 Array.of(1, 2) // [1, 2]
 Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
 Array.of方法可以用下面的代码模拟实现。
 function ArrayOf(){
 return [].slice.call(arguments);
 }
```