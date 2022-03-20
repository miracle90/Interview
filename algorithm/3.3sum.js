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

var threeSum = function (nums) {
  const result = [];
  // 先排序
  nums = nums.sort((a, b) => a - b);
  for (let x = 0; x < nums.length - 2; x++) {
    // 如果遇到重复的数字，则跳过
    if (nums[x] === nums[x - 1]) {
      continue;
    }
    let y = x + 1;
    z = nums.length - 1;
    while (y < z) {
      if (nums[x] + nums[y] + nums[z] < 0) {
        y++;
        while (nums[y] === nums[y - 1] && y - 1 > x) {
          y++;
        }
      } else if (nums[x] + nums[y] + nums[z] > 0) {
        z--;
        while (nums[z] === nums[z + 1]) {
          z--;
        }
      } else {
        result.push([nums[x], nums[y], nums[z]]);
        y++;
        z--;
        while (nums[y] === nums[y - 1]) {
          y++;
        }
        while (nums[z] === nums[z + 1]) {
          z--;
        }
      }
    }
  }
  return result;
};

var nums1 = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums1));

var nums2 = [];
console.log(threeSum(nums2));

var nums3 = [0];
console.log(threeSum(nums3));

var nums4 = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4];
console.log(threeSum(nums4));
// [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,0,1]]
// [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]
