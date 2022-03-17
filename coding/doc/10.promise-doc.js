Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})

// Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
// Promise 会有三种状态：1、Pending 等待 2、Fulfilled 完成 3、Rejected 失败

// 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
// Promise 中使用 resolve 和 reject 两个函数来更改状态；
// then 方法内部做但事情就是状态判断

// 如果状态是成功，调用成功回调函数
// 如果状态是失败，调用失败回调函数

// 1、基础架构：class + executor + resolve + reject + then
// 2、异步操作
// 3、then方法多次调用，多次添加
// 4、实现链式调用
// 5、then方法链式调用识别Promise是否返回自己
// 6、捕获错误
// 7、参考 fulfilled 状态下的处理方式，对 rejected 和 pending 状态进行改造
// 8、then 中的参数变为可选


