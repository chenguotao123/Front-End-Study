<p style="border-bottom:1px solid #ccc;font-size:2.5em;font-weight:bold;">JS原生框架第1天</p>
<hr>

# 课程内容

## 课程笔记

### 课程内容

1. 查询Dom的方法

2. 操作Domd的方法
  * appendTo
  * append
  * prependTo
  * prepend
  * next / prev
  * nextAll / prevAll
  * before
  * after
  * parent / parents
  * nextSibling / nextSiblings
  * attr
  * prop
  * val
  * html
  * text
  * css
  * addClass
  * hasClass
  * removeClass
  * toggleClass
  * on
  * off
  * click / dblclick / keydown ...
  * $.ajax

### jQuery框架的结构

1. 为了防止变量以及全局对象的污染，引入沙箱模式。

2. jQuery的功能为 查询DOM 以及 操作DOM；在查询DOM时，要通过选择器来查询。因此，要使用函数来去实现DOM元素的查询。在实现时，要先定义一个函数init；

3. 查询DOM元素后，要对这些DOM元素进行操作。此时，要使用面向对象的编程方式来实现。创建一个对象，然后通过该对象的方法来实现操作查询到的DOM元素。

4. 由于框架的结构在完成之后，不准许任何使用者随意修改。所以使用想要扩展方法，就必须向其能拿到的对象上扩展，$->createInit函数以及其原型。最终要实现init对象继承自createInit函数的原型

### jQuery对象的本质

是一个伪数组对象，在自然数的索引上存储的是查询到所有DOM元素. 本质是jQuery原型上的init构造函数的实例。

### init构造函数的参数类型

1. string
  * html字符串：创建对应html元素
  * 选择器： 在文档上查询dom元素

2. dom元素
  * 将其转换成 jq对象

3. dom数组 | 伪数组
  * 将其转换成 jq对象

4. 函数
  * 监听dom树是否加载完毕，如果加载完毕就执行该函数

5. 非法值 null undefined ''
  * 返回空jq对象

### 类型判断方法

1. isString方法：判断是否为字符串

2. isHTML方法：判断是否为html字符串

3. isDOM方法：判断是否dom节点

4. isArrayLike方法：判断是否为数组 或者 伪数组对象

5. isFunction方法：判断是否为函数类型

6. isWindow方法：判断是否为window对象

### 工具类型方法

1. type方法：用来获取内置对象的类型

2. parseHTML方法：将html字符串 转换成 对应的元素节点类型
  应用innerHTML属性，将一个字符串转换成dom元素。
  实现时，使用的是自定义div元素的innerHTML属性，转换后再获取子代元素节点。这样就将html字符串转换成了对应的html元素节点类型。

3. each方法: 
  * 功能：遍历数组或伪数组对象，或者枚举对象的属性
  * 实现思路
    * 给jq函数添加each方法, 定义两个参数。第一个参数 是要遍历对象；第二个参数为 回调函数
    * 回调函数里也具有两个参数。第一个：当前遍历元素的索引值；第二个：遍历到的元素
    * 判断 obj 是否为数组或伪数组
    * 如果是，那么就使用for循环遍历obj，每一次遍历都执行回调函数callback
      在执行时改变this指向，为遍历到的元素，同时给其传入 当前索引以及元素 两个实参，
      还用判断回调函数的返回值，如果为false 就结束循环
    * 如果是普通对象，那么就使用for in枚举对象属性
      在执行时改变this指向，为遍历到的元素，同时给其传入 当前属性以及属性值 两个实参，
      还用判断回调函数的返回值，如果为false 就结束循环

### selector参数类型与逻辑

1. 无效值 null undefined ''
 返回值 空的jq对象，即return this；

2. 字符串类型
  * html字符串：将其转换成html元素，然后以 伪数组形式，将它们存储在this上。
  * 选择器：通过querySelectorAll方法获取相应的dom元素，再以伪数组形式存储在this上。

