/* h.js */

// 导入 vnode
import vnode from "./vnode";

// export declare function h(sel: string): VNode;
// export declare function h(sel: string, data: VNodeData): VNode;
// export declare function h(sel: string, children: VNodeChildren): VNode;
// export declare function h(sel: string, data: VNodeData, children: VNodeChildren): VNode;

// 导出 h 方法
// 这里就实现简单3个参数 参数写死
/**
 *
 * @param {string} a sel
 * @param {object} b data
 * @param {any} c 是子节点 可以是文本，数组
 */
export default function h(a, b, c) {
  // 先判断是否有三个参数
  if (arguments.length < 3) throw new Error("请检查参数个数");
  // 第三个参数有不确定性 进行判断
  // 1.第三个参数是文本节点
  if (typeof c === "string" || typeof c === "number") {
    // 调用 vnode 这直接传 text 进去
    // 返回值 {sel,data,children,text,elm} 再返回出去
    return vnode(a, b, undefined, c, undefined);
  } // 2.第三个参数是数组 [h(),h()] [h(),text] 这些情况
  else if (Array.isArray(c)) {
    // 然而 数组里必须是 h() 函数
    // children 用收集返回结果
    let children = [];
    // 先判断里面是否全是 h()执行完的返回结果 是的话添加到 chilren 里
    for (let i = 0; i < c.length; i++) {
      // h() 的返回结果 是{} 而且 包含 sel
      if (!(typeof c[i] === "object" && c[i].sel))
        throw new Error("第三个参数为数组时只能传递 h() 函数");
      // 满足条件进行push [{sel,data,children,text,elm},{sel,data,children,text,elm}]
      children.push(c[i]);
    }
    // 调用 vnode 返回 {sel,data,children,text,elm} 再返回
    return vnode(a, b, children, undefined, undefined);
  } // 3.第三个参数直接就是函数 返回的是 {sel,data,children,text,elm}
  else if (typeof c === "object" && c.sel) {
    // 这个时候在 使用h()的时候 c = {sel,data,children,text,elm} 直接放入children
    let children = [c];
    // 调用 vnode 返回 {sel,data,children,text,elm} 再返回
    return vnode(a, b, children, undefined, undefined);
  }
}
