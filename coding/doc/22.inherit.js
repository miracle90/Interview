/**
 * 原型继承
 * 缺点:
 * 父类构造函数中的引用类型（比如对象/数组），会被所有子类实例共享
 * 其中一个子类实例进行修改，会导致所有其他子类实例的这个值都会改变
 */
function Parent1() {
  this.hobbies = ['1', '2', '3'];
}
Parent1.prototype.getHobbies = function () {
  return this.hobbies;
};
function Child1() {}
Child1.prototype = new Parent1();
var child1 = new Child1();
child1.hobbies.push('4')
console.log(child1.getHobbies());
var child2 = new Child1();
console.log(child2.getHobbies());
/**
 * 构造函数继承
 * 优点：
 * 原型链继承中构造函数引用类型共享的问题，同时可以向构造函数传参（通过call传参）
 * 缺点：
 * 所有方法都定义在构造函数中，每次都需要重新创建
 * 对比原型链继承的方式，方法直接写在原型上，子类创建时不需要重新创建方法
 */
function Parent2() {
  this.hobbies = ["a"];
}
function Child2() {
  Parent2.call(this);
}
var child3 = new Child2();
child3.hobbies.push("b");
console.log(child3.hobbies);
var child4 = new Child2();
console.log(child4.hobbies);
/**
 * 组合继承
 * 优点：
 * 1、解决了构造函数引用类型的问题
 * 2、避免了方法会被创建多次的问题
 * 缺点：
 * 1、父类构造函数被调用了两次
 * 2、子类实例以及子类原型对象上存在多余属性的问题
 */
function Parent3() {
  this.hobbies = ["a"];
}
Parent3.prototype.getHobbies = function () {
  return this.hobbies;
};
function Child3() {
  Parent3.call(this);
}
Child3.prototype = new Parent3();
Child3.prototype.constructor = Child3; // 之前的构造函数被重写了，改回来
/**
 * 寄生组合继承
 * 优点：
 * 1、解决了组合继承中的构造函数调用两次
 * 2、构造函数引用类型共享
 * 3、原型对象上存在多余属性的问题
 */
function Parent4() {
  this.name = "parent4";
}
Parent4.prototype.getName = function () {
  return this.name;
};
function Child4() {
  Parent4.call(this);
}
inherit(Child4, Parent4);
function inherit(child, parent) {
  // 复制了一份父类的原型对象
  var prototype = object(parent.prototype);
  prototype.constructor = child; // 把 prototype 的 constructor 指向 Child
  child.prototype = prototype;
}
// 复制了一份父类的原型对象
function object(prototype) {
  function F() {}
  F.prototype = prototype;
  return new F();
}
