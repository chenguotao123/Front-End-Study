//创建 Buffer 类

//方法 1
//创建长度为 10 字节的 Buffer 实例：
//var buf = new Buffer(10);

//方法 2
//通过给定的数组创建 Buffer 实例：
//var buf = new Buffer([10, 20, 30, 40, 50]);

//方法 3
//通过一个字符串来创建 Buffer 实例：
//var buf = new Buffer("www.runoob.com", "utf-8");

//utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。


// 写入缓冲区
//buf.write(string[, offset[, length]][, encoding])
buf = new Buffer(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : " + len)

//缓冲区读取数据
//buf.toString([encoding[, start[, end]]])

buf = new Buffer(26);
for (var i = 0; i < 26; i++) {
    buf[i] = i + 97;
}

console.log(buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii', 0, 5));   // 输出: abcde
console.log(buf.toString('utf8', 0, 5));    // 输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcdecls

// Buffer 转换为 JSON 对象
//buf.toJSON()
var buf = new Buffer('www.runoob.com');
var json = buf.toJSON(buf);

console.log(json); 
//[ 119, 119, 119, 46, 114, 117, 110, 111, 111, 98, 46, 99, 111, 109 ]

// .....更多参考 http://www.runoob.com/nodejs