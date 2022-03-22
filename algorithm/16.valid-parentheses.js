// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

// 示例 1：
// 输入：s = "()"
// 输出：true

// 示例 2：
// 输入：s = "()[]{}"
// 输出：true

// 示例 3：
// 输入：s = "(]"
// 输出：false

// 示例 4：
// 输入：s = "([)]"
// 输出：false

// 示例 5：
// 输入：s = "{[]}"
// 输出：true

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (!s.length) return true;
  const obj = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const k = s[i];
    if (k === "{" || k === "[" || k === "(") {
      stack.push(obj[k]);
    } else {
      // 如果是右括号
      // 如果栈为空，或者不等于栈顶元素，return false
      if (!stack.length || stack.pop() !== k) {
        return false;
      }
    }
  }
  return !stack.length;
};

const s1 = "()";
const s2 = "()[]{}";
const s3 = "(]";
const s4 = "([)]";
const s5 = "{[]}";
console.log(isValid(s1));
console.log(isValid(s2));
console.log(isValid(s3));
console.log(isValid(s4));
console.log(isValid(s5));
