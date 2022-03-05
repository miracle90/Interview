/* patchVnode.js */

// 导入 vnode createELm
import createElm from "./createElm";
import updateChildren from "./updateChildren";

/**
 *
 * @param {vnode} oldVnode 老的虚拟节点
 * @param {vnode} newVnode 新的虚拟节点
 * @returns
 */
// 对比同一个虚拟节点
export default function patchVnode(oldVnode, newVnode) {
  // 1.判断是否相同对象
  console.log("同一个虚拟节点");
  if (oldVnode === newVnode) return;
  // 2.判断newVnode上有没有text
  // 这里为啥不考虑 oldVnode呢，因为 newVnode有text说明就没children
  if (newVnode.text && !newVnode.children) {
    // 判断是text否相同
    if (oldVnode.text !== newVnode.text) {
      console.log("文字不相同");
      // 不相同就直接把 newVnode中text 给 elm.textContent
      oldVnode.elm.textContent = newVnode.text;
    }
  } else {
    // 3.判断oldVnode有children, 这个时候newVnode 没有text但是有 children
    if (oldVnode.children) {
      // ...这里新旧节点都存在children 这里要使用 updateChildren 下面进行实现
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      console.log("old没有children，new有children");
      // oldVnode没有 children ,newVnode 有children
      // 这个时候oldVnode 只有text 我们把 newVnode 的children拿过来
      // 先清空 oldVnode 中text
      oldVnode.elm.innerHTML = "";
      // 遍历 newVnode 中的 children
      let newChildren = newVnode.children;
      for (let i = 0; i < newChildren.length; i++) {
        // 通过递归拿到了 newVnode 子节点
        let node = createElm(newChildren[i]);
        // 添加到 oldVnode.elm 中
        oldVnode.elm.appendChild(node);
      }
    }
  }
}
