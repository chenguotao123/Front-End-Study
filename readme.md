#  前端技术栈
    以下是个人前端学习总结
## html css
    1. 基本html标签

    2. css语法
        1. css 三大特性：
            层叠性
            继承性
            优先级

        2. margin：
            垂直外边距合并
            如何解决垂直外边距塌陷（margin-top  父元素会掉下来）？
                1，给父元素设置边框
                2，给父元素设置overflow：hidden；
                注意：会触发父元素的bfc(格式化上下文)

        3. Padding
            特殊性： 在块级元素中，如果默认子元素没有设置宽度，给当前子元素设置padding值，不会影响当前子盒子的宽度。（“继承”的盒子padding值不会影响）

        4. float
            作用：布局   网页导航   图片文字环绕（文字不会被图片压着）

            清理浮动：实质是清理浮动造成的影响

            什么时候清理浮动？
                1. 父容器没有设置高度
                2. 父容器所有子元素都设置浮动

            如何清理浮动？
                1，clear：both;
                2,给父元素设置overflow：hidden;(父元素没有定位)
                3，使用伪元素 before after
                4,display: table;

            overflow用法：默认值 visible  hidden|scroll|auto (根据内容判断是否添加滚动条)
            
        5. position
            1. 静态（static）标准流下的显示方式，可转换成其他定位方式
            2. 绝对 （absolute）：
                1）标准流下的盒子，设置绝对定位以body 为参照
                2）除了父盒子设置static ，其他定位方式，子盒子以父盒子为参照
                3）绝对定位的元素脱标
                4）实现模式转换的效果
                 使用场景：1，盒子压盒子 2，绝对定位可以使用margin padding
            3. 相对（relative）：相对自己作为参照，不会脱标
                使用子绝父相
            4. 固定（fixed）：
                1）以body标签可视区域作为参照
                2）脱标
                3）实现模式转换的效果
            层级：
                1）定位的元素有层级关系
                2）只有给定位的元素才能设z-index
                特点：
                    1）元素设置定位后有个默认的z-index ：auto（除去static）
                    2）z-index 值相同 元素后来居上
                    3）z-index 值越大 当前的元素层级越高
                    4）父元素的z-index值越大 当前的元素层级越高   
## html5 
    1. 什么是h5?
        狭义上:是html4的升级版本，是新一代web应用标准
        广义上：H5其实指的是一个泛称，它是由HTML5 + CSS3 + JsApi等技术组合而成的一个应用开发平台。

    2. html5技术:       
        1. 常用新增的语义标签    
            header nav main aside section (独立的区块) article footer
        2. 新增dom API
            参见 Front-End-Study/html/html5/dom.html
        3. 定位
            .. Front-End-Study/html/html5/geolocation.html
        4. canvas
            Front-End-Study/canvas
        5. 网络检测
            Front-End-Study/html/html5/online.html
        6. 客户端数据的缓存机制
            Front-End-Study/html/html5/webStorage.html
        7. video (api 使用)
            Front-End-Study/html/html5/media
