// 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
// 示例 1:
// 输入: s = "aba"
// 输出: true
// 示例 2:
// 输入: s = "abca"
// 输出: true
// 解释: 你可以删除c字符。
// 示例 3:
// 输入: s = "abc"
// 输出: false
function validPalindrome(s) {
  let i = 0,
    j = s.length - 1;
  while (i < j && s[i] === s[j]) {
    i++;
    j--;
  }
  function valid(start, end) {
    while (start < end) {
      if (s[start] !== s[end]) {
        return false;
      }
      start++;
      end--;
    }
    return true;
  }
  return valid(i, j - 1) || valid(i + 1, j);
}
console.log(validPalindrome("aba"));
console.log(validPalindrome("abca"));
console.log(validPalindrome("abc"));
console.log(validPalindrome("eeccccbebaeeabebccceea"));
console.log(validPalindrome("eedede"));
console.log(validPalindrome("deeee"));
