/**
 * 1、用setTimeout实现setInterval
 * 2、根据实施执行情况，动态调整setTimeout的delay
 * 3、支持参数接收 args
 * 4、支持清除定时器
 * 5、支持多个定时器
 * @param {*} callback
 * @param {*} delay
 * @param  {...any} args
 * @returns
 */
const globalTimerId = {};
function myInterval(callback, delay, ...args) {
  let offset = 0;
  let timerId = `${Math.random()}_${Date.now()}`;
  let startTime = Date.now();
  let realDelay = delay;
  let count = 1;
  const fn = () => {
    console.log("实际执行时间", Date.now() - startTime);
    callback(...args);
    // 时间偏差 = 当前时间 - 理论执行时间
    // 每执行一次，count + 1
    offset = Date.now() - (startTime + count++ * delay);
    realDelay = delay - offset;
    globalTimerId[timerId] = setTimeout(fn, Math.max(realDelay, 0));
  };
  globalTimerId[timerId] = setTimeout(fn, realDelay);
  // 记录timerId，方便清除定时器
  return timerId;
}
// 清除定时器方法
function myClearInterval(timerId) {
  clearTimeout(globalTimerId[timerId]);
}
function f1() {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  console.log(`${hours}:${minutes}:${seconds.toString().padStart("2", "0")}`);
}
const timer1 = myInterval(f1, 1000);
// const timer2 = myInterval(f1, 3000);
setTimeout(() => {
  myClearInterval(timer1);
}, 60000);
