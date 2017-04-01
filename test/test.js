
function reverse(arr) {
    var temp = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        temp.push(i);
    }
    return temp;
}
// //冒泡排序
function sort(arr) {
    for (i = 0; i < arr.length - 1; i++) {
        var flag = true;
        for (j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return arr;
}

// var length = 10;
// function fn() {
//     console.log(this.length);
// }
// var obj = {
//     length: 5,
//     method: function (f) {
//          f();

//         // arguments[0]();
//         // arguments[0].call(this);
//     }
// }
// obj.method(fn);

