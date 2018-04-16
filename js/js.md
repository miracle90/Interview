# JS简答题

### JS有几种数据类型，其中基本数据类型有哪些？
七种数据类型

Boolean
Null
Undefined
Number
String
Symbol (ECMAScript 6 新定义)
Object

(ES6之前)其中5种为基本类型:string,number,boolean,null,undefined

ES6出来的Symbol也是原始数据类型 ，表示独一无二的值

Object 为引用类型(范围挺大), 也包括数组、函数

### null和undefined的差异
相同点:

* 在 if判断语句中,值都默认为 false
* 大体上两者都是代表无,具体看差异

差异:

* null转为数字类型值为0,而undefined转为数字类型为 NaN(Not a Number)
* undefined是代表调用一个值而该值却没有赋值,这时候默认则为undefined
* null是一个很特殊的对象,最为常见的一个用法就是作为参数传入(说明该参数不是对象)
* 设置为null的变量或者对象会被内存收集器回收

### JS 的DOM 操作(节点获取及增删查改)
```js
// 获取
var node = document.getElementById('id');
var element = document.querySelector('#test');

// 追加
element.appendChild(Node);

// 删除
element.removeChild(Node);


// 改
element.setAttribute(name, value); // 增加属性
element.removeAttribute(attrName); //删除属性

// 以上面的例子为例
/*
<div id="test">
   <span>Hello, World</span>
</div>
*/

var test = document.createElement('div');  // 创建一个块级元素
test.setAttribute("id","test"); // 设置其id 属性
var span = document.createElement('span'); // 创建一个 span
span.innerText = "Hello,world"; // 插入 span 的文本内容
test.appendChild(span); // 组合节点
element.appendChild(test); //追加到某个节点区域
```
### 对数组 ['2018-03-05', '2013-06-12','2019-03-12','2018-03-05','2014-02-22'] 去重且排序
// Set 具有值唯一性
// 结合...解构,可以把可迭代(比如 arguments/nodelist 等)的转为数组
// sort 里面传入两个值比较,返回-1和1是因为1代表这个数大排后(相对),-1代表小(相对),0为相等

```js
let arr = [...new Set(['2018-03-05', '2013-06-12','2019-03-12','2018-03-05','2014-02-22'])].sort(function(a,b){
  return a < b ? -1 : 1; // 这里返回的是升序的,降序改下返回值就好了.所以是相对
})
```

### 对数组[1,2,3,4,5,'6',7,'8','a','b','z']进行乱序
```js
let tempArr = [1,2,3,4,5,'6',7,'8','a','b','z'].sort(function(){
  return Math.random() > 0.5 ? -1 : 1;
})
```

### JS 实现String.trim()方法
```js
String.prototype.emuTrim = function(){
    // 这条正则很好理解,就是把头部尾部多余的空格字符去除
    return this.replace(/(^\s*)|(\s*$)/g,'');
}
```
