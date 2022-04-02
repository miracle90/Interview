// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
// 示例 1：
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 示例 2：
// 输入：nums = []
// 输出：[]
// 示例 3：
// 输入：nums = [0]
// 输出：[]
//
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums = nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      if (nums[i] + nums[j] + nums[k] > 0) {
        k--;
      } else if (nums[i] + nums[j] + nums[k] < 0) {
        j++;
      } else {
        result.push([nums[i], nums[j], nums[k]]);
        j++;
        k--;
      }
      while (nums[j] === nums[j - 1] && j > i + 1) {
        j++;
      }
      while (nums[k] === nums[k + 1]) {
        k--;
      }
    }
  }
  return result;
};
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(threeSum([]));
console.log(threeSum([0]));
console.log(threeSum([-2, 0, 0, 2, 2]));
