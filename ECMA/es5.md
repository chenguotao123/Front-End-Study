# ES5数组的新方法

## forEach
```javascript
    var arr = [1, 2, 2, 2, 2, 6, 9]
    var sum = 0
    <!--a=>arr-->
    arr.forEach(function (value,i,a) {
        sum += value
    })
```
## map
```javascript
//类似foreach 有返回值 返回一个新数组
arr.map(function (x) {
    return x + 1
})
```

## filter 过滤器
```javascript
    //返回指定条件的新数组
    arr.filter(function (x) {
        return x < 2
    })
```
## some
```javascript
//空数组时 some 返回false every 返回true
// some 存在一个满足条件就返回true
arr.some(function (x) {
    return x = 2   //true
})
```
## every
```javascript
    //返回true false 
arr.every(function (x) {
    return x > 10 //false
})
```
## indexOf
```javascript

```
## lastIndexOf
```javascript

```
## reduce
```javascript

```
## reduceRight
```javascript

```