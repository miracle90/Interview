# CSS 简答题

### CSS 有哪些样式可以给子元素继承
* 可继承的: font-size, font-weight, line-height, color, cursor等

* 不可继承的一般是**会改变盒子模型**的: display, margin，border，padding，height等

### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些
* 行内: input，span，a，img，display: inline的元素
* 块级: p，div，header，footer，aside，article，ul 以及 display: block这些
* void: br，hr

### box-sizing常用的属性有哪些? 分别有啥作用?
* content-box(W3C标准盒模型)
> content-box的计算公式会把宽高的定义指向 content
> border和 padding 另外计算

* border-box(怪异模型)
> border-box的计算公式是总的大小涵盖这三者，content 会缩小，来让给另外两者

### 清除浮动的方式有哪些？比较好的是哪一种？
常用的一般为三种 `.clearfix`，`clear: both`，`overflow: hidden`