## css3
    1. selector
        属性选择器：
            E[attr=val]
            E[attr]
            E[attr^=val] 属性值以val开头
            E[attr$=val] 属性值以val结尾
            E[attr*m=val]属性值含有val,不管在什么位置
        伪类选择器：
            E：first-child 选中父元素中的第一个E子元素
            E:last-child  选中父元素中的最后一个E子元素
            E:nth-child(n)  选中父元素中第n个子元素（元素0开始，n从0开始）n(数字，表达式 -5+n,2n+1,odd,even)
            E:nth-last-child(n)  选中父元素中倒数第n个子元素（元素0开始，n从0开始）

            E:empty 选中内容为空，或没有子元素
            E:target    选中锚点的的目标元素
            E:not(选择器)

            eg:
                /*p:first-child  先找父元素 找到所有的子元素  在去找第一个子元素  匹配是不是p  如果不是无效的选择器*/
                /*p:first-of-type 先找父元素 找到所有的p元素  找第一个*/
                /*p:last-of-type 最后*/
                /*p:nth-of-type 第几个*/
                /*p:nth-last-of-type 倒数第几个*/
        结构选择器：+ ~
            E[attrxxxx]+E   选择当前的元素 然后找到相邻的下一个元素
            E[attrxxxx]~E   选择当前的元素 然后后面所有的元素

    2.  伪元素：
        ：before ：after
        推荐单冒号兼容性好

        出现省略号：
        white-space:nowrap;
        overflow：hidden;
        text-overflow：ellipsis;

        ::first-letter 选择首字母
        ::first-line   第一行
        ::selection    选中的区域  只能变color和background-color  

    3. 私有前缀
        webkit chrome  safari 新版opera
        moz    firefox
        ms     IE
        o      老版opeara

    4. 透明色     
        rgba
        opacity 能继承 取值0-1
        transparent 完全透明
        hsla
            h 色调
            s 饱和度0-100%
            l 亮度 0-100%
            a alpha 透明度
    5. shadow
        文字阴影:
            text-shadow:水平位移  垂直位移  模糊程度 颜色
            水平位移 值越大越往右 反之往左
            垂直位移 值越大越往下 反之往上
            模糊程度 值从0开始，越大越模糊
            颜色   

        盒子阴影:
            box-shadow:水平位移  垂直位移  模糊程度 扩展半径 颜色 内阴影（inset）
            水平位移  
            垂直位移  
            模糊程度 
            扩展半径  可以为负值，值越大，扩展半径越大
            颜色 
            内阴影  inset(可选)

    6. box-sizing
        content-box 盒子的尺寸=CSS中的尺寸+padding+border
        border-box  盒子的尺寸=CSS中的尺寸=padding+border+可变的内容尺寸     

    7. border-radius
        border-radius:x x x x/y y y y
        正圆:border-radius:50%;
    8. border-image
        border-image-source:url();
        切割图片 border-image-slice:
        border-image-repeat:round;
    9. background-size:
        数字，百分比，
        cover 完全覆盖整个元素，不考虑图片内容是否损失
        contain 完全显示图片，不考虑是否覆盖整个元素
    10. background-origin 
        背景原点(默认是padding-box)
    11. background-clip 
        背景图片的显示位置
    12. background-image：
        url("images/bg1.png") left top,
        url("images/bg2.png") right top,
        url("images/bg3.png") right bottom,
        url("images/bg4.png") left bottom,
        url("images/bg5.png") center center;
    13. gradient
        线性:
        （方向，颜色 位置，颜色 位置）
        background-image:linear-gradient(to right,red,green);
        background-image:linear-gradient(0deg,red,green);
        径向：
        （半径 at 位置，颜色 位置，颜色 位置）
        background-image:radial-gradient(20px at 10px,red,green);
    14. transition:
        transition:过渡属性     过渡时间        过渡延迟     过渡速度
        transition-property ..-duration     ..-delay    transition-timing-function:ease  linear  ease-in ease-in-out
        
        transition: all 0.2s
        过渡all所有变化的属性  0.2s代表属性从初始变化到结束所用的时间

        事件:transitionend
    15. 2D转换:
        1）位移 translateX(),translateY(),translate(X,Y)
        2) 旋转 rotate 值越大 是顺时针 反之则逆时针
        3）缩放 scale   值越大 放大 反之缩小
        4）倾斜 skewX skewY skew
    16. 3D转换：
        translateZ() translate(X,Y,Z)
        视角：perspective
        3d转换：transform-style:
            flat 2d平面呈现
            perserve-3d 3d空间呈现 
    17.  animation:
        1)定义动画：
            格式：@keyframes 动画名称{
                0%{}
                25%{}
                50%{}
                75%{}
                100%{} 
            }
        2)调用动画 
            复合属性:    animation:动画名称  动画总时间 动画延迟 动画速度
            动画名称     animation-name  自定义的
            动画总时间   animation-duration 时间
            动画延迟     animation-delay    时间
            动画速度     animation-timing-function  ease ease-in  ease-in-out linear steps(n)
            动画次数     animation-iteration-count  数字  infinite(无线)
            动画播放状态   animation-play-state    running  paused
            动画完成时的状态 animation-fill-mode  backwards回到最初  forwards停留在最后完成时的状态
            动画方向        animation-direction    reverse（反方向）
        事件:animationend
    18. 伸缩布局：
            ..容器    给某个元素设置display：flex 就是伸缩容器
            ..项目    伸缩容器中直接的子元素就是伸缩项目
            主  轴    默认水平方向，可调整
            侧  轴    永远垂直主轴

            主轴方向：
                flex-direction: row;默认水平 
                flex-direction: row-reverse;水平反向
                flex-direction: column;竖直
                flex-direction: column-reverse;竖直反向

            伸缩项目在主轴上的对齐方式：
                /*主轴对齐方式  开始点对齐*/
                justify-content:flex-start;
                /*结束点对齐*/
                justify-content: flex-end;
                    /*中心对齐*/
                justify-content: center;
                    /*两端对齐*/
                justify-content: space-between;
                    /*空间环绕*/
                justify-content: space-around;

            flex-wrap  nowrap(不换行) wrap(换行) 默认不换

            设置换行后的排列方式
                align-content  flex-start(起始点对齐)  flex-end(终止点对齐) center(居中对齐)  space-between(两端对齐)  space-around(空间环绕)
            设置不换行的排列方式 
                align-items(侧轴对齐)    flex-start(起始点对齐)  flex-end(终止点对齐) center(居中对齐) stretch(拉伸)

            伸缩项目 
                1.伸缩项目在伸缩容器中所占的空间
                    flex:伸缩项目在伸缩容器剩余空间的比例
                2.自己排列自己的对齐方式
                    align-self: flex-start(起始点对齐)  flex-end(终止点对齐) center(居中对齐) 
                3.定义自己的排列顺序
                    order  值越小，越靠前
    19. em rem:
        em:的基准值  16px  默认的字体大小是16px,基准值是相对于父元素来的
        rem：的基准值  16px  默认的字体大小是16px
        r 是root  根元素的意思  html文档的根元素是  html标签
        基准值是相对于来根元素（html）来的
        
