const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  status = PENDING;
  value = null;
  reason = null;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  then(onFulfilled, onRejected) {
    console.log("then+++", this.status);
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            console.log("X", x);
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
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });
    return promise2;
  }
  resolve = (value) => {
    console.log("resolve+++", value, this.status);
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };
  reject = (reason) => {
    console.log("reject", this.status);
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };
  static resolve(param) {
    console.log("static resolve");
    if (param instanceof MyPromise) {
      return param;
    }
    return new MyPromise((resolve) => {
      resolve(param);
    });
  }
  static reject(param) {
    return new MyPromise((resolve, reject) => {
      reject(param);
    });
  }
  static all(promiseArr) {
    const result = [];
    const count = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        // 有的数组项有可能不是Promise，需要 Promise.resolve() 手动转化
        MyPromise.resolve(promiseArr[i]).then(
          (value) => {
            count++;
            result[i] = value;
            if (count === promiseArr.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        MyPromise.resolve(promiseArr[i]).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
  static allSettled(promiseArr) {
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        MyPromise.resolve(promiseArr[i])
          .then((value) => {
            result.push({
              type: "fulfilled",
              value,
            });
          })
          .catch((reason) => {
            result.push({
              type: "reason",
              reason,
            });
          })
          .finally(() => {
            if (++count === promiseArr.length) {
              resolve(result);
            }
          });
      }
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  console.log("resolvePromise", promise2 === x, x instanceof MyPromise);
  if (promise2 === x) {
    return reject(new TypeError("循环引用"));
  }
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject);
  } else {
    // 普通纸，直接resolve
    resolve(x);
  }
}

module.exports = MyPromise;
