// 导入 vnode
import vnode from "./vnode";
import createElm from "./createElm";
import patchVnode from './patchVnode'
import sameVnode from "./sameVnode";

// 导出 patch
/**
 *
 * @param {vnode/DOM} oldVnode
 * @param {vnode} newVnode
 */
export default function patch(oldVnode, newVnode) {
  // 1.判断oldVnode 是否为虚拟 DOM 这里判断是否有 sel
  if (!oldVnode.sel) {
    // 转为虚拟DOM
    oldVnode = emptyNodeAt(oldVnode);
  }
  // 判断 oldVnode 和 newVnode 是否为同一虚拟节点
  // 通过 key 和 sel 进行判断
  if (sameVnode(oldVnode, newVnode)) {
    // 是同一个虚拟节点 调用我们写的 patchVnode.js 中的方法
    patchVnode(oldVnode, newVnode)
  } else {
    // 不是同一虚拟个节点 直接暴力拆掉老节点，换上新的节点
    // 这里通过 createElm 递归 转为 真实的 DOM 节点
    let newNode = createElm(newVnode);
    // 旧节点的父节点
    if (oldVnode.elm.parentNode) {
      let parentNode = oldVnode.elm.parentNode;
      // 添加节点到真实的DOM 上
      parentNode.insertBefore(newNode, oldVnode.elm);
      // 删除旧节点
      parentNode.removeChild(oldVnode.elm);
    }
  }
  newVnode.elm = oldVnode.elm;

  console.log('+++++++++++++++ ', newVnode)

  // 返回newVnode作为 旧的虚拟节点
  return newVnode;
}

/**
 * 转为 虚拟 DOM
 * @param {DOM} elm DOM节点
 * @returns {object}
 */
function emptyNodeAt(elm) {
  // 把 sel 和 elm 传入 vnode 并返回
  // 这里主要选择器给转小写返回vnode
  // 这里功能做的简陋，没有去解析 # .
  // data 也可以传 ID 和 class
  return vnode(elm.tagName.toLowerCase(), undefined, undefined, undefined, elm);
}
