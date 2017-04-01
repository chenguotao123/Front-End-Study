### offset
    jd菱形小三角的制作
    高度剩余法，宽度剩余法	

    offsetLeft
    offsetTop 
    offsetWidth //除了margin
    OffsetHeight//除了margin以外所有的高度
    OffsetParent //获取到当前元素外面的定位父盒子


    scrollWidth（内部内容的真实宽度） scrollHeight 计算方式相同，height/width+padding
    scrollTop 被卷曲的内容高度
    scrollLeft 同理

### 获取卷曲的高度
```javascript
    Window.onscroll=function(){
        //短路操作
        var topVal=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop
        var leftVal=window.pageYOffset||document.documentElement.scrollLeft||document.body.scrollLeft
    }
    clientHeight (内部空间的高度 )和 clientWidth（元素内部的真实宽度）
```