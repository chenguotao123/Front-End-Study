/**
 * 这个函数的作用，让指定的标签运动到left为指定值的位置
 * @param tag 传入标签
 * @param target 需要让left运动到的位置
 * @param step 每步移动的大小
 * @param sec 移动的频率
 */
function animate1(tag, target, step, sec) {
    clearInterval(tag.timer); //快速切换点击造成的闪缩
    tag.timer = setInterval(function () {
        var leader = tag.offsetLeft
        if (!step) {
            step = 10
        }
        if (!sec) {
            sec = 20
        }
        //解决倒退
        step = leader > target ? -step : step
        //解决闪烁
        if (Math.abs(leader - target) > Math.abs(step)) {
            leader += step
            tag.style.left = leader + "px"
        } else {
            tag.style.left = target + "px"
            clearInterval(tag.timer)
        }

    }, sec)
}

/**
 * 这个函数的作用，缓动
 * @param tag 传入标签
 * @param target 需要让left运动到的位置
 * @param sec 移动的频率
 */
function animate2(tag, target, sec) {
    clearInterval(tag.timer); //快速切换点击造成的闪缩
    tag.timer = setInterval(function () {
        var leader = tag.offsetLeft
        if (!sec) {
            sec = 20
        }
        var step = (target - leader) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        //解决闪烁
        if (Math.abs(leader - target) > Math.abs(step)) {
            leader += step
            tag.style.left = leader + "px"
        } else {
            tag.style.left = target + "px"
            clearInterval(tag.timer)
        }

    }, sec)
}

/**
 * 获取某个标签的样式
 */
function getStyle(tag, attr) {
    if (tag.currentStyle) {
        // ie支持
        return tag.currentStyle[attr]
    } else {
        //标准方法
        return getComputedStyle(tag, null)[attr]
    }

}

/**
 * 这个函数的作用 全面
 * @param tag 传入标签
 * @param target 需要让运动到的位置
 * @param attr 属性
 * @param sec 移动的频率
 */
function animate3(tag, target, attr, sec) {
    clearInterval(tag.timer); //快速切换点击造成的闪缩
    tag.timer = setInterval(function () {
        var leader = parseInt(getStyle(tag, attr)) || 0
        if (!sec) {
            sec = 20
        }
        var step = (target - leader) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        leader += step
        tag.style[attr] = leader + "px"
        if (leader == target) {
            clearInterval(tag.timer);
        }
    }, sec)
}

/**
 * 这个函数的作用 全面
 * @param tag 传入标签
 * @param target 需要让运动到的位置
 * @param attr 属性
 * @param sec 移动的频率
 */
function animate4(tag, obj,fn, sec) {
    clearInterval(tag.timer); //快速切换点击造成的闪缩
    tag.timer = setInterval(function () {
        var flag = true
        for (var k in obj) {
            var leader = parseInt(getStyle(tag, k)) || 0
            var target = obj[k]
            if (!sec) {
                sec = 20
            }
            var step = (target - leader) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step)
            leader += step
            tag.style[k] = leader + "px"
            if (leader != target) {
                flag = false
            }
        }
        if (flag) {
            clearInterval(tag.timer)
            fn&&fn()
        }

    }, sec)
}

/**
 * 这个函数的作用 全面
 * @param tag 传入标签
 * @param target 需要让运动到的位置
 * @param attr 属性
 * @param sec 移动的频率
 */
function animate(tag, obj, fn, sec) {
    clearInterval(tag.timer); //快速切换点击造成的闪烁
    tag.timer = setInterval(function () {
        var flag = true
        if (!sec) {
            sec = 20
        }
        for (var k in obj) {
            if (k == "opcity") {
                var leader = getStyle(tag, k) * 100 || 0
                var target = obj[k] * 100
                var step = (target - leader) / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
                leader += step
                tag.style[k] = leader / 100
            } else if (k == "zIndex") {
                tag.style[k] = obj.zIndex
            } else {
                var leader = parseInt(getStyle(tag, k)) || 0
                var target = obj[k]
                var step = (target - leader) / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
                leader += step
                tag.style[k] = leader + "px"
            }
            if (leader != target) {
                flag = false
            }
        }
        if (flag) {
            clearInterval(tag.timer)
            fn && fn()
        }

    }, sec)
}