3. DOM对象
  将DOM对象转换成jq对象
  创建一个jq对象，在索引0上的值 为 该DOM对象，同时其length属性也要设置为1.

4. DOM数组或伪数组
  将其类型转换成jq对象
  创建一个jq对象，用该对象去存储数组中的所有dom元素。

5. 函数
  入口函数，在DOM树加载完毕后，执行该函数。
  监听document对象的DOMContentLoaded事件，如果该事件触发，就执行入口函数。

  注意：如果是异步加载该js文件，就无法正确执行入口函数。

### 保持jq对象是伪数组

在jq对象的原型上添加一个length属性，赋值为0；表示所有jq对象默认的length属性值为0；

### 功能类方法toArray方法

1. 语法：<jq对象>.toArray();

2. 功能：将jq伪数组对象 转换成 真数组

3. 实现思路
  * 借调数组对象的slice方法，将伪数组转换成真数组

### 功能类方法get

1. 语法：<jq对象>.get( index );

2. 功能：根据索引获取指定的dom元素

3. 实现思路
  * 判断index是否为 null undefined值，如果是，就返回一个数组，存储jq对象所有的dom元素
    也就是说，将当前jq对象 转换成 真数组。作为该方法的返回值即可。
  * 否则，判断index是否小于0，如果是，就 index + this.length。转换成 自然数索引值
  * 返回 this[ index ]

### 功能类方法eq

1. 语法：<jq对象>.eq( index );

2. 功能：根据索引获取指定的dom元素, 返回值为 jq类型

3. 实现思路
  * 判断index是否小于0，如果是，就 index + this.length。转换成 自然数索引值
  * 获取 this[ index ] 的dom元素，将其转换成 jq 对象返回

### 功能类方法first

1. 语法：<jq对象>.first();

2. 功能: 获取jq对象上的第一个元素，返回值 为 jq类型

3. 实现思路
  * return this.eq( 0 );

### 功能类方法last

1. 语法：<jq对象>.last();

2. 功能: 获取jq对象上的最后一个元素，返回值 为 jq类型

3. 实现思路
  * return this.eq( -1 );

### 实例方法each

1. 语法：<jq对象>.each( callback );

2. 功能: 遍历this上所有dom元素，并通过指定回调函数处理遍历的每一个dom元素

3. 实现思路
  * 使用工具类方法each
  * 返回被遍历的对象

4. 目的
  在实现dom操作方式时，会经常遍历jq对象上的dom元素，如果不实现实例方法，每一个都要通过jq函数调用each，在传入遍历对象以及回调函数，相对会比较繁琐。
  而实现了实例方法each，直接通过jq对象调用each方法只需传入一个回调函数即可。减少操作步骤，提高开发效率。

### 鸭子类型Ducking Type

“如果一个东西，走路像鸭子，叫声像鸭子，那么它就是鸭子”。

实现伪数组对象，在控制台显示时以真数组的方式展示。那么就该对象具有length属性，并且实现splice方法。

### DOM操作模块

#### appendTo方法

1. 语法：<jq对象>.appendTo( target );

2. 功能：将jq对象上的所有dom元素，分别追加给目标元素。

3. target参数类型
  * 选择器
  * DOM元素
  * DOM数组 | 伪数组
  
__为了方便处理不同类型，在实现时首先统一target参数类型，方便代码逻辑的处理。__
__将target统一为 jq对象。参数一致，便于处理。同时由于是jq对象，就可以直接调用each方法来遍历目标元素__

4. 实现思路
  * 统一target类型，为jq对象。
  * 遍历target对象，再遍历appendTo方法的调用者
  * 判断当目标元素是否为第一个元素，如果是，不需要拷贝源节点；否则就要深拷贝源节点
  * 将上述的得到新节点，添加到ret数组对象中保存；
  * 在将该新节点追加到目标dom元素下
  * 将ret转换成jq对象，作为appendTo方法的返回值，来实现链式编程

