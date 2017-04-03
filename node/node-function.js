// Node.js 函数
// 1.函数作为参数传入
function say(word) {
  console.log(word);
}

function execute(fn, value) {
  fn(value);
}
// execute(say, "Hello");

//2.匿名函数作为参数
execute(function(word){ console.log(word) }, "Hello");

