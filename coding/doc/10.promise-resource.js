/**
 * 手写promise，并且实现其相关api
 * Promise.all
 * Promise.allSettled
 * Promise.race
 * ...
 * Promise 写完之后可以通过 promises-aplus-tests
 * 这个包对我们写的代码进行测试，看是否符合 A+ 规范
 * @param {*} excutor
 */

// 1. Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
// 2. Promise 会有三种状态

// Pending 等待
// Fulfilled 完成
// Rejected 失败

// 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
// Promise 中使用 resolve 和 reject 两个函数来更改状态；
// then 方法内部做但事情就是状态判断

// 如果状态是成功，调用成功回调函数
// 如果状态是失败，调用失败回调函数

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      // executor 是一个执行器，进入会立即执行
      // 并传入resolve和reject方法
      executor(this.resolve, this.reject);
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error);
    }
  }
  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;
  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];
  // 更改成功后的状态
  resolve = (value) => {
    console.log("resolve", value, this.onFulfilledCallbacks.length);
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // 判断成功回调是否存在，如果存在就调用
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };
  // 更改失败后的状态
  reject = (reason) => {
    console.log("reject");
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // 判断失败回调是否存在，如果存在就调用
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };
  // then 方法要链式调用那么就需要返回一个 Promise 对象
  // then 方法里面 return 一个返回值作为下一个 then 方法的参数
  // 如果是 return 一个 Promise 对象，那么就需要判断它的状态
  then(onFulfilled, onRejected) {
    console.log("then", this.status);
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        try {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        // 如果then执行的时候，还是pending状态
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    });
    // 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  console.log(promise2 === x, x instanceof MyPromise);
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

module.exports = MyPromise;
