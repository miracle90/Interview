// 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
// 例如，121 是回文，而 123 不是。
//
// 示例 1：
// 输入：x = 121
// 输出：true

// 示例 2：
// 输入：x = -121
// 输出：false
// 解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

// 示例 3：
// 输入：x = 10
// 输出：false
// 解释：从右向左读, 为 01 。因此它不是一个回文数。

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  x = x + "";
  let i = 0,
    j = x.length - 1;
  while (i < j) {
    if (x[i] !== x[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};

// 使用 toString + split + reverse + join
// var isPalindrome = function (x) {
//   return x.toString() == x.toString().split("").reverse().join('')
// };

console.log(isPalindrome(121));
console.log(isPalindrome(10));
console.log(isPalindrome(-121));
