import h from "./my-snabbdom/h";
import patch from "./my-snabbdom/patch";

let app = document.querySelector("#app");

// js 函数执行，先执行最里面的函数
// 1.h('li', {}, '我是一个li')第一个执行 返回的 {sel,data,children,text,elm} 连续三个 li 都是这个
// 2.接着就是 h('ul', {}, []) 进入到了第二个判断是否为数组，然后 把每一项 进行判断是否对象 和 有sel 属性，然后添加到 children 里面又返回了出去 {sel,data,children,text,elm}
// 3.第三就是执行 h('div', {},h()) 了， 第三个参数 直接是 h()函数 = {sel,data,children,text,elm} ，他的 children 把他用 [ ] 包起来
// 再返回给 vnode
let vnode = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
]);

patch(app, vnode);

console.log('vnode~~~~~~~~~~', vnode)

let vnode2 = h("ul", {}, [
  h("li", { key: "E" }, "E"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "A" }, "A"),
]);
let vnode3 = h("ul", {}, [
  // h("li", { key: "E" }, "E"),
  h("li", { key: "Z" }, "Z"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "A" }, "A"),
  h("li", { key: "V" }, "V"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "K" }, "K"),
]);
let vnode4 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
]);
let vnode5 = h("ul", {}, [
  h("li", { key: "E" }, "E"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "V" }, "V"),
]);
let vnode6 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h(
    "li",
    { key: "E" },
    h("ul", {}, [
      h("li", { key: "A" }, "A"),
      h("li", { key: "B" }, "B"),
      h("li", { key: "C" }, "C"),
      h("li", { key: "D" }, "D"),
      h("li", { key: "E" }, h("div", { key: "R" }, "R")),
    ])
  ),
]);
let vnodeList = [vnode2, vnode3, vnode4, vnode5, vnode6];
let btn = document.querySelectorAll(".btn");
for (let i = 0; i < btn.length; i++) {
  // 存在深浅拷贝的问题
  // 会对原数组进行修改
  btn[i].onclick = () => {
    // 深拷贝，解决patch修改原数据问题
    // 此方法不能拷贝dom元素
    console.log('~~~~~~~~~~~~~~~ ', vnode)
    vnode = patch(vnode, JSON.parse(JSON.stringify(vnodeList[i])));
  };
}
