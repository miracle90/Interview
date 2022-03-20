// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指在第 i 天之后，才会有更高的温度。
// 如果气温在这之后都不会升高，请在该位置用 0 来代替。
//
// 示例 1:
// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]
//
// 示例 2:
// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]
//
// 示例 3:
// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (T) {
  const len = T.length;
  const res = new Array(len).fill(0);
  const stack = [];
  for (let i = 0; i < len; i++) {
    // 当前的值大于栈顶的值
    // 每次都跟之前的值做一次比较
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      const popIndex = stack.pop();
      res[popIndex] = i - popIndex;
    }
    stack.push(i);
  }
  return res;
};
const temperatures1 = [73, 74, 75, 71, 69, 72, 76, 73];
const temperatures2 = [30, 40, 50, 60];
const temperatures3 = [30, 60, 90];
console.log(dailyTemperatures(temperatures1));
console.log(dailyTemperatures(temperatures2));
console.log(dailyTemperatures(temperatures3));

// 朴实解法
// var dailyTemperatures = function (temperatures) {
//   const res = [];
//   const len = temperatures.length;
//   for (let i = 0; i < len - 1; i++) {
//     const temp = temperatures[i];
//     let day = 1;
//     while (i + day <= len) {
//       if (temperatures[i + day] > temp) {
//         break;
//       } else {
//         day++;
//       }
//     }
//     res.push(day > len - i - 1 ? 0 : day);
//   }
//   // 最后一天肯定是0
//   res.push(0);
//   return res;
// };