## js 
    1. ECMA+Dom+Bom  
        1. undefined,NaN，Null,infinity
            1) undefined 是undefined 类型
                var a;  //声明变量后不赋值
                typeof 类型判断方法
                console.log(typeof(a))  undefined
            2) NaN 是 number 型 表示不是一个数字
                var a=123;
                var b="abc";
                a-b   得到NaN
                console.log(typeof(a-b))  number
            3) Null   空指针类型  没有指向任何一个对象 
            4) infinity 是number 类型 表示无穷大 除数为0可得
        2. js精度问题
            number.toFixed(参数)  设置保留小数位数 1.528.toFixed(2) =1.53
        3. Math 对象常用几个函数
            1）天花板函数 ceil Math.ceil(1.23)=2 向上返回最小的整数
            2）地板函数 floor Math.floor(1.23)=1 向下返回最小的整数
            3）随机数
                Math.random() 返回0-1 的随机数
                Math.floor(Math.random()*10) 返回0-9 的随机数
            4) Math.max() Math.min() 返回最大最小的值
            5）Math.abs(x)返回一个绝对值
            6）Math.round(x) 四舍五入

        4. 数据类型转换
            1）隐式转换 变量在运算过程中发生的类型转换
                !!   console.log(!!"abc")
            2）显示（强制）转换:
                转字符串：a,（String）变量 b,变量.toString()
                转数字型：a,Number(变量) b,parseInt(变量) c,parseFloat(变量)
                转布尔型：Boolean(变量)
                几种转换为false的 undefined NaN Null 0 false ""

        5. 短路操作：当操作数不是bool值时
            1）隐式转换
            2）从左往右
            3) 哪个操作数可以决定结果，就返回这个原操作数

            1. 短路与 （&&）
                只要有一个false，就返回 该 值false的子表达式的值
                短路与：可以保证某个变量有值，在参与运算

                eg: Object.create&&Object.create(obj)
            2. 短路或（||）
                只要有一个true，就返回 该 值true的子表达式的值
                短路或：可以方便给变量赋初值
        
        6. 类型检测
            var arr=[];
            1）Array.isArray(arr) 有兼容性问题
            2）arr instanceof Array 推荐使用
            3) Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() 可检测任意类型

        7.  节点类型
            总共有12种，但要记住几个常用的
                * nodeType = 1，元素节点
                * nodeType = 2，属性节点
                * nodeType = 3，文本节点
                * nodeType = 8，注释节点
                * nodeType = 9，document对象
                * nodeType = 11，documentFragment文档片段

        8. 函数变量提升：先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部
            'use strict';
            function foo() {
                var x = 'Hello, ' + y;
                alert(x);
                var y = 'Bob';
            }
            foo();
            虽然是strict模式，但语句var x = 'Hello, ' + y;并不报错，原因是变量y在稍后申明了。
            但是alert显示Hello, undefined，说明变量y的值为undefined。
            这正是因为JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值。
            变量提升后代码：
                function foo() {
                var y; // 提升变量y的申明
                var x = 'Hello, ' + y;
                alert(x);
                y = 'Bob';
            }     
            函数内变量的怪异声明模式:
            function fun(){
                num=10   //没写var 就相当于全局变量
            }
            fun()
            console.log(num) //10

        9. this 指向问题
            1. 普通函数执行模式
            直接拿到函数的名字 加上 圆括号。
            在该模式下，函数内部this的指向为 window

            2. 构造函数模式
                调用函数时，配合着new关键字来执行某个函数，此时该函数的执行模式为 构造函数模式
                函数内部的this指向为 当前创建出来的实例。

            3. 方法调用模式
                将一个函数 赋值给 某个对象的属性，然后通过该对象去执行函数，此时该函数的执行模式为
                    方法调用模式；
                在该模式下，this的指向为 方法的调用者

            4. call/apply（上下文）模式: 改变this的指向
                * fn.call(thisObj, [arg1~argN])
                    * thisObj 表示 改变后的this指向
                    * arg1~argN 是fn执行时，传入的实参。可选的。
                    * call方法再执行的时候，fn函数也同时执行，同时，将函数fn内部的this替换成指定thisObj对象。
                * fn.apply(thisObj, [数组]);
                    * thisObj 表示 改变后的this指向
                    * [数组] 含义：将数组中的元素 作为函数fn执行时传入的实参。可选的
                    * apply方法再执行的时候，fn函数也同时执行。同时，将函数fn内部的this替换成指定thisObj对象。
                * 在该模式下，call|apply方法的第一参数即为 函数fn内的this指向
        10. sort 排序的坑
            1）Array的sort()方法默认把所有元素先转换为String再排序，如果直接排序数字你就踩坑了
            2）默认 按照根据ASCII码进行排序
            3）sort 是一个高阶函数，sort（function(){
                //写具体的实现逻辑
            }）
            // 升序
            sort(function(a,b){
                return a-b
            })
            //降序
            sort(function(a,b){
                    return b-a
            })

        11. 原生js获取样式
            getComputedStyle(el,null).width ie 不支持
            document.getElementById("btn").currentStyle.width ie提供的
    
        

        12. 清空数组：
            1)arr.length=0
            2)arr=[] //推荐使用
            3)arr.splice(0,arr.length)
        13. 避免事件被覆盖的方法（ie9 以下不支持）false默认冒泡 true 捕获
            标签.addEventListener(enventType,fn，flase)
            function fun(){
                alert("你好")
            }
            eg:btn.addEventListener("click",fun)
            移除事件监听(参数必须一致)
            btn.removeEventListener("click",fun)
            ie-6-10(enventType 加on)
            标签.attachEvent(enventType,fn)
            标签.detachEvent(enventType,fn)
        14. 事件冒泡和事件捕获   
            事件冒泡：从里向外执行，遇到相同的事件及执行
            事件捕获：执行顺序与冒泡相反（不推荐使用，因为ie使用attachEvent 没有第三个参数）

        15. 事件的对象作用：(event.target)记录当前事件触发时的一些信息
            btn.onclick=function(event){} 
            event.target 真正触发事件的元素
            event.type="click"
            event.clinetX/clinetY 
            ie 低版本不兼容
            var tar=e.target||e.srcElement
        16. 阻止事件冒泡
            e.stopPropagation()
            ie 中阻止事件传播 cancelBubble=true
        17. JSON  转换 
            1）object-->string   JSON.stringify()
            2) string--> object   JSON.parse()

        18. date-format
            1)日期格式化成指定格式
            例如： new Date().format("yyyy-MM-dd hh:mm:ss")
            2）两日期间隔
            例如：d1.dateDiff(d2, 'd')
            3)获取当前时间戳
                (new Date()).getTime();

            参见 Front-End-Study/js/date-format.js

        19. 异常
            js中所有的异常都是Error的实例，可通过构造函数，自定义一个异常对象
            
            1）EvalError :运行时异常。 eval 函数调用时发生的异常
            2）RangeError ：运行时异常 超出数据范围
            3）ReferenceError 运行时异常 未定义变量
            4）SyntanxError  预解析,语法错误
            5) typeError: 运行时异常，类型异常
            6) URIError：运行时异常 在执行encodeURI 和 decodeURI 时抛出的异常
        20. == ===转换问题
            ==：如果操作数为对象，则转换成基本类型。优先使用valueOf() 失败的话则用toString()
            ===:类型和值都相等
    2. js-oop
        1. 对象：
            1. 什么是对象？
                无序属性的集合，可以看成键值对
            2. 如何创建？
                1) 字面量或者叫直接量
                var obj={};
                2) 构造函数创建对象
                    function Student(name, age, sex) {
                        this.name = name
                        this.age = age
                        this.sex = sex
                        this.sayHi = function () {
                            console.log("你好" + this.name)
                        }
                    var s1 = new Student("小明", "12", "男");

                    构造函数的执行过程（如何创建对象的）：
                        1）创建一个空对象obj
                        2）将上面的创建的空对象obj赋值给this
                        3）执行代码块（给属性赋值等等）
                        4）隐式返回 return this
                        5）在构造函数中 有显示的return 语句，若返回值的类型是基本数据类型，会被忽略，复合数据类型不会    
                3)  工厂模式创建对象 就是用一个方法实现对象的实例化
                        function initStu(name, age,sex) {
                                return new Student(name, age,sex);
                            }
                        var obj=initStu();
                        ————这种方式创建对象避免new的操作
        
            3. 对象的属性
                1）两种访问方式：
                    a: obj.propertyName  
                    b: obj["propertyName"] __遍历属性并赋值时常用到  
                2）检测：
                　　　hasOwnProperty方法
                        1. 语法：<对象>.hasOwnProperty('propertyName')
                        2. 功能：用来判断指定的属性是否为该对象自己拥有的，而不是继承下来的。
                　　    eg:obj.hasOwnProperty("name") //true
        2. 函数
            1. 创建
                * 声明式
                　　function fn(){}
                * 表达式
                    var fn=function(){}
                * 构造函数
                　　var fn = new Function([arg1~argN, body]);
                　　eg:var f = new Function('n', 'console.log(n);');
            2. 变量作用域和预解析：
                作用域
                    1. 变量的作用域：变量起作用的区域，也就说变量可以被访问到的区域。
                    2. ...种类：
                    　　1）全局变量，生命周期 是随着页面存在而存在，页面销毁而销毁。
                    　　2）局部变量，在函数内声明的变量，称为局部变量。 作用范围是在指定函数内，生命周期 是函数执行完毕就会被销毁。
                    3. 词法作用域：在js预解析阶段，确定变量的作用域。变量的作用域由 其定义的位置决定 而不是由其使用的位置。在词法作用域下，只有函数可以限定作用域。
                        ___es6中新增了块级作用域let(详细参见es6)

                    4. 变量的搜索原则：类似下面的属性搜索原则，先在当前作用域，找不到然后上一层，最后到全局作用域。找不到抛异常。
                
                预解析：
                    1. 语法分析：保证js代码符合语法规则，能被正确的执行。
                    2. 变量名以及函数名提升
                            在变量名和函数名提升时，将变量的定义，以及函数的定义包括函数体部分都提升到当前作用域的最顶端。
                            函数名提升时，相当于 定义一个变量即该函数的名字，在将函数的引用赋值给该变量
                    3. 确定变量的作用域。
            3. 函数属性
                1. arguments 
                    * 伪数组对象
                    * 以数组形式，存储实参
                    * callee 返回正在被执行函数; 匿名函数的递归调用
                    * length 实参个数

                2. caller: 返回调用函数的 函数

                3. length: 定义形参的个数

                4. name: 存储函数的名字
            
            4. 闭包：　
                1. 实质：就是能够读取其他函数内部变量的函数。
                2. 写法：
                     function foo() {
                         var obj = {};                            
                         return function() {
                             return obj;
                         };             
                3. 闭包的应用：
                    1. 缓存：
                        function outer() {
                                var cache;
                                function inner() {
                                    // 代码块
                                    // 使用cache
                                }
                                return inner;
                            }
                            var fn = outer();
                    2. 私有变量：
                        在ES5之前，不能设置对象属性的可读可写性。所以使用闭包来模式私有属性，来指定属性的可读可写
                        function person(name) {
                                return {
                                    getName: function() {
                                        return name;
                                    },
                                    setName: function(val) {
                                        name= val;
                                    }
                                };
                        }
                    3. 沙箱模式：
                        防止全局变量和全局对象的污染，引出沙箱模式
                        实质就是匿名的自执行函数
                        (function(global){
                            //代码块
                            //自执行
                            //在内部声明的变量与外部隔离
                            //把常用的全局变量，当做实参传入进来
                            //目的：1，减少变量的搜索过程，提高js 性能
                            //     2,利于代码压缩
                        }(window));
                4. 闭包使用中的问题：
                     本质上就是让数据常驻内存。如此，使用闭包就增大内存开销，使用不当就会造成内存泄漏。
                5. 如何解决：使用完闭包后，及时清除。（将闭包变量 赋值为 null）    
            5. 函数调用和this指向
                1. 普通函数执行模式
                    直接拿到函数的名字 加上 圆括号。
                    在该模式下，函数内部this的指向为 window

                2. 构造函数模式
                    调用函数时，配合着new关键字来执行某个函数，此时该函数的执行模式为 构造函数模式
                    函数内部的this指向为 当前创建出来的实例。

                3. 方法调用模式
                    将一个函数 赋值给 某个对象的属性，然后通过该对象去执行函数，此时该函数的执行模式为
                        方法调用模式；
                    在该模式下，this的指向为 方法的调用者

                4. call/apply（上下文）模式: 改变this的指向
                    * fn.call(thisObj, [arg1~argN])
                        * thisObj 表示 改变后的this指向
                        * arg1~argN 是fn执行时，传入的实参。可选的。
                        * call方法再执行的时候，fn函数也同时执行，同时，将函数fn内部的this替换成指定thisObj对象。
                    * fn.apply(thisObj, [数组]);
                        * thisObj 表示 改变后的this指向
                        * [数组] 含义：将数组中的元素 作为函数fn执行时传入的实参。可选的
                        * apply方法再执行的时候，fn函数也同时执行。同时，将函数fn内部的this替换成指定thisObj对象。
                    * 在该模式下，call|apply方法的第一参数即为 函数fn内的this指向      
    

        3. js GC:      
            1. 引用计数法
                当定义一个变量 （此时引用计数为0）并且 赋值为指定的数据时，该变量的引用计数 + 1；
                如果该数据，有其他对象或函数使用，引用计数 + 1；
                如果使用该数据的对象或函数，被GC回收掉，那么引用计数 - 1；
                如果该变量手动赋值为null，此时引用计数 - 1；
                当GC对象寻访到该变量时，如果计数为0，GC对象就直接回收该变量所占用的内存。
                如果函数正在执行或还没有执行完毕，内部定义的数据都是不可回收的，不论引用计数是否为0。
                引用计数的缺陷：容易产生循环引用，导致变量无法被GC回收。
            2. 标记清除法
                        从文档的根节点（window对象）出发，找到至少一条路径可以到达该变量，那么该变量被标记为 “不可回收”；否则，该变量标记为 “可回收”。
                        当GC对象寻访到该变量，如果被标记为 “可回收”，那么，就会立即回收掉其所占用的内存。

                        标记清除法的缺陷：性能比较低。

            3. 当代浏览器，同时使用两种机制。优先使用引用计数法，在相隔一定周期后使用标记清除法来释放变量的内存空间。
            4. 区别与联系
                    * 前者性能较高，但是有循环引用的缺陷
                    * 后者性能较低，但是不会产生循环引用问题
                    * 在当代浏览器配合两种机制，去释放变量的内存空间。
        4. js线程
            1. js本质 是 单线程的。
            2. js语言为什么设计成单线程的？
                * 避免多线程操作同一文件（资源）产生冲突。
                * 提高js性能
            3. js在执行的时候，保证主线程上的代码先执行完毕。
            4. 在js中有三个主线程
                * 页面渲染主线程
                * js执行主线程，可以阻塞页面渲染主线程。
                    任务队列的结构-存储异步代码、以及事件的处理程序
                * 事件循环主线程：监听页面触发的事件处理程序。
                    当用户触发某个事件时，事件循环主线程，获取到对应的事件处理程序，将其添加到js执行主线程中“任务队列”中。等待执行。
        5. 原型prototype：
            1. 什么是原型？
                函数对象的prototype属性所引用的对象。
            2. 原型的本质：就是对象。一般函数都有prototype属性，也就是说函数都有原型。
                声明一个函数时，原型就随之而产生。此时默认原型 是一个空对象。但是具有一个默认的属性constructor，该属性指向其构造函数.
            3. 原型的特性：
                1. 在原型上的成员(属性和方法),都可以直接被其实例访问，object 是基原型
                2. 实例不可以直接修改原型上的任何成员
                3.  动态性
                    * 如果在原有的原型上扩展成员，会直接反应到 已创建的对象和之后创建的对象上。
                    * 如果替换了原有的原型，新原型的成员 在之前已创建的对象是不能访问到的，
                        而在之后创建的对象是可以访问到的。
                    * 如果置换了原型，就可能会在新的原型上丢失默认的constructor属性
                        如果想要其有该属性，就只能自己手动添加上。
                4. 所有的实例 只能共享一个原型。
            4. 获取原型的方式：
                1. 通过函数：<fnName>.prototype；
                2. 通过对象：<object>.__proto__ ，__proto__  是浏览器中的，是一个非标准属性；
            5. 原型链：
                原型的本质是对象，那么就具有__proto__的属性，所以原型对象也有原型。通过这个属性一层层找下去，就是当前对象的原型链。    
                原型链的尽头 Object.prototype 所以js 实现继承就靠原型链
            6. 对象的属性搜索原则：
                首先找自己，若找到，停止搜索直接使用，否则一层层往原型上找，找到，停止搜索，直接使用，一直到
                Object.prototype上 如果找到 就返回该属性的值，如果依然没有找到，就返回undefined。
            7. 实现继承方式（利用原型实现继承）：
                1. 实例继承原生原型对象
                    function Fn() {}
                    Fn.prototype.name = 'qm';
                    var obj = new Fn();
                2.  实例继承自定义的原型对象
                    function Fn() {}
                    Fn.prototype={name:'qm'};
                    var obj = new Fn();
                3.  组合式继承(开发中常用的)
                    function extend(obj, obj2) {
                        for (var key in obj2) {
                            obj[key] = obj2[key];
                        }
                    }
                    extent({},{name:"qm",age:18})

                4.  es5 提供的Object.create(obj) 的经典继承                    
                    var obj = Object.create(obj1);
                    //原理是置换原型
                    var create = function (obj) {
                    if (!Object.create) {
                        Object.create = function (obj) {
                            function F() { }
                            F.prototype = obj
                            return new F()
                        }
                    } else {
                        return Object.create(obj)
                    }
                }

            8. Object.prototype 上的一些方法
                1）hasOwnProperty方法
                    1. 语法：<对象>.hasOwnProperty('propertyName')
                    2. 功能：用来判断指定的属性是否为该对象自己拥有的，而不是继承下来的。
                2）propertyIsEnumerable
                    语法：<对象>.propertyIsEnumerable("propName")
                    功能：可枚举 指定的属性是对象本身的。
                3）isPrototypeOf
                    * 语法：<对象a>.isPrototypeOf(对象b)
                    * 功能：判断对象a是不是对象b的原型
                4）valueOf
                    * 语法: <对象>.valueOf()
                    * 功能：将指定对象类型的数据 转换成 基本数据类型
                    * 规则：
                        * 如果该对象是 基本数据的包装类型 会转换成 其对应的基本数据类型
                        * 否则为其他对象类型，就直接返回该对象。
            9. instanceof 
                1) 语法：<对象> instanceof 函数
                2) 功能：判断对象 是否为 指定函数的实例
                3) 运算规则 
                    若函数的原型，出现在该对象的原型链上 表达式返回true 否则false 
            10. eval方法
                1，可以使用eval来将json字符串 转换成 js对象。
                2， 在没有严格模式，eval可以随意指定一段字符串来当做js代码来执行。
                    * 脚本注入
                    * 全局变量以及全局对象污染
                    * eval创建变量的作用域 是由eval执行的作用域决定。 
                __已不推荐使用。JSON.parse()
            11. 待补充
    3. ES5 
        1. 新增的一些方法
            Front-End-Study/ECMA/es5.md
        2. ES5 的严格模式
            Front-End-Study/ECMA/strict.md
        3.  ES5 读写器
            function person(name, age) {
            return {
                get name() {
                    return name;
                },
                get age() {
                    return age;
                },
                set age(val) {
                    age = val;
                }
            }
        }
            var zs = person('zhangsan', 19);
            zs.name = 'zhangsansan';
            console.log(zs.getName());
        4. 待续   

    4. es6
        Front-End-Study/ECMA/es6.md
