import createElm from "./createElm";
import patchVnode from "./patchVnode";
import sameVnode from "./sameVnode";

// 导出 updateChildren
/**
 *
 * @param {dom} parentElm 父节点
 * @param {array} oldCh 旧子节点
 * @param {array} newCh 新子节点
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  // 下面先来定义一下之前讲过的 diff 的几个指针 和 指针指向的 节点
  // 旧前 和 新前
  let oldStartIdx = 0,
    newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1; //旧后
  let newEndIdx = newCh.length - 1; //新后
  let oldStartVnode = oldCh[0]; //旧前 节点
  let oldEndVnode = oldCh[oldEndIdx]; //旧后节点
  let newStartVnode = newCh[0]; //新前节点
  let newEndVnode = newCh[newEndIdx]; //新后节点
  let keyMap = null; //用来做缓存
  // 写循环条件
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    console.log("---进入diff---");

    // 下面按照 diff 的4种策略来写 这里面还得调用 pathVnode
    // patchVnode 和 updateChildren 是互相调用的关系，不过这可不是死循环
    // 指针走完后就不调用了

    // 这一段都是为了忽视我们加过 undefined 节点，这些节点实际上已经移动了
    if (oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newCh[newStartIdx] == undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newCh[newEndIdx] == undefined) {
      newEndVnode = newCh[--newEndIdx];
    }
    // 忽视了所有的 undefined 我们这里来 判断四种diff优化策略
    // 1.新前 和 旧前
    else if (sameVnode(oldStartVnode, newStartVnode)) {
      console.log("1命中");
      // 调用 patchVnode 对比两个节点的 对象 文本 children
      patchVnode(oldStartVnode, newStartVnode);
      newStartVnode.elm = oldStartVnode.elm
      // 指针移动
      newStartVnode = newCh[++newStartIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } // 2.新后 和 旧后
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      console.log("2命中");
      // 调用 patchVnode 对比两个节点的 对象 文本 children
      patchVnode(oldEndVnode, newEndVnode);
      newEndVnode.elm = oldEndVnode.elm
      // 指针移动
      newEndVnode = newCh[--newEndIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } // 3.新后 和 旧前
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      console.log("3命中");
      // 调用 patchVnode 对比两个节点的 对象 文本 children
      patchVnode(oldStartVnode, newEndVnode);
      // 策略3是需要移动节点的 把旧前节点 移动到 旧后 之后
      // insertBefore 如果参照节点为空，就插入到最后 和 appendChild一样
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      newEndVnode.elm = oldStartVnode.elm
      // 指针移动
      newEndVnode = newCh[--newEndIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    }
    // 4.新前 和 旧后
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      console.log("4命中");
      // 调用 patchVnode 对比两个节点的 对象 文本 children
      patchVnode(oldEndVnode, newStartVnode);
      // 策略4是也需要移动节点的 把旧后节点 移动到 旧前 之前
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      newStartVnode.elm = oldEndVnode.elm
      // 指针移动
      newStartVnode = newCh[++newStartIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else {
      console.log("diff四种优化策略都没命中");
      // 当四种策略都没有命中
      // keyMap 为缓存，这样就不用每次都遍历老对象
      if (!keyMap) {
        // 初始化 keyMap
        keyMap = {};
        // 从oldStartIdx到oldEndIdx进行遍历
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          // 拿个每个子对象 的 key
          const key = oldCh[i].data ? oldCh[i].data.key : undefined;
          // 如果 key 存在， 添加到缓存中
          if (key) keyMap[key] = i;
        }
      }

      // 判断当前项是否存在 keyMap 中 ,当前项时 新前(newStartVnode)
      let idInOld = newStartVnode.data && newStartVnode.data.key
        ? keyMap[newStartVnode.data.key]
        : undefined;
      // let idInOld = keyMap[newStartIdx.data]
      //   ? keyMap[newStartIdx.data.key]
      //   : undefined;

      // 存在的话就是移动操作
      if (idInOld || idInOld === 0) {
        console.log("移动节点");
        // 从 老子节点 取出要移动的项
        let moveElm = oldCh[idInOld];
        // 调用 patchVnode 进行对比 修改
        patchVnode(moveElm, newStartVnode);
        // 将这一项设置为 undefined
        oldCh[idInOld] = undefined;
        // 移动 节点 ,对于存在的节点使用 insertBefore移动
        // 移动的 旧前 之前 ，因为 旧前 与 旧后 之间的要被删除
        newStartVnode.elm = moveElm.elm;
        parentElm.insertBefore(moveElm.elm, oldStartVnode.elm);
      } else {
        console.log("添加新节点");
        // 不存在就是要新增的项
        // 添加的节点还是虚拟节点要通过 createElm 进行创建 DOM
        // 同样添加到 旧前 之前
        parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
      }

      // 处理完上面的添加和移动 我们要 新前 指针继续向下走
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 我们添加和删除操作还没做呢
  // 首先来完成添加操作 新前 和 新后 中间是否还存在节点
  if (newStartIdx <= newEndIdx) {
    console.log("进入添加剩余节点");
    // 这是一个标识
    let beforeFlag = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    // new 里面还有剩余节点 遍历添加
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // newCh里面的子节点还需要 从虚拟DOM 转为 DOM
      parentElm.insertBefore(createElm(newCh[i]), beforeFlag);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log("进入删除多余节点");
    // old 里面还有剩余 节点 ,旧前 和 旧后 之间的节点需要删除
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      // 删除 剩余节点之前 先判断下是否存在
      if (oldCh[i] && oldCh[i].elm) parentElm.removeChild(oldCh[i].elm);
    }
  }
}
