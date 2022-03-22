// 树的定义总是以递归的形式出现，二叉搜索树也不例外，它的递归定义如下：
// 1、是一棵空树
// 2、是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域
// 满足以上两个条件之一的二叉树，就是二叉搜索树。

function search(root, n) {
  // 若 root 为空，查找失败，直接返回
  if (!root) {
    return;
  }
  // 找到目标结点，输出结点对象
  if (root.val === n) {
    console.log("目标结点是：", root);
  } else if (root.val > n) {
    // 当前结点数据域大于n，向左查找
    search(root.left, n);
  } else {
    // 当前结点数据域小于n，向右查找
    search(root.right, n);
  }
}

function insertIntoBST(root, n) {
  // 若 root 为空，说明当前是一个可以插入的空位
  if (!root) {
    // 用一个值为n的结点占据这个空位
    root = new TreeNode(n);
    return root;
  }

  if (root.val > n) {
    // 当前结点数据域大于n，向左查找
    root.left = insertIntoBST(root.left, n);
  } else {
    // 当前结点数据域小于n，向右查找
    root.right = insertIntoBST(root.right, n);
  }

  // 返回插入后二叉搜索树的根结点
  return root;
}

/**
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
  // 定义递归函数
  function dfs(root, minValue, maxValue) {
    // 若是空树，则合法
    if (!root) {
      return true;
    }
    // 若右孩子不大于根结点值，或者左孩子不小于根结点值，则不合法
    if (root.val <= minValue || root.val >= maxValue) return false;
    // 左右子树必须都符合二叉搜索树的数据域大小关系
    return (
      dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
    );
  }
  // 初始化最小值和最大值为极小或极大
  return dfs(root, -Infinity, Infinity);
};
