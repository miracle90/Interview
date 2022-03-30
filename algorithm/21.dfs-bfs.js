// 所有遍历函数的入参都是树的根结点对象
function DFS(root) {
  // 递归边界，root 为空
  if (!root) {
    return;
  }
  // 输出当前遍历的结点值
  console.log("当前遍历的结点值是：", root.val);
  // 递归遍历左子树
  DFS(root.left);
  // 递归遍历右子树
  DFS(root.right);
}
function BFS(root) {
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const top = queue[0];
    console.log("当前遍历的结点值是：", top.val);
    // 操作top
    if (top.left) {
      queue.push(top.left);
    }
    if (top.right) {
      queue.push(top.right);
    }
    queue.shift();
  }
}
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
DFS(root);
console.log("-------------------");
BFS(root);
