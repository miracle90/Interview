// 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
// 示例 1：
// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[9,20],[15,7]]
// 示例 2：
// 输入：root = [1]
// 输出：[[1]]
// 示例 3：
// 输入：root = []
// 输出：[]
/**
 * 层序遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const queue = [];
  queue.push(root);
  while (queue.length) {
    // while每循环一次，就是遍历了一层
    const len = queue.length;
    const level = [];
    for (let i = 0; i < len; i++) {
      // 取队头的元素
      const top = queue.shift();
      level.push(top.val);
      if (top.left) {
        queue.push(top.left);
      }
      if (top.right) {
        queue.push(top.right);
      }
    }
    res.push(level);
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
      left: {
        val: 9,
      },
    },
  },
  right: {
    val: "C",
    right: {
      val: "F",
    },
  },
};
console.log(levelOrder(root));
