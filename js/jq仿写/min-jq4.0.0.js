(function (global) {
    var doc = global.document,
        arr = [],
        push = arr.push,
        slice = arr.slice;

    var jq = function (selector) {
        // return new init(selector)
        return new jq.fn.init(selector)
    }
    jq.fn = jq.prototype = {
        constructor: jq,
        length: 0,
        toArray: function () {
            return slice.call(this)
        },
        get: function (index) {
            if (index == null) {
                return this;
            }
            return jq(this[index < 0 ? this.length + index : index])
        },
        eq: function (index) {
            return jq(this[index < 0 ? this.length + index : index])
        },
        first: function () {
            this.eq(0)
        },
        last: function () {
            this.eq(-1)
        },
        each: function (callBack) {
            jq.each(this, callBack)
            return this
        },
        splice: arr.splice

    }
    //初始化jq 对象
    var init = jq.fn.init = function (selector) {
        //对传入的selector 参数做判断

        // 1 无效值 null undefined ''
        if (!selector) {
            return this
        }
        // 2 字符串 a html b 选择器
        else if (jq.isString(selector)) {
            if (jq.isHTML(selector)) {
                return push.apply(this, jq.parseHtml(selector))
            } else {
                return push.apply(this, doc.querySelectorAll(selector))
            }
        }
        //3,dom 
        else if (jq.isDOM(selector)) {
            this[0] = selector;
            this.length = 1;
        }
        // 4 dom数组或伪数组
        else if (jq.isArrayLike(selector)) {
            push.apply(this, selector)
        }
        //5 函数
        else if (jq.isFunction(selector)) {
            //dom 元素 加载完执行
            doc.addEventListener("DOMEContentLoaded", selector())
        }
    }

    init.prototype = jq.fn
    //给jq上添加一个静态方法实现组合式继承
    jq.extend = jq.fn.extend = function () {
        var args = arguments,
            obj,
            i = 0;
        if (args.length > 1) {
            this = args[0] || {}
            i = 1
        }
        for (; i < args.length; i++) {
            obj = args[i]
            for (var k in obj) {
                if (obj.hasOwnProperty(k))
                    this[k] = obj[k]
            }
        }
        return this
    }
    //DOM操作模块
    jq.fn.extend({
        appendTo: function (target) {
            var self = this,
                arr = [],
                node;
            target = jq(target)
            target.each(function (i, el) {
                self.each(function () {
                    node = i === 0 ? this : this.cloneNode(true)
                    arr.push(node)
                    el.appendChild(node)
                })
            })
            //链式编程
            return arr;
        },
        append: function (source) {
            var source = jq(source)
            source.appendTo(this)
            return this;
        },
        prependTo: function (target) {
            var ret = [],
                self = this,
                node,
                firstChild; // 存储目标元素的第一个子节点

            target = jq(target);
            target.each(function (i, elem) {
                // 获取当前目标元素第一个子节点
                firstChild = elem.firstChild;
                self.each(function () {
                    node = i === 0 ? this : this.cloneNode(true);
                    ret.push(node);
                    // 将得到的新节点，在firstChild前边给elem添加子节点
                    elem.insertBefore(node, firstChild);
                });
            });

            return jq(ret);
        },
        prepend: function (source) {
            source = jq(source);
            source.prependTo(this);
            return this;
        },
        nextAll: function () {
            var arr = [], node;
            this.each(function (i, el) {
                node = el.nextSibling
                while (node) {
                    if (node.nodeType === 1) {
                        arr.push(node)
                    }
                    node = node.nextSibling
                }
            })
            return jq(jq.unique(arr))
        },
        next: function (elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function (elem) {
            return sibling(elem, "previousSibling");
        },
        remove: function () {
            return this.each(function () {
                this.parentNode.removeChild(this)
            })
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        before: function (node) {
            return this.each(function (i, el) {
                if (jq.isString(node)) {
                    if (jq.isHTML(node)) {
                        node = jq(jq.parseHtml(node))
                    } else {
                        node = jq(doc.createTextNode(node))
                    }
                }
                node.each(function () {
                    el.parentNode.insertBefore(i === 0 ? this : this.cloneNode(true), el)
                })
            })
        },
        after: function () {
            return this.each(function (i, elem) {
                var nextSibling = elem.nextSibling;
                node = jq(jq.isString(node) ? doc.createTextNode(node) : node);
                node.each(function (j, cur) {
                    elem.parentNode.insertBefore(i === 0 ? cur : cur.cloneNode(true), nextSibling);
                });
            });
        },
        parent: function () { },
        parents: function () { },

    })
    //属性操作模块
    jq.propFix = {
        'class': 'className',
        'for': 'htmlFor'
    }
    jq.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function () {
        jq.propFix[this.toLowerCase()] = this;
    });
    jq.fn.extend({
        attr: function (name, value) {
            //判断value的值
            // 若value的值为空，且name 是Object，遍历name 给this 设置属性值
            //              -- name 不是Object， 则返回this 的name 属性值
            //value 不为空 给this设置name 属性值 value 
            if (value == undefined) {
                if (typeof name === "object") {
                    this.each(function () {
                        for (var k in name) {
                            this.setAttribute(k, name.k)
                        }
                    })
                } else {
                    //属性的字符串
                    return this.length === 0 ? undefined : this[0].getAttribute(name)
                }
            } else {
                this.each(function () {
                    this.setAttribute(name, value)
                })
            }
            return this
        },
        prop: function (name, value) {
            var propName;
            if (value == undefined) {
                if (typeof name === 'object') {
                    this.each(function (i, elem) {
                        for (var k in name) {
                            propName = propFix[k] || k;
                            elem[propName] = name[k];
                        }
                    });
                } else {
                    propName = propFix[name] || name;
                    return this.length === 0 ? undefined : this[0][propName];
                }
            } else {
                this.each(function () {
                    propName = propFix[name] || name;
                    this[propName] = value;
                });
            }

            return this;
        },
        val: function (value) {
            if (value == undefined) {
                return this.length == 0 ? undefined : this[0].value = value
            } else {
                return this.each(function () {
                    this.value = value
                })
            }
        },
        html: function (html) {
            if (html == undefined) {
                return this.length == 0 ? undefined : this[0].innerHTML = html
            } else {
                return this.each(function () {
                    this.innerHTML = html
                })
            }
        },
        text: function (text) {
            if (text == undefined) {
                return this.length == 0 ? "" : this[0].textContent = text
            } else {
                return this.each(function () {
                    this.textContent = text
                })
            }
        },
    })
    //事件模块
    jq.fn.extend({
        on: function (type, callBack) {
            return this.each(function () {
                this.addEventListener(type, callBack)
            })
        },
        off: function (type, callback) {
            return this.each(function () {
                this.removeEventListener(type, callback)
            })
        }
    })
    jq.each(('click dblclick keydown keypress mouseover mouseout mouseenter mouseleave mousemove' +
        ' mousedown mouseup keyup focus blur load').split(' '), function (i, type) {
            //  this->数组元素
            jq.fn[type] = function (callback) {
                return this.on(type, callback);
            }
        })


    //样式模块
    jq.extend({
        hasClass: function (className) {
            var flag = false
            this.each(function () {
                this.classList.contains(className) ? flag = true : flag = false
                return false //结束循环
            })
            return flag
        },
        addClass: function (className) {
            return this.each(function () {
                if (!jq(this).hasClass(className)) {
                    this.classList.add(className);
                }
            });
        },
        removeClass: function (className) {
            return this.each(function () {
                if (this.classList.contains(className)) {
                    this.classList.remove(className)
                }
            })
        },
        tooggleClass: function (className) {
            return this.each(function () {
                if (this.classList.contains(className)) {
                    this.classList.remove(className)
                } else {
                    this.classList.add(className)
                }
            })
        },
        css: function (name, value) {
            if (value == undefined) {
                if (typeof name == "object") {
                    this.each(function () {
                        for (let k in name) {
                            (this.nodeType === 1) && (this[k] = name[k])
                        }
                    })
                } else {
                    this.each(function () {
                        return this.length === 0 ? undefined : global.getComputedStyle(this[0]).name
                    })
                }
            } else {
                this.each(function () {
                    this.style[name] = value
                })
            }
            return this;
        }

    })
    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) { }
        return cur;
    }
    //ajax模块
    function createRequest() {
        return window.XMLHttpRequest ? new window.XMLHttpRequest() :
            new window.ActiveXObeject("XMLHTTP");
    }
    function formatData(data) {
        let k, ret = [];
        for (k in data) {
            ret.push(window.encodeURIComponent(k) + '=' + window.encodeURIComponent(data[k]))
        }
        return ret.join("&")
    }
    jq.extend({
        //默认的ajax设置
        ajaxSettings: {
            url: '',
            type: 'get',
            data: {},
            dataType: 'json',
            success: null,
            fail: null,
            async: true,
            contentType: 'application/x-www-form-urlencoded',
            jsonp: 'callback', // 指定参数名字 param=value
            jsonpCallback: '',  // 指定全局回调函数名字
            timeout: 0
        },
        ajax: function (config) {
            if (!config || !config.url) {
                return
            }
            var context = {}
            //合并用户和默认值
            jq.extend(context, jq.ajaxSettings, config)
            //跨域
            if (context.dataType.toLowerCase() === "jsonp") {
                //1,创建请求对象
                let scriptElem = doc.createElement("script")
                let headElem = doc.getElementsByTagName("head")[0]
                headElem.appendChild(scriptElem)
                //2,创建全局函数
                let callbackName = context.jsonpCallback || (jsonp_ + Math.random()).repalce(".", "")
                //3, script src 中地址赋值 全局回调函数的名字
                context.data[context.jsonp] = callbackName //callback=callbackName
                global[callbackName] = function (data) {
                    //成功、
                    //清除 延迟函数和script标签
                    global.clearTimeout(scriptElem.timer)
                    headElem.removeChild(scriptElem)
                    delete global[callbackName]
                    context.success && context.success(data)
                }
                //4,格式化src
                context.url += "?" + formatData(context.data)
                //监听请求状态
                if (context.timeout) {
                    scriptElem.timer = global.setTimeout(function () {
                        //失败
                        headElem.removeChild(scriptElem);
                        delete global[callbackName];
                        context.fail && context.fail({ message: "请求超时" })
                    }, context.timeout)
                }
                // 5：发送请求
                scriptElem.src = context.url;
            } else {
                let xhr = createRequest(),
                    postData;
                postData = formatData(context.data)
                if (context.type.toLowerCase() === "get") {
                    context.url += "?" + postData;
                    postData = null;
                }
                xhr.open(context.type.toLowerCase(), context, url, context.async)
                    (context.type.toLowerCase() === "post") && (xhr.setRequestHeader("Content-Type", context.textContent))
                xhr.onreadystatechange = function () {
                    var readyState = xhr.readyState,
                        status = xhr.status;
                    if (readyState == 4) {
                        if (status >= 200 && status < 300 || status == 304) {
                            let data = context.dataType.toLowerCase() == "json" ?
                                JSON.parse(xhr.responseText) : xhr.responseText;
                            context.success && context.success(data, context, xhr)
                        } else {
                            context.fail && context.fail(data, context, xhr)
                        }
                    }
                }
                xhr.send(postData);
            }

        }
    })
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
        },
        each: function (obj, callBack) {
            var i = 0, l;
            if (jq.isArrayLike(obj)) {
                l = obj.length
                for (; i < l; i++) {
                    if (callBack.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                //对象
                for (i in obj) {
                    if (callBack.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj
        },
        unique: function (arr) {
            var res = [];
            jq.each(arr, function () {
                if (res.indexOf(this) === -1) {
                    res.push(this)
                }
            })
            return res;
        }
    })
    // 类型判断方法
    jq.extend({
        isString: function (obj) {
            return typeof obj === "string";
        },
        isHTML: function (obj) {
            return obj.charAt(0) === '<' && obj.charAt(obj.length - 1) === '>' && obj.length >= 3
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