### 实现链式编程

为每一个方法返回 该方法的调用者 或者 返回一个新的jq对象。

### append方法

1. 语法：<jq对象>.append( source );

2. 功能: 将source上的所有元素，追加给jq对象。

3. 实现思路
  * 将 source 转换成 jq对象
  * 使用source调用appendTo方法，将this作为目标元素 传入 appendTo方法
  * 实现链式编程
#### prependTo方法

1. 语法：<jq对象>.prependTo( target );

2. 功能：将jq对象上的所有dom元素，追加到目标元素的最前边。

3. target参数类型
  * 选择器
  * DOM元素
  * DOM数组 | 伪数组
  
__为了方便处理不同类型，在实现时首先统一target参数类型，方便代码逻辑的处理。__
__将target统一为 jq对象。参数一致，便于处理。同时由于是jq对象，就可以直接调用each方法来遍历目标元素__

4. 实现思路
  * 统一target类型，为jq对象。
  * 遍历target对象，再遍历prependTo方法的调用者
  * 判断当前目标元素是否为第一个元素，如果是，不需要拷贝源节点；否则就要深拷贝源节点
  * 将上述的得到新节点，添加到ret数组对象中保存；
  * 在将该新节点追加到目标dom元素的最前边
  * 将ret转换成jq对象，作为prependTo方法的返回值，来实现链式编程

#### prepend方法

1. 语法：<jq对象>.prepend( source );

2. 功能: 将source上的所有元素，追加到jq对象上所有目标元素的最前边。

3. 实现思路
  * 将 source 转换成 jq对象
  * 使用source调用prependTo方法，将this作为目标元素 传入 prependTo方法
  * 实现链式编程 

#### next方法

1. 语法：<jq对象>.next();

2. 功能: 获取jq对象上的所有dom元素的下一个兄弟元素节点，返回值为 jq对象

3. 实现思路
  * 定义ret数组。存储所有兄弟元素
  * 遍历jq对象-》this
  * 遍历当前dom元素下面的所有兄弟节点
  * 如果该兄弟节点类型为元素，将将其添加到ret内，同时结束循环
  * 将结果集 转换成 jq对象，作为方法的返回值。

#### nextAll方法

1. 语法：<jq对象>.nextAll();

2. 功能: 获取jq对象上的所有dom元素的下面所有兄弟元素节点，返回值为 jq对象

3. 实现思路
  * 定义ret数组。存储所有兄弟元素
  * 遍历jq对象-》this
  * 遍历当前dom元素下面的所有兄弟节点
  * 如果该兄弟节点类型为元素，将将其添加到ret内
  * 将结果集 __去重__后 转换成 jq对象，作为方法的返回值。

#### 工具类方法 数组元素去重unique

1. 语法： <jq函数>.unique( arr );

2. 功能: 给指定的数组arr 去重，返回去重后的新数组。

3. 实现思路
  * 定义去重后新数组ret
  * 遍历原数组arr，
  * 判断ret中是否已含义该元素，
  * 如果不含有，就将该元素添加到ret内。
  * 循环结束，返回ret。

#### remove方法

1. 语法：<jq对象>.remove();

2. 功能：将jq对象上所有dom元素删除掉

3. 实现思路
  * 遍历this上的所有dom元素
  * 获取当前DOM元素的父节点，调用removeChild方法 将其删除
  * return this 实现链式编程

#### empty方法

1. 语法：<jq对象>.empty();

2. 功能：将jq对象上所有dom元素清空

3. 实现思路
  * 遍历this上的所有dom元素
  * 将当前dom元素的innerHTML属性赋值为空字符串
  * return this 实现链式编程

#### before方法

1. 语法：<jq对象>.before( node );

2. 功能：在jq对象所有元素的前面添加node节点

