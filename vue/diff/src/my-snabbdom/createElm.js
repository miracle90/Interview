/**
 * 创建元素
 * @param {vnode} vnode 要创建的节点
 */
export default function createElm(vnode) {
  // 拿出 新创建的 vnode 中的 sel
  let node = document.createElement(vnode.sel);
  // 存在子节点
  // 子节点是文本
  if (
    vnode.text !== "" &&
    (vnode.children === undefined || vnode.children.length === 0)
  ) {
    // 直接添加文字到 node 中
    node.textContent = vnode.text;
    // 子节点是数组
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    let children = vnode.children;
    // 遍历数组
    for (let i = 0; i < children.length; i++) {
      // 获取到每一个数组中的 子节点
      let ch = children[i];
      // 递归的方式 创建节点
      let chDom = createElm(ch);
      // 把子节点添加到 自己身上
      node.appendChild(chDom);
    }
  }
  // 更新vnode 中的 elm
  vnode.elm = node;
  // 返回 DOM
  return node;
}
