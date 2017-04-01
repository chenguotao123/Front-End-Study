(function (global) {
    var doc = global.document,
        arr = [],
        push = arr.push;

    var jq = function (selector) {
        // return new init(selector)
        return new jq.fn.init(selector)
    }
    jq.fn = jq.prototype = {
        constructor: jq,

    }
    //初始化jq 对象
    var init = jq.fn.init = function (selector) {

    }

    init.prototype = jq.fn
    //给jq上添加一个静态方法实现组合式继承
    jq.extend = function () {
        var args = arguments,
            obj,
            i;
        for (; i < args.length; i++) {
            obj = args[i]
            for (var k in obj) {
                if (obj.hasOwnProperty(k))
                    this[k] = obj[k]
            }
        }
        return this
    }
    //工具类方法
    jq.extend({
        type: function (obj) {
            if (obj == null) {
                return obj + ""
            }
            return typeof obj != "object" ? typeof obj : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        },
        parseHtml: function (obj) {
            var arr = [],
                div,
                node;
            div = doc.createElement('div')
            div.innerHTML = obj;//把html 字符串转化成dom 元素

            for (node = div.firstChild; node; node = node.nextSibling) {
                if (node.nodeType == 1) {
                    arr.push(node)
                }
            }
            return arr;
        }

    })
    // 类型判断方法
    jq.extend({
        isString: function (obj) {
            return typeof obj === "string";
        },
        isHTML: function (obj) {
            return obj.charAt(0) === '<' && obj.charAt(length - 1) === '>' && obj.length >= 3
        },
        isDOM: function (obj) {
            return obj && !!obj.nodeType
        },
        // 是数组 或者 伪数组 返回值为 true，其他情况返回false
        // 伪数组怎么判断 
        // 过滤函数 和 window对象,因为他们的length属性不是表达元素的个数
        // 如果length 为 0 ，就认为是 伪数组
        // 如果length 大于0，必须保证 obj具有 length - 1 索引
        // 因为 不管是普通数组 或者 稀疏数组，都必须具有 length - 1 索引
        isArrayLike: function (obj) {
            var type = jq.type(obj),
                length = obj && 'length' in obj && obj.length
            if (type === "function" || jq.isWindow(obj)) {
                return false;
            }
            return type === 'arrary' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;

        },
        isFunction: function (obj) {
            return typeof obj === 'function'
        },
        isWindow: function (obj) {
            return obj && obj.window === obj
        }
    });
    //支持模块化开发
    if (typeof define === 'function') {
        define(function () {
            return jq
        });
    }
    else if (typeof exports !== 'undefined') {
        module.exports = jq
    } else {
        global.$ = jq
    }

}(window))