3. 实现思路
  * 遍历this上所有DOM元素
  * 如果node 为字符串类型，创建一个文本节点，其值 为 node，并且将其转换成jq对象；
  * 否则，直接通过工厂函数jq将其转换成jq对象
  * 遍历上面得到的jq对象
  * 通过目标元素获取其父节点，在给它的父节点在 目标元素之前添加新节点（当前遍历到节点 cur）
  * return this 实现链式编程

#### after方法

1. 语法：<jq对象>.after( node );

2. 功能：在jq对象所有元素的后面添加node节点

3. 实现思路
  * 遍历this上所有DOM元素
  * 如果node 为字符串类型，创建一个文本节点，其值 为 node，并且将其转换成jq对象；
  * 否则，直接通过工厂函数jq将其转换成jq对象
  * 遍历上面得到的jq对象
  * 通过目标元素获取其父节点，在给它的父节点在 目标元素的下一个兄弟节点之前添加新节点（当前遍历到节点 cur）
  * return this 实现链式编程
  ###  attr方法

1. 语法：<jq对象>.attr( name, value );

2. 功能：获取和设置DOM元素的属性节点值
  * 如果只传入一个参数，类型为字符串，表示获取指定属性节点值;如果对象上没有任何dom元素，就返回undefined，否则就返回对象上的第一个dom元素的指定属性节点值。
  * 如果只传入一个参数，类型为对象，同时设置多个属性节点值
    * 传入对象的属性名称，就是要设置的属性节点名字，其对应值，就是属性节点值
  * 如果传入两个参数，表示设置单个属性节点值。

3. 使用原生方法
  * getAttribute()
  * setAttribute()

4. 实现思路
  * 如果value 的值为 undefined，此时期望是 只传入一个参数。
    * 获取name参数类型，如果是字符串类型，就获取jq对象上的第一个DOM元素的指定属性节点值；如果对象上没有任何dom元素，就返回undefined。
    * 如果是对象类型，遍历jq对象上所有DOM元素，遍历name对象，给遍历到的dom元素，设置当前遍历的属性值；
  * 如果value 的值不为 undefined，那么就遍历jq对象，给遍历到的DOM元素设置单个属性节点值。
  * 如果该方法表示设置功能，要实现链式编程

5. 缺陷
  由于在实现该方法时，使用原生的get/setAttribute方法, 而getAttribute方法只能获取由setAttribute方法设置属性节点值 或者 默认的属性节点值。不能获取与用户动态交互改变后的值。因此在获取和用户交互的相关属性节点值，推荐使用prop方法。

  value
  checked

### prop方法

1. 语法：<jq对象>.prop( name, value );

2. 功能：获取和设置DOM对象的属性值
  * 如果只传入一个参数，类型为字符串，表示获取指定属性值;如果对象上没有任何dom对象，就返回undefined，否则就返回对象上的第一个dom对象的指定属性值。
  * 如果只传入一个参数，类型为对象，同时设置多个属性值
    * 传入对象的属性名称，就是要设置的DOM对象属性名字，其对应值，就是属性值
  * 如果传入两个参数，表示设置单个属性值。

3. Dom对象属性
  * class    -> className
  * for      -> htmlFor
  * readonly -> readOnly
  * rowspan  -> rowSpan
  * colspan  -> colSpan
  * ...


4. 实现思路
  * 如果value 的值为 undefined，此时期望是 只传入一个参数。
    * 获取name参数类型，如果是字符串类型，就获取jq对象上的第一个DOM对象的指定属性值；如果对象上没有任何dom对象，就返回undefined。
    * 在获取DOM对象属性值时，先看在propFix对象上是否有该属性，如果有要将该属性重新命名。
      同样下面在其他情况，也要考虑。
    * 如果是对象类型，遍历jq对象上所有DOM对象，遍历name对象，给遍历到的dom对象，设置当前遍历的属性值；
  * 如果value 的值不为 undefined，那么就遍历jq对象，给遍历到的DOM元素设置单个属性值。
  * 如果该方法表示设置功能，要实现链式编程

