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

let str1 = "aba";
const res1 = validPalindrome(str1);
console.log(res1);

let str2 = "abca";
const res2 = validPalindrome(str2);
console.log(res2);

let str3 = "abc";
const res3 = validPalindrome(str3);
console.log(res3);

let str4 = "eeccccbebaeeabebccceea";
const res4 = validPalindrome(str4);
console.log(res4);

let str5 = "eedede";
const res5 = validPalindrome(str5);
console.log(res5);
function validPalindrome(s) {
  let i = 0,
    j = s.length - 1;
  while (s[i] === s[j] && i < j) {
    i++;
    j--;
  }
  if (i === j || i + 1 === j) {
    return true;
  }
  return isPalindrome(i + 1, j) || isPalindrome(i, j - 1);
  function isPalindrome(st, end) {
    console.log(s, st, end);
    while (s[st] === s[end] && st < end) {
      st++;
      end--;
    }
    if (st === end) {
      return true;
    }
    return false;
  }
}
