// 平衡二叉树（又称 AVL Tree）指的是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树。
// 平衡二叉树的出现，是为了降低二叉搜索树的查找时间复杂度。

// 给定一个二叉树，判断它是否是高度平衡的二叉树。
const isBalanced = function (root) {
  // 立一个flag，只要有一个高度差绝对值大于1，这个flag就会被置为false
  let flag = true;
  // 定义递归逻辑
  function dfs(root) {
    // 如果是空树，高度记为0；如果flag已经false了，那么就没必要往下走了，直接return
    if (!root || !flag) {
      return 0;
    }
    // 计算左子树的高度
    const left = dfs(root.left);
    // 计算右子树的高度
    const right = dfs(root.right);
    // 如果左右子树的高度差绝对值大于1，flag就破功了
    if (Math.abs(left - right) > 1) {
      flag = false;
      // 后面再发生什么已经不重要了，返回一个不影响回溯计算的值
      return 0;
    }
    // 返回当前子树的高度
    return Math.max(left, right) + 1;
  }

  // 递归入口
  dfs(root);
  // 返回flag的值
  return flag;
};

/**
 * 给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const balanceBST = function (root) {
  // 初始化中序遍历序列数组
  const nums = [];
  // 定义中序遍历二叉树，得到有序数组
  function inorder(root) {
    if (!root) {
      return;
    }
    inorder(root.left);
    nums.push(root.val);
    inorder(root.right);
  }

  function buildAVL(low, high) {
    // 若 low > high，则越界，说明当前索引范围对应的子树已经构建完毕
    if (low > high) {
      return null;
    }
    // 取数组的中间值作为根结点值
    const mid = Math.floor(low + (high - low) / 2);
    // 创造当前树的根结点
    const cur = new TreeNode(nums[mid]);
    // 构建左子树
    cur.left = buildAVL(low, mid - 1);
    // 构建右子树
    cur.right = buildAVL(mid + 1, high);
    // 返回当前树的根结点
    return cur;
  }
  // 调用中序遍历方法，求出 nums
  inorder(root);
  // 基于 nums，构造平衡二叉树
  return buildAVL(0, nums.length - 1);
};
