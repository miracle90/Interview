/**
 * 后序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    // 后序遍历，使用unshift到结果数组
    res.unshift(cur.val);
    // 后进先出，后序遍历，left放前面
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }
  return res
};
const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D",
    },
    right: {
      val: "E",
    },
  },
  right: {
    val: "C",
    right: {
      val: "F",
    },
  },
};
console.log(postorderTraversal(root));
