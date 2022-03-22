// 给你一个字符串 s，找到 s 中最长的回文子串。
// 示例 1：
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：
// 输入：s = "cbbd"
// 输出："bb"
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const dp = [];
  const len = s.length;
  // 初始化二维数组
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len).fill(0)
  }
  // 初始化两个端点值
  let start = (end = 0);
  for (let i = 0; i < len; i++) {
    dp[i][i] = 1;
  }
  // 为了降低复杂度，对 s[i][i+1] 做处理
  for (let i = 0; i < len; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = 1;
      start = i;
      end = i + 1;
    }
  }
  console.log(dp)
  // l代表子串的长度，从3开始递增
  for (let l = 3; l <= len; l++) {
    for (let i = 0; i <= len - l; i++) {
      let j = i + l - 1;
      if (dp[i + 1][j - 1]) {
        if (s[i] === s[j]) {
          dp[i][j] = 1;
          start = i;
          end = j;
        }
      }
    }
  }
  return s.substring(start, end + 1);
};
console.log(longestPalindrome("sssass"));
