// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
// 实现 MinStack 类:
// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。
// 示例 1:
// 输入：
// ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]
// 输出：
// [null,null,null,null,-3,null,0,-2]
// 解释：
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.getMin();   --> 返回 -2.
var MinStack = function () {
  this.stack = [];
  this.stack2 = []; // stack2就是用来记录最小值的
};
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  // 如果stack2中没有值，或者栈顶元素大于等于val，push到stack2
  if (!this.stack2.length || this.stack2[this.stack2.length - 1] >= val) {
    this.stack2.push(val);
  }
};
MinStack.prototype.pop = function () {
  const val = this.stack.pop();
  if (this.stack2[this.stack2.length - 1] === val) {
    this.stack2.pop();
  }
};
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};
MinStack.prototype.getMin = function () {
  return this.stack2[this.stack2.length - 1];
};
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // --> 返回 -3.
minStack.pop();
console.log(minStack.top()); // --> 返回 0.
console.log(minStack.getMin()); // --> 返回 -2.