## jquery
    1. 本质：
        源码分析得知是一个伪数组对象，在自然数的索引上存储的是查询到所有DOM元素。 $本质是jQuery原型上的init这个工厂构造函数的实例，根据传入的参数不同实现不同的功能。
    2. 特性：
        jquery 有两大特性
            隐式迭代
            链式编程
    3. jquery 与 dom 对象转化：
        dom->jquery $() 包裹一个dom对象
        jquery->dom   
            1)var $box=$("#box") 通过索引取出$box[0]
            2)$box.get(0)
    4. 清空元素
        1. html():
            $(“div”).html("");//使用html方法来清空元素，不推荐使用，会造成内存泄漏,绑定的事件不会被清除。
        2.empty():
             $(“div”).empty();//清空div的所有内容（推荐使用，会清除子元素上绑定的内容）
        3. remove():
             $(“div”).remove();自身也删除   
    5. attr,prop 区别
        1. attr("box",值) 设置单个属性
            attr({})    设置多个属性
             取表单值属性时会得到undefined
        2.  这里可以使用prop 
            自定义属性使用attr,自带属性使用prop
    6. selecor

    7. dom 操作的方法

    8. ajax/jsonp
        1. ajax :
            $.ajax({
                type: "method",
                url: "url",
                data: "data",
                dataType: "dataType",
                success: function (response) {
                    
                }
            });
            $.get("url", data,
                function (data, textStatus, jqXHR) {
                    
                },
                "dataType"
            );
            $.post("url", data,
                function (data, textStatus, jqXHR) {
                    
                },
                "dataType"
            );
        2. jsonp:
            原理：
                利用了<script src=""></script>标签具有可跨域的特性，
                由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来
                只能以GET方式请求
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
        3. cors 
            ajax 的jsonp 有个缺陷就是只能发get 请求不能发post,所以可以使用cors.get/post 都支持

            原理：在服务器响应了响应头: Access-Control-Allow-Origin http 协议规定.
            header("Access-Control-Allow-Origin:*");
    9. animation

    10. Event（事件绑定，事件代理，事件委托）
        1. 事件绑定： 绑定多个事件
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
            
        2. 事件委托（或者叫代理）
            1. 以上bind 绑定事件会出现一个问题及新创建的元素没有事件？
            2. 如何解决？
                jq 推出新的事件的添加方式delegate
                    $("#box").delegate("p","click",function(){
                        .....
                    })
            3. 这就是事件委托或者叫事件代理
                本质：就是利用事件冒泡的原理，将事件绑定在父容器中，让父容器代为触发

                执行过程：

            4. 新版本jq 统一使用on
                1. 简单事件添加
                    $("#box").on("click",function(){
                        ...
                    })
                2. 同时添加多个事件
                    $("#box").on({
                    "click":function(){
                        ...
                    },
                    "mouseenter":function(){
                        ...
                    }
                })
                3. 事件委托 一般只添加一次事件委托
                    $("#box").on("click","p",function(){
                        .....
                    })
                4. 事件委托好处：
                    1，提高性能
                    2，新添加的元素也有事件
                5. 执行顺序的问题：
                    一个标签添加了自身的事件，
                    又添加了委托事件，则委托事件先执行，然后自身事件执行（冒泡）
                6. 解绑事件：
                    1）解绑普通事件
                        $("#box").off("click")
                    2)解绑多个
                        $("#box").off("mouseenter click")
                    3)解绑委托事件
                        $("#box").off("click","**")
                    4）$("#box").off() //接除box盒子所有的事件

                    trigger() 可以传入一个参数，为事件类型
                    triggerHandler() 触发事件，但是不执行标签的默认效果

                7. jq中阻止事件冒泡：
                    1，阻止事件传播
                        e.stopPropagation();   
                    2，阻止事件触发的默认效果
                        e.preventDefault();
                    3，return false 不仅可以阻止默认效果，还能阻止事件冒泡
    11. 插件开发


