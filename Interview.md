## 一面（基础知识）

### 页面布局类

#### 题目：假设高度已知，写出三栏布局，左右固定宽度各位300px，中间自适应
1. 浮动
```html
<section class="layout float">
    <style media="screen">
        .layout.float .left {
            float: left;
            width: 300px;
            background: red;
        }
        .layout.float .right {
            float: right;
            width: 300px;
            background: blue;
        }
        .layout.float .center {
            background: gold;
        }
    </style>
    <article class="left-right-center">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center">浮动---center部分浮动---center部分浮动---center部分浮动---center部分浮动---center部分</div>
    </article>
</section>
```
2. 绝对定位
```html
<section class="layout absolute">
    <style media="screen">
        .layout.absolute .left-center-right > div {
            position: absolute;
        }

        .layout.absolute .left {
            left: 0;
            width: 300px;
            background: red;
        }
        .layout.absolute .right {
            right: 0;
            width: 300px;
            background: blue;
        }
        .layout.absolute .center {
            left: 300px;
            right: 300px;
            background: gold;
        }
    </style>
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">绝对定位---center部分</div>
        <div class="right"></div>
    </article>
</section>
```

3. Flex
```html
<section class="layout flex">
    <style media="screen">
        .layout.flex {
            margin-top: 200px;
        }
        .layout.flex .left-center-right {
            display: flex;
        }
        .layout.flex .left {
            width: 300px;
            background: red;
        }
        .layout.flex .right {
            width: 300px;
            background: blue;
        }
        .layout.flex .center {
            flex: 1;
            background: gold;
        }
    </style>
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">flex布局---center部分</div>
        <div class="right"></div>
    </article>
</section>
```

4. Grid
```html
<section class="layout grid">
    <style media="screen">
        .layout.grid .left-center-right {
            display: grid;
            width: 100%;
            grid-template-rows: 100px;
            grid-template-columns: 300px auto 300px;
        }
        .layout.grid .left {
            background: red;
        }
        .layout.grid .right {
            background: blue;
        }
        .layout.grid .center {
            background: gold;
        }
    </style>
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">Grid布局---center部分</div>
        <div class="right"></div>
    </article>
</section>
```

5. 表格布局
```html
<section class="layout table">
    <style media="screen">
        .layout.table .left-center-right {
            display: table;
            width: 100%;
            height: 100px;
        }
        .layout.table .left {
            display: table-cell;
            width: 300px;
            background: red;
        }
        .layout.table .right {
            display: table-cell;
            width: 300px;
            background: blue;
        }
        .layout.table .center {
            display: table-cell;
            background: gold;
        }
    </style>
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">表格布局---center部分</div>
        <div class="right"></div>
    </article>
</section>
```

#### 题目延伸：5种方案的优缺点
|          |优点       |缺点      |
|----------|----------|----------|
|浮动|兼容性好|清除浮动（脱离文档流，会带来很多问题）|
|绝对定位|快捷|脱离文档流|
|Flexbox|最全面，移动端很普及|兼容性|
|表格布局|兼容性好|单元格高度随着调整|
|Grid|替代栅格系统|兼容性|

#### 题目延伸：假如高度未知，哪个方案失效
* 浮动、绝对定位、Grid均会失效
* flex、表格布局可以

#### 题目延伸：5种方案的兼容性

### css盒模型
#### 问题：谈谈你对css盒模型的认识？
1. 基本概念：标准模型 + IE模型
2. 标准模型和IE模型的区别（计算宽度和高度的不同）
3. 如何设置

* 标准盒模型的宽和高指的是content
* IE盒模型的宽和高包括content+padding+border
* box-sizing

#### js如何设置、获取盒模型对应的宽和高
1. dom.style.width/height来获取，只能取内联样式
2. dom.currentStyle.width/height，只有IE支持
3. window.getComputedStyle(dom).width/height，兼容性更好
4. dom.getBoundingClientRect().width/height，计算元素的绝对位置，相对于视窗，获取top，left，width，height

#### 边距重叠问题 --- 取最大值

#### BFC的基本概念 --- 块级格式化上下文（边距重叠解决方案）

#### BFC的原理（BFC的渲染规则）

#### 如何创建BFC
1. float不为none
2. position不为static、relative
3. display中的table-cell等table属性可以
4. overflow: hidden/auto，不为visible

#### BFC使用场景
1. 解决边距重叠，给元素的父元素设置overflow: hidden/auto;
2. 清除浮动（将父元素设置成BFC后，子元素浮动也会计算到父元素的高度中）

### DOM事件

#### DOM事件的级别（没有DOM1）
1. DOM0 element.onclick = function() {}
2. DOM1 element.addEventListener('click', function() {}, false);（IE atachEvent）
3. DOM2 element.addEventListener('keyup', function() {}, false);（事件增加类型）

