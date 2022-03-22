/**
 * 中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      // 往left方向遍历，逐个push进stack
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    // 实现左 中 右的顺序
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
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
console.log(inorderTraversal(root));
