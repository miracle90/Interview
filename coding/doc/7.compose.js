// compose是函数式编程中一个非常重要的函数，
// compose的函数作用就是组合函数的，将函数串联起来执行。
// 将多个函数组合起来，一个函数的输出结果是另一个函数的输入函数，
// 一旦第一个函数开始执行，就会像多米诺骨牌一样推导执行

const greeting = (name) => `hello ${name}`;
const toUpper = (str) => str.toUpperCase();
const addNumber = (str) => `${str}，老铁 666`;
const fn = compose(addNumber, toUpper, greeting);
console.log(fn("sunny"));

// 这就是compose的使用，主要有以下几点:
// compose参数就是函数，返回也是一个函数
// 除了第一个函数接收参数，其他函数接受的都是上一个函数的返回值
// 所以初始函数的参数是多元的，而其他函数的接收值是一元的
// compose函数可以接收任意的参数，所有的参数都是函数
// 且执行方向是自右向左的，初始函数一定到参数的最右面
function compose(...funcs) {
  const len = funcs.length;
  let curIndex = len - 1;
  let result = null;
  return function fn(...args) {
    result = funcs[curIndex].call(this, ...args);
    if (curIndex > 0) {
      curIndex--;
      return fn.call(null, result);
    } else {
      return result;
    }
  };
}
// 递归实现
// function compose(...funcs) {
//   let len = funcs.length,
//     curIndex = len - 1,
//     result;
//   // 首先compse 返回的是一个函数
//   return function fn(...args) {
//     // 函数体里就是不断执行args函数，将上一个函数的执行结果作为下一个执行函数的输入参数，
//     result = funcs[curIndex].apply(this, args);
//     // 递归边界
//     if (curIndex > 0) {
//       curIndex--;
//       // 递归
//       return fn.call(null, result);
//     } else {
//       return result;
//     }
//   };
// }
// 迭代实现
// function compose(...fns) {
//   let isFirst = true;
//   return (...args) => {
//     return fns.reduceRight((result, fn) => {
//       if (!isFirst) return fn(result);
//       isFirst = false;
//       return fn(...result);
//     }, args);
//   };
// }
