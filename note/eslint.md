# [eslint — js书写规范](http://www.cnblogs.com/my93/p/5681879.html)

一、安装
npm install -g eslint 安装eslint
编辑器安装插件eslint（具体安装方法根据不同编辑器而不同）

二、使用
使用方法一：
eslint --init npm中用命令新建eslintrc.js文件
eslint yourfile.js npm中用命令检查自己文件中的错误

使用方法二：
手动在项目的根目录下新建eslintrc.*文件（.js、.json、.yaml、.yml等），进行配置（具体配置规则详见下文），即可在安装好eslint的编辑器中查看到出现错误的位置。

三、配置：[http://eslint.org/docs/rules/](http://eslint.org/docs/rules/) (以下规则文件配置一个即可，置于项目根目录下)
(1).eslintrc文件中进行配置 [http://eslint.org/docs/user-guide/configuring](http://eslint.org/docs/user-guide/configuring)

```javascript
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

四、其他
1. 在样式之前标注“/* eslint-disable */”，可忽略配置的规则；标注“/* esint-enable */“，开启配置的规则
2. “/* eslint-enable */“必须在“/* eslint-disable */”之后使用
3. 忽略指定的内容：新建一个.eslineignore文件，例如：
    \# /node_modules/* and /bower_components/* ignored by default
    \# Ignore built files except build/index.js
build/*
!build/index.js
通过命令 eslint --ignore-path .eslintignore file.js可检测是否被忽视
4. enlint 有很多的rules，为了改变rule的设置，可以设置rule ID等同于一些规则属性：如
    "off" or 0 关闭规则
    "warn" or 1 打开规则，出现警告提示
    "error" or 2 打开规则，出现错误提示
规则可如下定义：

```javascript
"rules": {
    "camel_case": 2
  }
```

五、配置文件

```javascript
{
    "rules": {
    "array-callback-return": "error",
    "indent": ["error", 4, {"SwitchCase": 1}],
    "block-spacing": "error",
    "brace-style": ["error", "1tbs"],
    "camelcase": ["error", { "properties": "never" }],
    "callback-return": ["error", ["cb", "callback", "next"]],
    "comma-spacing": "error",
    "comma-style": ["error", "last"],
    "consistent-return": "error",
    "curly": ["error", "all"],
    "default-case": "error",
    "dot-notation": ["error", { "allowKeywords": false }],
    "eol-last": "error",
    "eqeqeq": "error",
    "guard-for-in": "error",
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "keyword-spacing": "error",
    "lines-around-comment": ["error", {
        "beforeBlockComment": true,
        "afterBlockComment": false,
        "beforeLineComment": true,
        "afterLineComment": false
    }],
    "new-cap": "error",
    "newline-after-var": ["error", "never"],
    "new-parens": "error",
    "no-array-constructor": "error",
    "no-invalid-this": "error",
    "no-multi-spaces": "error",
    "no-redeclare": "error",
    "no-return-assign": "error",
    "no-spaced-func": "error",
    "no-trailing-spaces": "error",
    "semi": "error",
    "semi-spacing": "error",
    "quotes":["error","double"],
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": ["error", {"words": true, "nonwords": false}],
    "spaced-comment": "error",
    "yoda": ["error", "never"],
    "no-mixed-requires": "error",
    "handle-callback-err": ["error", "err"]
  }
}
```

六、配置文件说明

| 属性名                                      | 属性值                                      | 描述                    |
| ---------------------------------------- | ---------------------------------------- | --------------------- |
| [array-callback-return](http://eslint.org/docs/rules/array-callback-return) | "error"                                  | Array执行回调函数返回语句       |
| [indent](http://eslint.org/docs/rules/indent) | ["error", 4, {"SwitchCase": 1}]          | 缩写格式的一致性              |
| [block-spacing](http://eslint.org/docs/rules/block-spacing) | "error"                                  | 禁止执行空间内出现'-'          |
| [brace-style](http://eslint.org/docs/rules/brace-style) | ["error","1tbs"]                         | 代码书写格式验证              |
| [camelcase](http://eslint.org/docs/rules/camelcase) | ["error", { "properties": "never" }]     | 属性命名规则可以不使用驼峰命名法      |
| [callback-return](http://eslint.org/docs/rules/callback-return) | ["error", ["cb", "callback", "next"]]    | 回调函数需要return进行返回      |
| [comma-spacing](http://eslint.org/docs/rules/comma-spacing) | "error"                                  | 不允许在逗号前面出现空格          |
| [comma-style](http://eslint.org/docs/rules/comma-style) | ["error", "last"]                        | 方数组元素、变量声明等直接需要逗号隔开   |
| [consistent-return](http://eslint.org/docs/rules/consistent-return) | "error"                                  | 保持return返回的一致性        |
| [curly](http://eslint.org/docs/rules/curly) | ["error", "all"]                         | 函数或者条件判断时需要统一使用大括号    |
| [default-case](http://eslint.org/docs/rules/default-case) | "error"                                  | switch语句中必须有default条件 |
| [dot-notation](http://eslint.org/docs/rules/dot-notation) | ["error", { "allowKeywords": false }]    | 不允许关键字出现在变量中          |
| [eol-last](http://eslint.org/docs/rules/eol-last) | "error"                                  | 代码间间隔出现一行             |
| [eqeqeq](http://eslint.org/docs/rules/eqeqeq) | "error"                                  | 消除不安全类型的全等操作          |
| [guard-for-in](http://eslint.org/docs/rules/guard-for-in) | "error"                                  | for循环中过滤掉一下不被需要的行为    |
| [key-spacing](http://eslint.org/docs/rules/key-spacing) | ["error", { "beforeColon": false, "afterColon": true }] | 键和值前保留一个空格            |
| [keyword-spacing](http://eslint.org/docs/rules/keyword-spacing) | "error"                                  | 确保字符前后空格的一致性          |
| [lines-around-comment](http://eslint.org/docs/rules/lines-around-comment) | ["error", {"beforeBlockComment": true,"afterBlockComment": false,"beforeLineComment": true,"afterLineComment": false}] | 注释前需要空行，注释后不需要空行      |
| [new-cap](http://eslint.org/docs/rules/new-cap) | "error"                                  | 构造函数首字母需要大写           |
| [newline-after-var](http://eslint.org/docs/rules/newline-after-var) | ["error", "never"]                       | var定义后不空行             |
| [new-parens](http://eslint.org/docs/rules/new-parens) | "error"                                  | 没有参数时，构造函数也需要添加括号     |
| [no-invalid-this](http://eslint.org/docs/rules/no-invalid-this) | "error"                                  | 不允许关键字this在函数或者类的外面   |
| [no-multi-spaces](http://eslint.org/docs/rules/no-multi-spaces) | "error"                                  | 不允许键和值之间存在多个空格        |
| [no-redeclare](http://eslint.org/docs/rules/no-redeclare) | "error"                                  | 不允许重复声明               |
| [no-return-assign](http://eslint.org/docs/rules/no-return-assign) | "error"                                  | 不允许在return语句中任务       |
| [no-spaced-func](http://eslint.org/docs/rules/no-spaced-func) | "error"                                  | 调用函数时，函数名和括号之间不能有空格。  |
| [no-trailing-spaces](http://eslint.org/docs/rules/no-trailing-spaces) | "error"                                  | 不允许在语句后存在多余的空格        |
| [semi](http://eslint.org/docs/rules/semi) | "error"                                  | 语句以分号结尾               |
| [semi-spacing](http://eslint.org/docs/rules/semi-spacing) | "error"                                  | 分号前后不能有空格             |
| [quotes](http://eslint.org/docs/rules/quotes) | ["error","double"]                       | 使用双引号                 |
| [space-before-function-paren]([http://eslint.org/docs/rules/space-before-function-paren](http://eslint.org/docs/rules/space-before-function-paren)） | "space-before-function-paren": ["error", "never"] | 不允许函数括号之间存在空格         |
| [space-in-parens](http://eslint.org/docs/rules/space-in-parens) | "error"                                  | 不允许在括号里面存在空格          |
| [space-infix-ops](http://eslint.org/docs/rules/space-infix-ops) | "error"                                  | 插入符合变量之间需要添加一个空格      |
| [space-unary-ops](http://eslint.org/docs/rules/space-unary-ops) | ["error", {"words": true, "nonwords": false}] | 允许一元运算符操作             |
| [spaced-comment](http://eslint.org/docs/rules/spaced-comment) | "error"                                  | 注释前需要一个空格             |
| [yoda](http://eslint.org/docs/rules/yoda) | ["error", "never"]                       | 条件语句中，变量在赋值语句的前面      |
| [no-mixed-requires](http://eslint.org/docs/rules/no-mixed-requires) | "error"                                  | 不允许混合requires文件       |
| [no-new-require](http://eslint.org/docs/rules/no-new-require) | "error"                                  | 不允许new require出现      |
| [no-path-concat](http://eslint.org/docs/rules/no-path-concat) | "error"                                  | 不允许路径以_链接             |
| [handle-callback-err](http://eslint.org/docs/rules/handle-callback-err) | ["error", "err"]                         | 处理错误的回调函数             |