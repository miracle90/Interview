// 定义三个常量表示状态
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
  // 成功之后的值
  value = undefined;
  // 失败之后的原因
  reason = undefined;

  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };
  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };
  then = (onFulfilled, onRejected) => {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        // 使用 queueMicrotask 创建一个微任务，等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
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
      // 判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });
    return promise2;
  };
  catch = (errCallback) => {
    return this.then(null, errCallback);
  };
  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }
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

Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    const res = [];
    let count = 0;
    const addData = (status, value, i) => {
      res[i] = {
        status,
        value,
      };
      count++;
      if (count === promises.length) {
        resolve(res);
      }
    };
    promises.forEach((promise, i) => {
      if (promise instanceof MyPromise) {
        promise.then(
          (res) => {
            addData("fulfilled", res, i);
          },
          (err) => {
            addData("rejected", err, i);
          }
        );
      } else {
        addData("fulfilled", promise, i);
      }
    });
  });
};

//race方法
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function (promises) {
  let arr = [];
  let i = 0;
  function processData(index, data) {
    arr[index] = data;
    i++;
    if (i == promises.length) {
      resolve(arr);
    }
  }
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        processData(i, data);
      }, reject);
    }
  });
};

// 首先，要看x是不是promise。
// 如果是promise，则取它的结果，作为新的promise2成功的结果
// 如果是普通值，直接作为promise2成功的结果
// 所以要比较x和promise2
// resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象）、resolve、reject
// resolve和reject是promise2的

// 这里要求判断 x 是否为 object 或者 function
// 满足则接着判断 x.then 是否存在，这里可以理解为判断 x 是否为 promise
// 这里都功能实际与我们手写版本中 x instanceof MyPromise 功能相似。
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  if (typeof x === "object" || typeof x === "function") {
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把x.then赋值给then
      then = x.then;
    } catch (error) {
      return reject(error);
    }

    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;
        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }

  // 判断x是不是 MyPromise 实例对象
  // if (x instanceof MyPromise) {
  //   // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
  //   // x.then(value => resolve(value), reason => reject(reason))
  //   // 简化之后
  //   x.then(resolve, reject);
  // } else {
  //   resolve(x);
  // }
}

// npm install promises-aplus-tests 用来测试自己的promise 符不符合promisesA+规范
// 目前是通过他测试 他会测试一个对象
// 语法糖
MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise;