#### DOM事件模型（冒泡、捕获）

#### DOM事件流
捕获--目标阶段--冒泡

#### 描述DOM事件捕获的具体流程
1. 从上到下，第一个接收的是 window--document--html--body
2. document.documentElement
3. document.body

#### event对象的常见应用
* event.stopPropagation()阻止冒泡
* event.stopImmediatePropagation()事件响应优先级绑定多个事件时，阻止其他事件执行
* event.preventDefault()阻止默认事件
* event.target当前被点击的元素，可以用来事件委托
* event.currentTarget当前所绑定的事件，比如在父级元素上绑定的

#### 自定义事件
* new Event()

```js
var eve = new Event('custom');
node.addEventListener('custom', function(){
  console.log('custom');
})
// 触发
node.dispatch(eve);
```
```js
// 自定义事件
var eve = new Event('test');
ev.addEventListener('test', function() {
    console.log('test dispatch');
});
// 直接派发事件
ev.dispatchEvent(eve);
```

### 类型转换（升级）
#### 数据类型
最新的ECMAScript标准定义了7种数据类型

* 原始类型：Boolean，String，Number，Null，Undefined，Symbol(ES6中新增加数据类型)
* 对象：Object

#### 显式类型转换
> Number函数
1. Number('123')    // 123
2. Number('')    // 0
3. Number('abc')    // NaN
4. Number(true)     // 1
5. Number(false)     // 0
6. Number(undefine)     // NaN
7. Number(null)     // 0

> String函数
1. String(1)    // '1'
2. String(true)    // 'true'
3. String(undefined)    // 'undefined'
4. String(null)    // 'null'

> Boolean函数

#### 隐式类型转换
> 四则运算

> 判断语句（if语句）

> Native调用（console.log）

#### typeof

#### instanceof

### HTTP协议

#### HTTP协议的主要特点
* 简单快速: 只要输入URI就可以了
* 灵活: 通过一个http协议就可以完成不同数据传输
* 无连接: 链接一次就会断开
* 无状态: 服务端无法区分客户端身份

#### HTTP报文的组成部分
* 请求报文：请求行（http方法、页面地址、http协议、版本）、请求头（key、value值）、空行（遇到空行不再是请求头）、请求体
* 响应报文：状态行（http协议、版本、状态码）、响应头、空行、响应体

#### HTTP方法
* GET：请求资源
* POST：传输资源
* DELETE：删除资源（用的不多）
* PUT：更新资源（用的不多）
* HEAD：获得报文首部（用的不多）

#### POST和GET方法
|GET        |POST       |
|-----------|-----------|
|在浏览器回退时是无害的|会再次提交请求|
|会被浏览器主动缓存|不会，除非主动设置|
|请求参数会被完整保存在浏览器历史记录里|不会|
|长度限制（不同浏览器长度不同）|无限制|
|参数通过URL传递|放在request body中，更安全|
|******|******|
|产生的URL地址可以被收藏|不可以|
|只能进行url编码|支持多种编码方式|
|只接受ASCII字符|无限制|

#### HTTP状态码
* 1XX：指示信息---表示请求已接收，继续处理
* 2XX: 成功---表示请求已被成功接收
* 3XX：重定向---要完成请求必须进行更进一步的操作
* 4XX：客户端错误---请求有语法错误或请求无法实现
* 5XX：服务端错误---服务端未能实现合法的请求

**********************************************  

* 200：客户端请求成功
* 206：客户发送了一个带有Range（范围：0-10000字节）头的GET请求，服务器实现了它（从整个文件中截取一部分返回）**播放音频视频用到**
* 301：永久重定向
* 302：临时重定向
* 304：可以直接使用缓存的资源
* 400：客户端有语法错误
* 401：请求未经授权
* 403：资源禁止被访问（只能通过服务器访问）
* 404：请求资源不存在
* 500：服务器发生不可预期的错误
* 503：请求未完成，服务器临时过载或宕机，一段时间后可能恢复

> 500状态码前端识别即可，具体的状态码都是服务端处理

#### 什么是持久连接（HTTP1.1协议中才有的功能）
* HTTP协议采用“请求-应答”模式，当使用普通模式时，即非Keep-Alivw模式时，每个请求/应答，客户端和服务器端都要新建一个连接，完成之后立即断开（HTTP协议为无连接的协议）
* 当使用Keep-Alive模式（又称持久连接）时，Keep-Alive使客户端到服务器端的连接持续有效，当出现对服务器的后续请求时，避免了重复建立连接

#### 什么是管线化（在持久连接的情况下完成的）
* 通俗地讲，就是将客户端的请求打包一次性完成，服务器端再一次性按请求顺序返回
* 管线化机制通过持久连接完成，仅HTTP/1.1支持此技术
* 只有get和head请求可以进行管线化，而post则有所限制
* 服务器不支持HTTP/1.1就不可以进行管线化
* 管线化不会影响相应顺序
* 很多服务端和代理程序对管线化支持并不是很好，所以Chrome和Firefox默认不开启管线化

