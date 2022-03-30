// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回 滑动窗口中的最大值 。
// 示例 1：
// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]
// 解释：
// 滑动窗口的位置                最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7
//
// 示例 2：
// 输入：nums = [1], k = 1
// 输出：[1]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 维持队列的递减性：确保队头元素是当前滑动窗口的最大值。这样我们每次取最大值时，直接取队头元素即可。
// 这一步没啥好说的，就是在维持队列递减性的基础上、更新队列的内容。
// 维持队列的有效性：确保队列里所有的元素都在滑动窗口圈定的范围以内。
// 排除掉滑动窗口还没有初始化完成、第一个最大值还没有出现的特殊情况。
var maxSlidingWindow = function (nums, k) {
  const len = nums.length;
  const res = [];
  const queue = [];
  for (let i = 0; i < len; i++) {
    // 当队尾元素小于当前元素，移除，保证队列头部的值为最大
    while (queue.length && nums[queue[queue.length - 1]] < nums[i]) {
      queue.pop();
    }
    // 入队当前元素索引（注意是索引）
    queue.push(i);
    // 窗口滑动，把左侧的老数据删掉
    while (queue.length && i >= k + queue[0]) {
      queue.shift();
    }
    // 当凑够一个窗口长度时，后面每一次循环都把队头索引所在值push进结果数组
    if (i >= k - 1) {
      res.push(nums[queue[0]]);
    }
  }
  return res;
};
var nums1 = [1, 3, -1, -3, 5, 3, 6, 7],
  k1 = 3;
var nums2 = [1],
  k2 = 1;
var nums3 = [11, 9, 8, 7, 5, 3, 2],
  k3 = 3;
console.log(maxSlidingWindow(nums1, k1));
console.log(maxSlidingWindow(nums2, k2));
console.log(maxSlidingWindow(nums3, k3));
