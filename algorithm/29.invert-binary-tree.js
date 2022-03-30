// 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
// 示例 1：
// 输入：root = [4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]
// 示例 2：
// 输入：root = [2,1,3]
// 输出：[2,3,1]
// 示例 3：
// 输入：root = []
// 输出：[]
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function (root) {
  if (!root) {
    return null;
  }
  // 递归
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  // 交换
  root.left = right;
  root.right = left;
  return root;
};
const r = {
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
console.log(invertTree(r));
