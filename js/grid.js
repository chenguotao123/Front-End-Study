/*
*   简单表格的插件
*   eg：target: '#list',
		tclass: 'gridtable',
		data: data,
		model: model,
        width: '800',
*/
(function (global) {
    "use strict";
    var doc = global.document
    function Table(config) {
        /*参数过滤*/
        if (!(config && config.model && config.data)) {
            console.warn("参数传入有误")
            return this;
        }
        Table.extend(this, config)
        this.table = doc.createElement("table")
        this.tclass && (this.table.className = this.tclass);
        this.width && (this.table.style.width = global.parseFloat(this.width) + 'px')
    }
    Table.prototype = {
        constructor: Table,
        renderHead: function () {
            var thead,
                tr,
                th;

            var i = 0,
                l = this.model.length;

            thead = doc.createElement('thead');
            tr = doc.createElement('tr');

            for (; i < l; i++) {
                th = doc.createElement('th');
                // 指定的列头文本信息
                // 当前对象的title属性值
                th.innerHTML = this.model[i].title || '';
                tr.appendChild(th);
            }

            thead.appendChild(tr);
            this.table.appendChild(thead);
        },
        renderBody: function () {
            var tbody,
                tr,
                td;

            var i = 0,
                l = this.data.length;

            var j = 0,
                k = this.model.length;


            var trdata,
                colInfo;

            tbody = doc.createElement('tbody');
            for (; i < l; i++) {
                trdata = this.data[i];
                tr = doc.createElement('tr');
                // 遍历model（每一个列数据渲染对应属性）
                for (j = 0; j < k; j++) {
                    // 存储列的配置信息
                    colInfo = this.model[j];
                    td = doc.createElement('td');
                    // 拿到当前列，渲染数据对应属性
                    // model数组元素的每一个对象的prop属性对象的是当前列渲染所用属性
                    // 如果没有对应的数据信息，就赋值为空字符串
                    td.innerHTML = trdata[colInfo.prop] || '';
                    // updated: 设置列宽、字体颜色、对齐方式
                    colInfo.width && (td.style.width =
                        global.parseFloat(colInfo.width) + 'px');

                    colInfo.color && (td.style.color = colInfo.color);

                    colInfo.align && (td.style.textAlign = colInfo.align);
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }

            this.table.appendChild(tbody);
        },
        render: function () {
            this.renderHead();
            this.renderBody();
            doc.querySelector(this.target).appendChild(this.table);
            this.sort();
        },
        sort: function () {
            var ths = this.table.getElementsByTagName('th'),
                i = 0,
                l = ths.length;
            var self = this;
            for (; i < l; i++) {
                ths[i].addEventListener("click", function (i) {
                    return function (e) {
                        // 拿到事件源
                        var target = e.target;
                        // 3：确定排序的方式（升|降序）
                        var sortBy, // 存储排序方式 1 升序 -1 降序
                            sortKey;  // 存储排序的字段（按照哪个属性来排序）

                        sortBy = target.sortBy || -1;
                        target.sortBy = -sortBy;
                        // console.log(target.sortBy)
                        // 4: 确定排序字段
                        sortKey = self.model[i].prop;
                        // console.log(i)
                        // 5: 给数据排序
                        self.data.sort(function (a, b) {
                            return a[sortKey] > b[sortKey] ? -sortBy : sortBy;
                        });
                        // 6: 重新绘制body
                        //  a: 清除当前table的body		
                        self.table.removeChild(self.table.getElementsByTagName('tbody')[0]);
                        //  b: 绘制tbody
                        self.renderBody();
                    }
                }(i))
            }
        }
    }
    Table.extend = function () {
        var obj, i = 1;
        if (arguments.length == 0) {
            console.warn("没有传参")
            return undefined;
        }
        if (arguments.length > 1) {
            for (; i < arguments.length; i++) {
                obj = arguments[i]
                for (var k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        arguments[0][k] = obj[k]
                    }
                }
            }
        }
    }
    // 工厂模式创建table对象，
    // 目的：防止用户在使用时，不带new
    function createTable(config) {
        return new Table(config);
    }
    // support requireJS SeaJS
    if (typeof define === 'function') {
        define(function () {
            return Table;
        });
    }
    // support NodeJS
    else if (typeof exports !== 'undefined') {
        module.exports = Table;
    }
    else {
        // this => window
        // 给window对象添加属性propName，就相当于在全局上定义了一个变量propName
        // this.table = createTable;
        this ? (this.table = createTable) : (global.table = createTable)
    }
}(window))

var config = {
    target: '#list',
    tclass: 'grid-table',
    width: '800',
    model: [
        { title: '年龄', prop: 'age', width: 40 },
        { title: '性别', prop: 'gender', color: 'red' },
        { title: '姓名', prop: 'name', align: 'right' },
        { title: '备注', prop: 'remark' }],
    data: [{
        name: '张三',
        age: 18,
        gender: '男'
    }, {
        name: '污有',
        age: 19,
        gender: '男'
    }, {
        name: '老王',
        age: 10,
        gender: '女'
    }]
}
var t = table(config)
t.render()
