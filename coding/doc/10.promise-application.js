const MyPromise = require("./10.promise-resource");

// MyPromise.resolve()
//   .then(() => {
//     console.log(0);
//     return MyPromise.resolve(4);
//   })
//   .then((res) => {
//     console.log(res);
//   });

// const promise = new MyPromise((resolve, reject) => {
//   resolve("success");
//   // throw new Error('执行器错误')
// });

// // 第一个then方法中的错误要在第二个then方法中捕获到
// promise
//   .then(
//     (value) => {
//       console.log(1);
//       console.log("resolve", value);
//       throw new Error("throw error");
//     },
//     (reason) => {
//       console.log(2);
//       console.log(reason.message);
//     }
//   )
//   .then(
//     (value) => {
//       console.log(3);
//       console.log(value);
//     },
//     (reason) => {
//       console.log(4);
//       console.log(reason.message);
//     }
//   );

// const promise = new MyPromise((resolve, reject) => {
//   resolve("success");
// });

// // 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
// const p1 = promise.then((value) => {
//   console.log("resolve", value);
//   // 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
//   return p1;
// });

// console.log("p1", p1, p1 === promise);

// // 运行的时候会走reject

// p1.then(
//   (value) => {
//     console.log(2);
//     console.log("resolve", value);
//   },
//   (reason) => {
//     console.log(3);
//     console.log(reason.message);
//   }
// );
// const promise = new MyPromise((resolve, reject) => {
//   // resolve("666");
//   setTimeout(() => {
//     resolve("666");
//     // reject("999");
//   }, 1000);
// });
// promise.then(res => {
//   console.log('+++1')
// }).then(res => {
//   console.log('+++2')
// }).then(res => {
//   console.log('+++3')
// })
// promise.then(value => {
//   console.log('resolve1', value)
// }).then(res => {
//   console.log(9)
// })
// promise.then(value => {
//   console.log('resolve2', value)
// })
// promise.then(value => {
//   console.log('resolve3', value)
// })

// const promise = new MyPromise((resolve, reject) => {
//   resolve("success");
//   // throw new Error('执行器错误')
// });

// // 第一个then方法中的错误要在第二个then方法中捕获到
// promise
//   .then(
//     (value) => {
//       console.log("x", value);
//       throw new Error("then error");
//     },
//     (reason) => {
//       console.log('y');
//       console.log(reason.message);
//     }
//   )
//   .then(
//     (value) => {
//       console.log('m');
//       console.log(value);
//     },
//     (reason) => {
//       console.log('n');
//       console.log(reason.message);
//     }
//   );

MyPromise.resolve()
  .then(() => {
    console.log(0);
    return MyPromise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

// Js引擎为了让microtask尽快的输出，做了一些优化
// 连续的多个then(3个)如果没有reject或者resolve会交替执行then而不至于让一个堵太久完成用户无响应
// 不单单v8这样其他引擎也是这样，因为其实promise内部状态已经结束了。这块在v8源码里有完整的体现

MyPromise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
