const urls = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
];
function concurrentRequest(requestList, limit) {
  const total = requestList.length;
  const result = new Array(total);
  // 当前请求的索引，要小于请求总数
  // 当前正在请求状态的个数，要小于并发限制数量
  let curIndex = 0;
  let currentNum = 0;
  return new Promise((resolve, reject) => {
    while (curIndex < limit) {
      next()
    }
    function next() {
      if (curIndex < total && currentNum < limit) {
        const options = {
          url: requestList[curIndex],
          index: curIndex,
        };
        // 请求之前，将两个索引++
        currentNum++
        curIndex++;
        request(options.url).then((value) => {
          // 请求回来，当前正在请求状态的个数--
          currentNum--;
          // 递归调用
          next();
          result[options.index] = value;
          // 如果全部完成，resolve
          const finishedNum = result.filter((item) => item).length;
          if (finishedNum === total) {
            resolve(result);
          }
        });
      }
    }
  });
}
// 模拟请求
function request(options) {
  const randomWait = Math.ceil(Math.random() * 3) * 1000;
  return new Promise((resolve, reject) => {
    console.log(`${options} 开始请求 ${randomWait}`);
    setTimeout(() => {
      console.log(`${options} 请求完成`);
      resolve(Date.now());
    }, randomWait);
  });
}
(async function () {
  const result = await concurrentRequest(urls, 3);
  console.log("结果", result);
})();
