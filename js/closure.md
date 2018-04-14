# 闭包
#### Keywords：执行上下文、执行上下文栈、作用域链、垃圾回收机制、内存泄漏

## 定义

* 垃圾回收机制

> 在javascript中，如果一个对象不再被引用，那么这个对象就会被垃圾回收机制回收
> 如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收

* MDN定义的闭包

闭包是指那些能够访问自由变量的函数

MDN 上面这么说：闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。

闭包的作用域链包含着它自己的作用域，以及包含它的函数的作用域和全局作用域。

* 那么什么是自由变量？

自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量

如果一个变量的引用不为0，那么他不会被垃圾回收机制回收

## 原理

## 闭包的应用
1. 可以读取函数内部的变量

2. 让变量的值始终保持在内存中。

3. 应用闭包的主要场合是：设计私有的方法和变量。

4. 一个闭包计数器

## 闭包的注意点
1. 通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。但是，在创建了一个闭包以后，这个函数的作用域就会一直保存到闭包不存在为止。

最后通过 null 释放闭包

## 闭包的缺陷
1. 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除

2. 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值

3. 闭包的缺点就是常驻内存会增大内存使用量，并且使用不当很容易造成内存泄露。

4. 如果不是因为某些特殊任务而需要闭包，在没有必要的情况下，在其它函数中创建函数是不明智的，因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。

## 闭包面试题
1.
```js
function fun(n,o){
  console.log(o);
  return {
    fun: function(m){
      return fun(m,n);
    }
  };
}

var a = fun(0);  // ?
a.fun(1);        // ?        
a.fun(2);        // ?
a.fun(3);        // ?

var b = fun(0).fun(1).fun(2).fun(3);  // ?

var c = fun(0).fun(1);  // ?
c.fun(2);        // ?
c.fun(3); 
```