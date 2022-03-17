// 详细说明 https://www.zhihu.com/question/453677175
const MyPromise = require("./10.promise-resource");

MyPromise.resolve() // MyPromise.resolve() 返回 「Promise { undefined }」。
  .then(() => {
    console.log(0);
    // MyPromise 产生了 2 次微任务
    return MyPromise.resolve(4);
    // x.then(resolve, reject);
  })
  .then((res) => {
    console.log(res);
  });
// 第二个 then 发现 promise0 还在 pending，因此不能直接 enqueue 新任务
// 而是将包含 console.log(res) 回调追加到 promise0 的 PromiseFulfillReactions 列表尾部
// 并返回新的「Promise { <pending> }」（设为 promiseRes）（该返回值在代码中被丢弃，但不影响整个过程）

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

// v8源码
// 简单说，就是创建 NewPromiseResolveThenableJob，多了一个 microtask
// 运行 NewPromiseResolveThenableJob 又多了一个 microtask
// 这两个 microtask 不执行 JS 代码。
