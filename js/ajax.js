var $ = {
    // 处理对象的方法
    param: function (obj) {
        var httpStr = '';
        for (var k in obj) {
            httpStr += k + '=' + obj[k] + '&';
        }
        httpStr = httpStr.slice(0, -1);
        return httpStr;
    },
    ajax: function (options) {
        // 1.请求方式
        var type = options.type || 'get';
        // 2.请求地址
        var url = options.url || '';
        // 3.请求正文
        var data = this.param(options.data || {});
        // 4.成功时的回调函数
        var successCallback = options.successCallback;

        // ajax请求
        // 1.实例化对象
        var xhr = new XMLHttpRequest();
        // 2.设置请求行
        if (type == "get") {
            url = url + '?' + data;
            data = null;
        }
        xhr.open(type, url);
        // 3.设置请求头
        if (type == "post") {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        
       
        // 5.监听并处理相应
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 6.成功时的回调
                successCallback(xhr.responseText);
            }
        }
        // 4.设置请求正文
         xhr.send(data);
    }
}