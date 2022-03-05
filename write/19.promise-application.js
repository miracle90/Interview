const MyPromise = require("./19.promise-resource");

MyPromise.resolve().then(res => {
  console.log('1 ', res);
  // return MyPromise.resolve(4);
}).then((res) => {
  console.log('2 ', res)
})

MyPromise.resolve().then(() => {
  console.log('3');
}).then(() => {
  console.log('4');
}).then(() => {
  console.log('5');
}).then(() => {
  console.log('6');
}).then(() =>{
  console.log('7');
})

// let p = new Promise(resolve => {
//   resolve(0);
// });
// var p2 = p.then(data => {
//   // 循环引用，自己等待自己完成，一辈子完不成
//   return p2;
// })


// // MyPromise.resolve().then(() => {
// //   console.log(0);
// //   return MyPromise.resolve(4);
// // }).then((res) => {
// //   console.log(res)
// // })

// // const promise = new MyPromise((resolve, reject) => {
// //   resolve(100)
// //   // reject('err')
// // })

// // promise
// //   .then()
// //   .then()
// //   .then()
// //   .then(value => console.log(value), reason => console.log(reason))

// const promise = new Promise((resolve, reject) => {
//   resolve("success");
//   // setTimeout(() => {
//     // 异步方法，then调用的时候，status还是pending，不往下处理
//     // resolve("success");
//   // }, 2000);
//   // throw new Error('执行器错误')
// });

// const p1 = promise.then(value => {
//   console.log('1')
//   console.log('resolve ', value)
//   // Promise.resolve('111111')
// })

// p1.then(
//   (value) => {
//     console.log(2)
//     console.log("resolve1", value);
//   },
//   (reason) => {
//     console.log(3)
//     console.log("reject1", reason);
//   }
// );

// // promise.then(
// //   (value) => {
// //     console.log(1)
// //     console.log("resolve2", value);
// //     throw new Error('then error')
// //   },
// //   (reason) => {
// //     console.log(2)
// //     console.log("reject2", reason);
// //   }
// // ).then(
// //   (value) => {
// //     console.log(3)
// //     console.log("resolve3", value);
// //   },
// //   (reason) => {
// //     console.log(4)
// //     console.log("reject3", reason);
// //   }
// // ).then(
// //   (value) => {
// //     console.log(5)
// //     console.log("resolve4", value);
// //   },
// //   (reason) => {
// //     console.log(6)
// //     console.log("reject4", reason);
// //   }
// // );

