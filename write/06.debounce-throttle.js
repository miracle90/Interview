/**
 * 防抖
 * 原理：在时间被触发n秒之后再执行回调，如果在这n秒内又被触发，则重新计时
 * 适用场景：
 * 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
 * 搜索框联想场景：防止联想发送请求，只发送最后一次输入
 * @param {*} fn
 * @param {*} wait
 * @returns
 */
function debounce(fn, wait) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

window.addEventListener(
  "scroll",
  debounce(() => {
    console.log("debounce 滚动条");
  }, 1000)
);
/**
 * 节流
 * 原理： 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
 * 适用场景：
 * 拖拽场景：固定时间内只执行一次，防止高频次触发位置变动
 * 缩放场景：监控浏览器resize
 * @param {*} fn
 * @param {*} wait
 * @returns
 */
function throttle(fn, wait) {
  // 闭包
  let pervious = 0;
  let context, args;
  return function () {
    args = arguments;
    context = this;
    let now = +new Date();
    if (now - pervious > wait) {
      fn.apply(context, args);
      pervious = +new Date();
    }
  };
}
window.addEventListener(
  "scroll",
  throttle(() => {
    console.log("throttle 滚动条");
  }, 1000)
);
// 定时器实现
function throttleTimer(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