## framework
    1. angular
        angular 1
            Front-End-Study/angular1
        angular 2
    2. vue
        Front-End-Study/vue2
    3. bootstrap
        
## tool 
    1. git 

    2. svn
    3. gulp
        1. 什么是gulp？
            gulpjs是一个前端构建工具，与gruntjs相比，gulpjs无需写一大堆繁杂的配置参数，简单，gulpjs使用的是nodejs中stream来读取和操作数据，速度更快。

        2. install
            首先确保你已经正确安装了nodejs环境。然后以全局方式安装gulp：
            全局安装：
                npm install -g gulp
                国内使用淘宝镜像
                npm install -g gulp --registry=https://registry.npm.taobao.org
            本地安装：
                建一个文件夹（工作目录）接下来的代码就在里面写
                进入该目录，键入命令
                npm install gulp (--save)   加save表示保存在本地 不写save也不影响 

                如果想在安装的时候把gulp写进项目package.json文件的依赖中，则可以加上--save-dev：
                npm install --save-dev gulp
                淘宝镜像
                npm install gulp --registry=https://registry.npm.taobao.org

            gulp -v 查看是否成功

        3. useage
            1. 创建gulpfile.js 文件 
                touch gulpfile.js    (bash 命令)   
                gulpfil.js(名字必须这样命名)

                node :var gulp = require(‘gulp’);

            2. 创建任务呢
                使用语法：
                gulp.task(‘任务名’，function(){
                    //要执行的任务
                })
                
                eg:
                Gulp.task(‘apptest’function(){
                    Console.log(‘我是一个apptest的任务’)；
                })
            3. 执行gulp的任务
                在工作目录下执行命令：gulp 任务名；例子的任务名是什么
                gulp apptest

                Using gulpfile 表示使用这样一个文件
                Starting 表示开启这个任务
                执行任务时打印这句话：我是一个appTest的任务
                Finished 表示结束了这个任务

            详情查看： Front-End-Study/gulp

    4. Emmet 语法
        div.className
        div#idName
        div.className#idName
        h1{text}
        a[href="#"]
        ul>li*3>a[href="#"]

    5. ie注释语句
        cc:ie6
## 常见的面试题
    Front-End-Study/面试