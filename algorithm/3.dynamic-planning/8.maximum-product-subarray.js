// 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
// 测试用例的答案是一个 32-位 整数。
// 子数组 是数组的连续子序列。
// 示例 1:
// 输入: nums = [2,3,-2,4]
// 输出: 6
// 解释: 子数组 [2,3] 有最大乘积 6。
// 示例 2:
// 输入: nums = [-2,0,-1]
// 输出: 0
// 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let curMax = nums[0],
    curMin = nums[0],
    max = nums[0],
    length = nums.length;
  for (let i = 1; i < length; i++) {
    // 之前的最大值和最小值
    let prevMax = curMax,
      prevMin = curMin;
    // 存在负负得正、正负得负的情况，所以把之前的最大最小值和nums[i]做乘积和nums[i]比较
    curMax = Math.max(nums[i], prevMax * nums[i], prevMin * nums[i]);
    curMin = Math.min(nums[i], prevMax * nums[i], prevMin * nums[i]);
    // 每次得出的最大值和历史最大值比较
    max = Math.max(curMax, max);
  }
  return max;
};
console.log(maxProduct([2, 3, -2, 4]));
// console.log(maxProduct([-3, 3, 2, 3, -2, 4]));
