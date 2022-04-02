// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
//
// 示例 1：
// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
//
// 示例 2：
// 输入：nums = [0,1,0,3,2,3]
// 输出：4
//
// 示例 3：
// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1
// 进阶：
// 你能将算法的时间复杂度降低到 O(n log(n)) 吗?
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const len = nums.length;
  if (len === 0) return 0;
  const dp = new Array(len).fill(1);
  let maxLength = 1;
  for (let i = 1; i < len; i++) {
    // 每遍历一个新元素，都要“回头看”，看看能不能延长原有的上升子序列
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // 若遇到了一个比当前元素小的值，则意味着遇到了一个可以延长的上升子序列，故更新当前元素索引位对应的状态
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    if (dp[i] > maxLength) {
      maxLength = dp[i];
    }
  }
  return maxLength;
};
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7]));
