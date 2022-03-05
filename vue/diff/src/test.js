/* test.js */

// 导入 snabbdom
import { h, init, thunk } from 'snabbdom'

// init() 方法返回一个 patch 函数 用来比较两个虚拟DOM 的差异 然后更新到真实的DOM里
// 这里暂时传入一个空数组 []
let patch = init([])
let oldNode
// h 方法是用来创建 Virtual DOM
// 第一个参数是 虚拟DOM 标签
// 第二个参数是 虚拟DOM 的数据
// 第三个参数是 虚拟DOM 的子虚拟DOM
// 它有好几种传参方式 h函数做了重载 这里就 用上面的传参
// 而且可以进行嵌套使用

// 获取到 html 的 div#app
// 用来比较两个虚拟DOM 的差异 然后更新到真实的DOM里
// let oldNode = patch(app, vnode)
// 再来模拟一个异步请求
setTimeout(() => {
  let app = document.querySelector('#app')

  let vnode = h('div#box', '测试', [
    h('ul.list', [
      h('li', '我是一个li'),
      h('li', '我是一个li'),
      h('li', '我是一个li'),
    ]),
  ])
  // 再来进行比较差异判断是否更新
  oldNode = patch(app, vnode)
}, 3000)

setTimeout(() => {
  let vNode = h('div#box', '重新获取了数据', [
    h('ul.list', [
      h('li', '我是一个li'),
      h('li', '通过path判断了差异性'),
      h('li', '更新了数据'),
    ]),
  ])
  // 再来进行比较差异判断是否更新
  patch(oldNode, vNode)
}, 6000)