### 原型类

#### 创建对象有几种方法
1. 对象字面量
2. 构造函数
3. Object.create()      // 是用原型链连接的

```js
var obj1 = {
    name: 'obj1'
};
var obj2 = Object({name: 'obj2'});
var M = function(name) {
    this.name = name;
}
var obj3 = new M('obj3');
var obj4 = Object.create({name: 'obj4'});

M.prototype.say = function() {
    console.log('hello world!');
}

var obj5 = new M('obj5');
```

#### 原型、构造函数、实例、原型链
* 多个实例共用方法时使用原型
* 函数也有__proto__（函数也是对象），指向Function.prototype

```js
M.prototype.constructor === M                   // true
obj3.__proto__ === M.prototype                  // true
M.prototype.__proto__ === Object.prototype      // true
M.__proto__ === Function.prototype              // true
```

#### instanceof原理
用 `constructor` 比 `instanceof` 严谨

#### new运算符
```
var obj = new foo();
```
1. 一个新对象被创建，它继承自foo.prototype
2. 构造函数被执行，相应的传参会被传入
3. this会被指定这个新实例
4. 如果构造函数返回一个对象，那么这个对象会取代整个new出来的对象

### 面向对象类

#### 类与实例
1. 类的声明
```js
// 类的声明
function Animal() {
    this.name = 'wangwang';
}
// ES6类的声明
class Animal6 {
    constructor () {
        this.name = 'wangwang';
    }
}
```

2. 生成实例
```js
// 实例化
console.log(new Animal);
console.log(new Animal6);
```

#### 类与继承
1. 如何实现继承

2. 继承的几种方式
```js
// 借助构造函数实现继承
function Parent1() {
    this.name = 'parent1';
}
function Child1() {
    // 将父级构造函数的this指向子构造函数的this
    Parent1.call(this);    // apply 改变函数运行上下文
    this.type = 'child1';
}
var obj1 = new Child1();
console.log(obj1);
```

### 通信类

#### 什么是同源策略及限制
* 协议、域名、端口全部相同才是同源
* Cookie、localstorage、indexDB无法获取
* DOM无法获得
* Ajax请求不能发送（ajax只适合同源）

#### 前后端如何通信
* Ajax
* WebSocket（不受同源策略限制）
* CORS

#### 如何创建Ajax
* XMLHttpRequest对象的工作流程
* 兼容性处理（老版IE不支持XHR对象）
* 事件的触发事件
* 事件的触发顺序

#### 跨域通信的几种方式
* JSONP
* Hash
* postMessage
* WebSocket
* CORS

### 前端安全类

#### xss
* 基本概念和缩写：跨站脚本攻击（CROSS-SITE scripting）

* 攻击原理：

向页面注入脚本（script标签、img标签）

* 防范措施

让脚本不可执行

#### csrf
* 基本概念和缩写：跨站请求伪造（CROSS-SITE-REQUEST-FORGEY）

* 攻击原理：

用户登录A网站，服务器返回cookie，

访问网站B时，引诱点击，这个点击会是一个链接，

指向网站A的API接口（尤其当这个链接是get类型时）

访问A网站这个链接的时候，浏览器会自动上传cookie，

网站A确认身份发现是合法用户，就执行接口的动作  

* 防御措施

1. token验证（伪造的请求会自动携带cookie，不会自动携带token）
2. Referer验证（页面来源）
3. 隐藏令牌（和token类似，放在header上不在链接上）

### 前端算法类

#### 排序
1. 快速排序
2. 选择排序
3. 希尔排序
4. 冒泡排序

#### 堆栈、队列、链表

#### 递归
1. 什么时候调用
2. 传参

#### 波兰式和逆波兰式
1. 理论
2. 源码

## 二面（考察知识宽度、深度）
### 一、面试技巧
1. 知识面广
2. 知识体系的深度

### 二、浏览器渲染机制
#### 什么是doctype及作用
定义XML、HTML的文件类型，浏览器会根据它决定使用何种协议来解析

* HTML5：<!doctype html>
* HTML4.01：严格模式和传统模式

#### 浏览器是怎么渲染的
1. html ---> DOM Tree
2. css --- > CSSOM Tree
3. DOM Tree + CSSOM Tree 生成 render Tree
4. render Tree + layout

