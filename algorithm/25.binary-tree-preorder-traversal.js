// 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
// 示例 1：
// 输入：root = [1,null,2,3]
// 输出：[1,2,3]
// 示例 2：
// 输入：root = []
// 输出：[]
// 示例 3：
// 输入：root = [1]
// 输出：[1]
// 示例 4：
// 输入：root = [1,2]
// 输出：[1,2]
// 示例 5：
// 输入：root = [1,null,2]
// 输出：[1,2]
//
// 进阶：递归算法很简单，你可以通过迭代算法完成吗？
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    res.push(cur.val);
    if (cur.right) {
      stack.push(cur.right);
    }
    // 后进先出，先序遍历，left放后面
    if (cur.left) {
      stack.push(cur.left);
    }
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

console.log(preorderTraversal(root));
