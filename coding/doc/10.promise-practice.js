const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error);
    }
  }
  status = PENDING;
  value = null;
  reason = null;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value; // 透传，直接返回value
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    console.log("+++then", this.status);
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            console.log("x", x);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      if (this.status === FULFILLED) {
        // 我们必须要等 promise2 完成初始化
        // 这个时候我们就要用上宏微任务和事件循环的知识了
        // 这里就需要创建一个异步函数去等待 promise2 完成初始化
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        // 针对异步任务，then触发的时候，状态还是pending，先保存起来
        // then方法多次调用，添加多个
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });
    return promise2;
  }
  resolve = (value) => {
    console.log("+++resolve", value);
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // 针对异步任务，then触发的时候，resolve还未执行，把之前then保存的方法依次执行
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(this.value);
      }
    }
  };
  reject = (reason) => {
    console.log("+++reject", reason);
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      // 针对异步任务，then触发的时候，reject还未执行，把之前then保存的方法依次执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(this.reason);
      }
    }
  };
  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    // 转成常规方式
    return new MyPromise((resolve) => {
      resolve(parameter);
    });
  }
  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法
    // 目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }

  // if (typeof x === "object" || typeof x === "function") {
  //   // x 为 null 直接返回，走后面的逻辑会报错
  //   if (x === null) {
  //     return resolve(x);
  //   }

  //   let then;
  //   try {
  //     // 把 x.then 赋值给 then
  //     then = x.then;
  //   } catch (error) {
  //     // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
  //     return reject(error);
  //   }

  //   // 如果 then 是函数
  //   if (typeof then === "function") {
  //     let called = false;
  //     try {
  //       then.call(
  //         x, // this 指向 x
  //         // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
  //         (y) => {
  //           // 如果 resolvePromise 和 rejectPromise 均被调用，
  //           // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
  //           // 实现这条需要前面加一个变量 called
  //           if (called) return;
  //           called = true;
  //           resolvePromise(promise, y, resolve, reject);
  //         },
  //         // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
  //         (r) => {
  //           if (called) return;
  //           called = true;
  //           reject(r);
  //         }
  //       );
  //     } catch (error) {
  //       // 如果调用 then 方法抛出了异常 error：
  //       // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
  //       if (called) return;

  //       // 否则以 error 为据因拒绝 promise
  //       reject(error);
  //     }
  //   } else {
  //     // 如果 then 不是函数，以 x 为参数执行 promise
  //     resolve(x);
  //   }
  // } else {
  //   // 如果 x 不为对象或者函数，以 x 为参数执行 promise
  //   resolve(x);
  // }
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise;
