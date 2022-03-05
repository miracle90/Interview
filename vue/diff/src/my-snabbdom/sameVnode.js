/**
 * 判断两个虚拟节点是否是同一节点
 * @param {vnode} vnode1 虚拟节点1
 * @param {vnode} vnode2 虚拟节点2
 * @returns boolean
 */
export default function sameVnode(vnode1, vnode2) {
  return (
    (vnode1.data ? vnode1.data.key : undefined) ===
      (vnode2.data ? vnode2.data.key : undefined) && vnode1.sel === vnode2.sel
  );
}
