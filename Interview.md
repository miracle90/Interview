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
> DOM事件的级别（没有DOM1）
1. DOM0 element.onclick = function() {}
2. DOM1 element.addEventListener('click', function() {}, false);（IE atachEvent）
3. DOM2 element.addEventListener('keyup', function() {}, false);（事件增加类型）

> DOM事件模型（冒泡、捕获）

> DOM事件流
* 捕获--目标阶段--冒泡

> 描述DOM事件捕获的具体流程
1. 从上到下，第一个接收的是 window--document--html--body
2. document.documentElement
3. document.body

> event对象的常见应用
* event.stopPropagation()阻止冒泡
* event.stopImmediatePropagation()事件响应优先级绑定多个事件时，阻止其他事件执行
* event.preventDefault()阻止默认事件
* event.target当前被点击的元素，可以用来事件委托
* event.currentTarget当前所绑定的事件，比如在父级元素上绑定的

> 自定义事件
* new Event()

```js
var eve = new Event('custom');
node.addEventListener('custom', function(){
  console.log('custom');
})
// 触发
node.dispatch(eve);
```

### 五、 HTTP协议
#### HTTP协议的主要特点
* 简单快速: 只要输入URI就可以了
* 灵活: 通过一个http协议就可以完成不同数据传输
* 无连接: 链接一次就会断开
* 无状态: 服务端无法区分客户端身份

#### HTTP报文的组成部分
* 请求报文：请求行、请求头、请求体、空行
* 响应报文：状态行、响应头、响应提、空行

> HTTP方法
> POST和GET方法
> HTTP状态码
> 什么是持久连接
> 什么是管线化

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