![](https://camo.githubusercontent.com/d972ca8ffd7b5a7f81a83d3b04f4b8b5e48547d3/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031372f31312f312f31626338643132386536323933376363343261353532393065393937383364383f696d61676556696577322f302f772f313238302f682f3936302f666f726d61742f776562702f69676e6f72652d6572726f722f31)

#### 重排reflow
DOM中各个元素都有自己的盒子，这些都需要浏览器根据各种样式计算并根据计算结果将元素放到它该出现的位置，这个过程称之为reflow

#### 重绘repaint
* 页面内容呈现在浏览器上

触发条件：
1. DOM改动
2. CSS改动

#### 布局layout
计算每一个DOM的位置，宽高 

### 三、JS运行机制
#### keywords：单线程、任务队列、同步、异步、事件循环

```js
// 同步任务和异步任务的优先顺序
console.log('A');
setTimeout(function () {
    console.log('B');
}, 0);
while (1) {

}
```

```js
// 异步事件的放入时间和执行时间
for (var i = 0; i < 4; i++) {
  setTimeout(function () {
      console.log(i);
  }, 1000);
}
```
#### JS的单线程

#### 什么是任务队列
* setTimeout、setInterval
* DOM事件
* Promise

#### Event Loop

### 四、页面性能
#### 题目：提升页面性能的方法有哪些？
1. 资源压缩合并（gzip压缩），减少HTTP请求
2. 非核心代码异步加载 ---> 异步加载的方式 ---> 异步加载的区别
3. 利用浏览器缓存 ---> 缓存的分类 ---> 缓存的原理
4. 使用CDN
5. 预解析DNS

```html
// DNS预解析
<link rel="dns-prefetch" href="//host_name_to_prefetch.com">

// https时，浏览器默认关闭a标签的预解析，通过下面这句话开启
<meta http-equiv="x-dns-prefetch-control" content="on">
```

#### 异步加载
1. 异步加载的方式
* 动态脚本加载（document.createElement）
* defer
* async

2. 异步加载的区别
* defer是在html解析完之后才会执行，如果是多个，按照加载的顺序依次执行
* async是在加载完之后立即执行，如果是多个，执行顺序和加载顺序无关

#### 浏览器缓存（强缓存、协商缓存）
1. 强缓存（绝对时间 Expires、相对时间 Cache-Control: max-age=3600）

2. 协商缓存
* Last-Modified（上次修改的时间，缺点：当修改时间变了，但内容没有变化的情况下）
* If-Modified-Since
* Etag
* If-None-Match

### 五、错误监控
#### 前端错误的分类
1. 即时运行错误：代码错误
2. 资源加载错误

#### 错误的捕获方式
1. 即时运行的捕获方式：try...catch、window.onerror
2. 资源加载错误： object.onerror、performance.getEntries()、Error事件捕获

* 图片、script标签的onerror事件
* performance.getEntries()获得资源的加载时间
* 捕获error（冒泡不行）

```js
window.addEventListener('error', function() {
    console.log('捕获', e);
}, true);
```

#### 跨域的js运行错误可以捕获吗，错误提示是什么？应该怎么处理？
可以拿到，但是没有相应的具体信息

1. 客户端：在script标签上增加crossorigin属性
2. 服务端：设置js资源响应头Access-Control-Allow-Origin: *

#### 上报错误的基本原理
1. 利用ajax通信的方式上报
2. 利用Image对象上报

```js
(new Image()).src = 'www.baidu.com/testjk?k=123';
```

### 六、MVVM框架
#### 相关问题
1. 了解MVVM框架吗
2. 谈谈你对MVVM的认识？
3. 双向数据绑定的原理，可以写出来吗
4. 使用了什么设计模式
5. 生命周期是什么？
6. 看过源码吗？

#### 了解MVVM框架吗
* M、V、VM
* Vue、Angular、React

#### MVC、MVP、MVVM的区别

#### 双向数据绑定原理
* data--->view：Object.defineProperty
* view--->data：input事件

```js
Object.defineProperty(obj, 'key', {
    enumerable: false,      // 是否可枚举(遍历)
    configurable: false,    // 是否可配置
    writable: false,        // 重新赋值
    value: 'static',
});
```

* Object.defineProperty和Reflect.defineProperty（返回一个boolean值）的区别

#### MVVM框架的设计模式 --- 观察者模式
Observer、Dep、Watcher

#### 生命周期
* beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed

#### 源码分析


## 三面
### 面试技巧
1. 准备充分
2. 描述要演练
3. 引导找时机

### 项目介绍

### 业务能力（工程）

### 团队协作能力

### 带人能力（优势）

## HR
### 面试技巧
### 职业竞争力
### 职业规划

## 真题解析
### css实现九宫格

### 阿里笔试题

### 函数和对象

### 算法题

## 提问环节
* 技术栈
* 项目有多少人
* 项目要做些什么
* 项目的前景
* 如果我进去了可能做什么
* 前端在这个项目的重要性
* 你们想要招个怎样的人
* 年终奖
* 加班时间及相关制度
* 离职率
* 公积金，社保的基数，公积金比例
* 公司或者部门未来的规划
* 对比其他公司的优势
