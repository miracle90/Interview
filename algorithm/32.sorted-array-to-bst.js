/**
 * 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
 * @param {number[]} nums
 * @return {TreeNode}
 */
 const sortedArrayToBST = function (nums) {
  // 处理边界条件
  if (!nums.length) {
    return null;
  }

  // root 结点是递归“提”起数组的结果
  const root = buildBST(0, nums.length - 1);

  // 定义二叉树构建函数，入参是子序列的索引范围
  function buildBST(low, high) {
    // 当 low > high 时，意味着当前范围的数字已经被递归处理完全了
    if (low > high) {
      return null;
    }
    // 二分一下，取出当前子序列的中间元素
    const mid = Math.floor(low + (high - low) / 2);
    // 将中间元素的值作为当前子树的根结点值
    const cur = new TreeNode(nums[mid]);
    // 递归构建左子树，范围二分为[low,mid)
    cur.left = buildBST(low, mid - 1);
    // 递归构建左子树，范围二分为为(mid,high]
    cur.right = buildBST(mid + 1, high);
    // 返回当前结点
    return cur;
  }
  // 返回根结点
  return root;
};
