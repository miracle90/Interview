// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指在第 i 天之后，才会有更高的温度。如果气温在这之后都不会升高，请在该位置用 0 来代替。
// 示例 1:
// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]
// 示例 2:
// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]
// 示例 3:
// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const len = temperatures.length;
  const result = new Array(len).fill(0);
  const stack = [];
  for (let i = 0; i < len; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const pop = stack.pop();
      result[pop] = i - pop;
    }
    stack.push(i);
  }
  return result;
};

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
console.log(dailyTemperatures([30, 40, 50, 60]));
console.log(dailyTemperatures([30, 60, 90]));
console.log(dailyTemperatures([90, 60, 30, 10]));
