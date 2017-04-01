(function (global) {
    var doc = global.document,
        arr = [],
        push = arr.push;
    function init(selector) {
        //借调Array.prototype.push
        push.apply(this, doc.querySelectorAll(selector))
    }
    
    //工厂模式实例化对象 为了方便无 new 的操作
    var createInit = function (selector) {
        return new init(selector)
    }
    global.$ = createInit
}(window))//利于代码压缩，压缩后就一个字母,减少变量搜索的过程