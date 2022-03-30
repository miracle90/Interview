const nodeOps = {
  setTextContent(text) {
    if (platform === "weex") {
      node.parentNode.setAttr("value", text);
    } else if (platform === "web") {
      node.textContent = text;
    }
  },
  parentNode() {
    //......
  },
  removeChild() {
    //......
  },
  nextSibling() {
    //......
  },
  insertBefore() {
    //......
  },
};
// insert 用来在 parent 这个父节点下插入一个子节点，如果指定了 ref 则插入到 ref 这个子节点前面
function insert(parent, elm, ref) {
  if (parent) {
    if (ref) {
      if (ref.parentNode === parent) {
        nodeOps.insertBefore(parent, elm, ref);
      }
    } else {
      nodeOps.appendChild(parent, elm);
    }
  }
}
// createElm 用来新建一个节点， tag 存在创建一个标签节点，否则创建一个文本节点。
function createElm(vnode, parentElm, refElm) {
  if (vnode.tag) {
    insert(parentElm, nodeOps.createElement(vnode.tag), refElm);
  } else {
    insert(parentElm, nodeOps.createTextNode(vnode.text), refElm);
  }
}
// addVnodes 用来批量调用 createElm 新建节点。
function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createElm(vnodes[startIdx], parentElm, refElm);
  }
}
// removeNode 用来移除一个节点。
function removeNode(el) {
  const parent = nodeOps.parentNode(el);
  if (parent) {
    nodeOps.removeChild(parent, el);
  }
}
// removeVnodes 会批量调用 removeNode 移除节点。
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    if (ch) {
      removeNode(ch.elm);
    }
  }
}
// diff 算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式
// 所以时间复杂度只有 O(n)，是一种相当高效的算法
function patch(oldVnode, vnode, parentElm) {
  if (!oldVnode) {
    // 没有老节点，插入新节点
    addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
  } else if (!vnode) {
    // 没有新节点，删除老节点
    removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
  } else {
    // 如果是同一个节点，patchVnode
    if (sameVnode(oldVNode, vnode)) {
      patchVnode(oldVNode, vnode);
    } else {
      // 不是一个节点，删除老节点，新增新节点
      removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
      addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
    }
  }
}
// 什么情况下两个 VNode 会属于 sameVnode （相同的节点）呢？
function sameVnode() {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    !!a.data === !!b.data &&
    sameInputType(a, b)
  );
}
function sameInputType(a, b) {
  if (a.tag !== "input") return true;
  let i;
  const typeA = (i = a.data) && (i = i.attrs) && i.type;
  const typeB = (i = b.data) && (i = i.attrs) && i.type;
  return typeA === typeB;
}
/**
 * 核心方法
 * @param {*} oldVnode
 * @param {*} vnode
 * @returns
 */
function patchVnode(oldVnode, vnode) {
  // 新老 VNode 节点相同的情况下，就不需要做任何改变了，直接 return 掉
  if (oldVnode === vnode) {
    return;
  }
  // 在当新老 VNode 节点都是 isStatic（静态的），并且 key 相同时，
  // 只要将 componentInstance 与 elm 从老 VNode 节点“拿过来”即可。
  // 这里的 isStatic 也就是前面提到过的「编译」的时候会将静态节点标记出来，这样就可以跳过比对的过程。
  if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm;
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }
  const elm = (vnode.elm = oldVnode.elm);
  const oldCh = oldVnode.children;
  const ch = vnode.children;
  // 当新 VNode 节点是文本节点的时候，直接用 setTextContent 来设置 text
  if (vnode.text) {
    nodeOps.setTextContent(elm, vnode.text);
  } else {
    // oldCh 与 ch 都存在且不相同时，使用 updateChildren 函数来更新子节点
    if (oldCh && ch && oldCh !== ch) {
      updateChildren(elm, oldCh, ch);
    } else if (ch) {
      // 如果只有 ch 存在的时候
      // 如果老节点是文本节点则先将节点的文本清除
      if (oldVnode.text) nodeOps.setTextContent(elm, "");
      // 然后将 ch 批量插入到节点elm下。
      addVnodes(elm, null, ch, 0, ch.length - 1);
    } else if (oldCh) {
      // 同理当只有 oldch 存在时，说明需要将老节点通过 removeVnodes 全部清除
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    } else if (oldVnode.text) {
      // 最后一种情况是当只有老节点是文本节点的时候，清除其节点文本内容。
      nodeOps.setTextContent(elm, "");
    }
  }
}

function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx, idxInOld, elmToMove, refElm;

  // while 循环，在这过程中，oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 会逐渐向中间靠拢
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      nodeOps.insertBefore(
        parentElm,
        oldStartVnode.elm,
        nodeOps.nextSibling(oldEndVnode.elm)
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      let elmToMove = oldCh[idxInOld];
      if (!oldKeyToIdx)
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;
      // 当前newStartVnode在old还未遍历完的项目中，是否存在
      if (!idxInOld) {
        createElm(newStartVnode, parentElm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        if (sameVnode(elmToMove, newStartVnode)) {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          createElm(newStartVnode, parentElm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  }

  // 当 while 循环结束以后，如果 oldStartIdx > oldEndIdx，说明老节点比对完了
  // 但是新节点还有多的，需要将新节点插入到真实 DOM 中去，调用 addVnodes 将这些节点插入即可
  if (oldStartIdx > oldEndIdx) {
    refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    // 如果满足 newStartIdx > newEndIdx 条件，说明新节点比对完了，老节点还有多
    // 将这些无用的老节点通过 removeVnodes 批量删除即可。
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
