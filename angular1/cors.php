<?php


       //添加一个响应头
        //access 通过 control

       //现在想要客户端浏览器去接收这个数据.
        //必须给客户端浏览器响应一个响应头
        //Access-Control-Allow-Origin http 协议规定.
        //http://11.tianmao.com/cors.php
        //我允许来自 http://www.baidu.com,http://127.0.0.1 的站点
        //支持get ，支持post

       header("Access-Control-Allow-Origin:*");
        //只支持post 提交.
       //客户端必须post 方式提交.
       echo "hello kitty";

?>