### val方法

1. 语法：<jq对象>.val( value );

2. 功能：获取jq对象上的第一DOM对象的value属性值；如果jq对象上没有任何DOM对象，就返回undefined。 或者 给jq对象上所有DOM对象设置value属性值

3. 实现思路
  * 如果value值 为undefined，那么表示获取jq对象上第一个DOM对象的value属性值
  * 否则，表示给jq对象上所有DOM对象设置value属性值。
  * 如果该方法的功能是设置的话，要实现链式编程。

### html方法

1. 语法：<jq对象>.html( html );

2. 功能：获取jq对象上的第一DOM对象的innerHTML属性值；如果jq对象上没有任何DOM对象，就返回undefined。
    或者给jq对象上所有DOM对象设置innerHTML属性值
 
3. 实现思路
  * 如果html值 为undefined，那么表示获取jq对象上第一个DOM对象的innerHTML属性值
  * 否则，表示给jq对象上所有DOM对象设置innerHTML属性值。
  * 如果该方法的功能是设置的话，要实现链式编程。

### text方法

1. 语法：<jq对象>.text( txt );

2. 功能：获取jq对象上的第一DOM对象的textContent属性值；如果jq对象上没有任何DOM对象，就返回undefined。或者给jq对象上所有DOM对象设置textContext属性值
 
3. 实现思路
  * 如果html值 为undefined，那么表示获取jq对象上第一个DOM对象的textContent属性值
  * 否则，表示给jq对象上所有DOM对象设置textContent属性值。
  * 如果该方法的功能是设置的话，要实现链式编程。

### hasClass方法

1. 语法
 <jq对象>.hasClass( className );

2. 功能
 只要在jq对象上有一个DOM元素具有指定的样式类，该方法就返回true；否则就返回false

3. 实现思路
  * 遍历jq对象
  * 如果当前遍历到的DOM元素含有 指定的样式类 就返回true，结束循环。
  * 如果整个循环结束，每个DOM元素都不含有指定样式类，就返回false。

### addClass方法

1. 语法
  <jq对象>.addClass( className );

2. 功能
  给jq对象上所有DOM元素添加样式类

3. 实现思路
  * 遍历this
  * 判断当前DOM元素是否含有该样式类，如果不具有该样式类，那么就添加上。
  * 实现链式编程


### ajax 模块 创建请求对象

1. 原生方法
  * w3c：XMLHttpRequest
  * IE： ActiveXObject

### 封装Ajax模块

1. 确定Ajax配置的默认值
	* url          => ''
	* type         => 'get'
	* data         => {}
	* success      => null
	* fail         => null
	* async        => true
	* dataType     => 'json'
	* contentType  => 'application/x-www-form-urlencoded'

2. Ajax默认配置存放在哪里？

 要用一个对象来存储上述Ajax配置信息，像jQuery一样，将其放到工厂函数上。

### 改造extend方法的实现

1. 如果只传入一个参数，给this扩展成员

2. 否则，就是给第一个参数扩展成员

### 跨域

__实现JSONP跨域时，必须创建全局函数并且将其函数名字发送到服务器__

1. JSONP：解决跨域的一种方式。缺点：不能发送跨域的post请求。

2. 本质：利用script标签的src属性可以跨域的特性。

3. 实现流程
	* 创建script标签，添加到head标签下
	* 创建一个全局函数，用来处理服务响应的数据
	* 指定script标签的src属性值，同时将全局回调函数发送到服务器
	* 要与后台人员沟通，将发送全局函数的参数名告诉后台人员等等

4. 实现步骤
	* 创建请求对象 -> script标签	
	* 创建全局函数，将全局函数添加到 data 内
	* 格式化数据
	* 监听请求状态 ->
	  使用timeout来做请求状态的监听；如果在超时时间内完成请求，表示成功；否则失败
	* 发送请求 -> 给script标签指定src属性值
