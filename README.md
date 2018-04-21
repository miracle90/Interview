# Interview
```js
new Date()    // Sun Jan 28 2018 23:54:02 GMT+0800 (CST)
new Date()    // Mon Mar 05 2018 15:36:41 GMT+0800 (CST)
new Date()    // Wed Apr 11 2018 08:56:14 GMT+0800 (CST)
```

唐贞元三年，十六岁的白居易从江南来到京都长安，带着自己的诗稿去拜会名士顾况。  
顾况看到诗稿上白居易三个字后，开玩笑说：“长安米正贵，居住不容易啊！”。  
后来，顾况细细翻看白居易的诗稿，读到「离离原上草，一岁一枯荣。野火烧不尽，  
春风吹又生」的句子时，马上连声叫好：“好诗！文采如此，住下去又有什么难的。”  

独在异乡为异客，每涨房租倍思乡。  
家有良田数十亩，百平庭院炊烟升。  
若是来世走人间，但愿无德又无才。  
躬耕乡田过此生，不问前程与功名。

# 知识点整理
### 综合
* 从输入url到页面加载的过程
* web存储（session、cookie、sessionStorage、localStorage等）
* 浏览器缓存（强制缓存、协商缓存）
* 跨域
* 模块化（commonjs、requirejs、seajs、ES6的模块化、AMD、CMD等）
* web安全（XSS、CSRF）
* MVVM、MVC、MVP
* 算法相关（快排、二分法查找）
* 懒加载、预加载
* 前端注册登录流程
* 框架源码阅读
* Git

### Javascript
> [简答题系列](https://github.com/liyayun713/Interview/blob/master/js/js.md)
* JS有几种数据类型，其中基本数据类型有哪些？
* null和undefined的差异
* JS 的DOM 操作(Node节点获取及增删查改)
* 对数组 ['2018-03-05', '2013-06-12','2019-03-12','2018-03-05','2014-02-22'] 去重且排序
* 对数组[1,2,3,4,5,'6',7,'8','a','b','z']进行乱序
* JS 实现String.trim()方法

> 专题系列
* Ajax
* 数组去重、排序、乱序
* 深浅拷贝
* 作用域、this、call、apply、bind
* 原型、原型链、继承、__proto__、prototype


* 面向对象 vs 函数式编程
* 事件机制（Event Loop）、异步、同步、单线程、线程
* [闭包、js垃圾回收机制](https://github.com/liyayun713/Interview/blob/master/js/closure.md)
* 简述原型链、对象、构造函数之间的联系
* 函数柯里化
* 创建对象的几种方式
* new一个对象的4个步骤
* 数据类型的判断
* 常用js设计模式
* setTimeout、setInterval原理
* 事件冒泡、事件捕获
* 事件委托的原理
* navigator.userAgent
* JS浮点数精度问题
* DOM事件的target和currentTarget的区别
* 常用数组、字符串操作方法
* 几种获取元素距离、长度的方法
* 函数节流、防抖
* 手写一些常用的函数（debounce、assign、new、Object.create、promise、bind等）
* js发展史简述

### ES6
> [简答题系列](https://github.com/liyayun713/Interview/blob/master/js/es6.md)

> 专题系列

* let、const
* class
* 拓展运算符
* 解构赋值
* 异步、promise、async、wait等。。。
* 箭头函数
* 字符串模板
* 模块化（import、export）

### CSS
> [简答题系列](https://github.com/liyayun713/Interview/blob/master/css/css.md)
* CSS 有哪些样式可以给子元素继承
* 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些
* box-sizing常用的属性有哪些? 分别有啥作用?
* 清除浮动的方式有哪些？比较好的是哪一种？
* 样式权重的优先级

> 专题系列
* css实现一个三角线、扇形、正方体
* 各种居中方案
* repaint、reflow


* 各种经典布局（双飞翼、圣杯）
* Flex布局
* Grid布局
* BFC
* css3的新选择器
* css3新特性
* 动画（animation、transform、transition）
* 1px边框
* css开启硬件加速来提升性能
* SVG
* 雪碧图
* 图标字体
* px、em、rem、viewport对比
* less、sass、stylus区别
* @import 和 link 的区别

### HTML
> [简答题系列](https://github.com/liyayun713/Interview/blob/master/html/html.md)

> 专题系列
* html语义化
* HTML5新特性
* HTML5新标签
* SEO
* doctype
* 各种meta标签

### Vue
> [简答题系列](https://github.com/liyayun713/Interview/blob/master/vue/vue.md)

> 专题系列
* MVVM是什么
* 生命周期
* vuex的作用及原理
* vue-router的实现
* 父子组件通讯
* 源码考察（双向数据绑定，虚拟DOM）

### React
1. How Virtual-DOM and diffing works in React

### Webpack

### Babel

### 性能优化

### HTTP协议
* 谈谈你对 TCP 的理解
* HTTP 和 HTTPS 有何差异

### 浏览器相关
* 浏览器发展史
* 浏览器渲染过程

### 项目相关
* 项目部署
* 项目监控
* 错误处理
* 项目架构能力
* 业务能力
* 团队协作能力和带人能力

### 小程序

### Node.js

### 前端工程化

# 常见笔试题
[链接](https://github.com/liyayun713/Interview/blob/master/questions/common.md)










# 前端跳槽面试必备技巧

## 一面（基础知识）
### 一、 面试技巧
1. 准备充分
2. 知识系统
3. 沟通简洁
4. 回答灵活

### 二、 页面布局类
1. 三栏布局

* 题目：假设高度已知，请写出三栏布局，其中左栏、右栏宽度300px，中间自适应

> 浮动
```css

```

> 绝对定位

> flexbox

> 表格布局 display: table-cell

> 网格布局 Grid布局

### 三、 css盒模型

### 四、 DOM事件

### 五、 HTTP协议

### 六、 原型类

### 七、 面向对象类

### 八、 通信类
1. 跨域通信
2. 前后端通信

### 九、 前端安全类
1. xss
2. csrf

### 十、 前端算法类

## 二面（考察知识宽度、深度）
1. 面试技巧
2. 浏览器渲染机制
3. JS运行机制
4. 页面性能
5. 错误监控
6. MVVM框架
7. 双向绑定、设计模式等
……

## 三面
1. 面试技巧
2. 项目介绍
3. 业务能力（工程）
4. 团队协作能力
5. 带人能力（优势）
……

## HR
1. 面试技巧
2. 职业竞争力
3. 职业规划

## 真题解析
1. css实现九宫格
2. 阿里笔试题
3. 函数和对象
4. 算法题

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
