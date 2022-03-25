// 使用JS实现一个repeat方法
// function repeat(fn, times, wait) {}
// const repeatFunc = repeat(alert, 4, 3000);
// 调用这个repeatFunc('Hello World')，会alert4次Hello World，每次间隔3秒
const repeatFunc = repeat(console.log, 4, 1000);
repeatFunc("Hello World");

function repeat(fn, times, wait) {
  return (message) => {
    fn(message);
    let interval = setInterval(() => {
      fn(message);
      if (--times === 1) clearInterval(interval);
    }, wait);
  };
}
