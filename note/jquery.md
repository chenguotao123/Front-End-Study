### jquery 有两大特性：
    1，隐式迭代 
    2，链式编程
    3， $本质是jQuery原型上的init这个工厂构造函数，根据传入的参数不同实现不同的功能

### jquery 与 dom 对象转化
    dom->jquery $() 包裹一个dom对象
    jquery->dom   
        1)var $box=$("#box") 通过索引取出$box[0]
        2)$box.get(0)
### html(),empty()，remove() 清空元素
    $(“div”).html(“”);//使用html方法来清空元素，不推荐使用，会造成内存泄漏，绑定的事件不会被清除。
    $(“div”).empty();//清空div的所有内容（推荐使用，会清除子元素上绑定的内容）
    $(“div”).remove();自身也删除   
### attr,prop
    attr("box",值) 设置单个属性
    attr({})    设置多个属性
    取表单值属性时会得到undefined
    这里可以使用prop 
    自定义属性使用attr,自带属性使用prop
### 事件绑定，事件代理，事件委托
    绑定多个事件
    1)$("#box").bind(""click mouseenter",function(){
        ...
    })
    2)$("#box").bind({
        "click":function(){
            ...
        },
        "mouseenter":function(){
            ...
        }
    })
        问题：新创建的元素没有事件
        解决:jq 推出新的事件的添加方式delegate
        //叫做事件委托，或者事件代理 原理是事件冒泡
        $("#box").delegate("p","click",function(){
            .....
        })
    3）新版本jq 统一使用on
        1，简单事件添加
            $("#box").on("click",function(){
                ...
            })
        2，同时添加多个事件
            $("#box").on({
            "click":function(){
                ...
            },
            "mouseenter":function(){
                ...
            }
        })
        3，事件委托 一般只添加一次事件委托
            $("#box").on("click","p",function(){
                .....
            })
        事件委托好处：
            1，提高性能
            2，新添加的元素也有事件
        执行顺序的问题：
            一个标签添加了自身的事件，
            又添加了委托事件，则委托事件先执行，然后自身事件执行（冒泡）
        解绑事件：
            1）解绑普通事件
              $("#box").off("click")
            2)解绑多个
                $("#box").off("mouseenter click")
            3)解绑委托事件
                $("#box").off("click","**")
            4）$("#box").off() //接除box盒子所有的事件

            trigger() 可以传入一个参数，为事件类型
            triggerHandler() 触发事件，但是不执行标签的默认效果

        jq中阻止事件冒泡：
            1，阻止事件传播
                e.stopPropagation();   
            2，阻止事件触发的默认效果
                e.preventDefault();
            3，return false 不仅可以阻止默认效果，还能阻止事件冒泡
       
### 基于jquery的开发插件
    ```javascript
        1)jQuery.fn.extend({
        check: function() {
            return this.each(function() { this.checked = true; });
        },
        uncheck: function() {
            return this.each(function() { this.checked = false; });
        }
        });

        2)jQuery.fn.check=function(){

        }
    ```
### jquery 的jsonp 跨域请求
    原理：
        利用了<script src=""></script>标签具有可跨域的特性，
        由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来
        只能以GET方式请求
        
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