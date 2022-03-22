function deleteNode(root, n) {
  // 如果没找到目标结点，则直接返回
  if (!root) {
    return root;
  }
  // 定位到目标结点，开始分情况处理删除动作
  if (root.val === n) {
    // 若是叶子结点，则不需要想太多，直接删除
    if (!root.left && !root.right) {
      root = null;
    } else if (root.left) {
      // 寻找左子树里值最大的结点
      const maxLeft = findMax(root.left);
      // 用这个 maxLeft 覆盖掉需要删除的当前结点
      root.val = maxLeft.val;
      // 覆盖动作会消耗掉原有的 maxLeft 结点
      root.left = deleteNode(root.left, maxLeft.val);
    } else {
      // 寻找右子树里值最小的结点
      const minRight = findMin(root.right);
      // 用这个 minRight 覆盖掉需要删除的当前结点
      root.val = minRight.val;
      // 覆盖动作会消耗掉原有的 minRight 结点
      root.right = deleteNode(root.right, minRight.val);
    }
  } else if (root.val > n) {
    // 若当前结点的值比 n 大，则在左子树中继续寻找目标结点
    root.left = deleteNode(root.left, n);
  } else {
    // 若当前结点的值比 n 小，则在右子树中继续寻找目标结点
    root.right = deleteNode(root.right, n);
  }
  return root;
}
// 寻找左子树最大值
function findMax(root) {
  while (root.right) {
    root = root.right;
  }
  return root;
}
// 寻找右子树的最小值
function findMin(root) {
  while (root.left) {
    root = root.left;
  }
  return root;
}
