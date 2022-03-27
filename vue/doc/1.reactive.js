function cb(val) {
  console.log("视图更新啦～", val); // 渲染视图
}
function defineReactive(obj, key, val) {
  const dep = new Dep(); // 一个Dep类对象，用来收集 Watcher 对象
  Object.defineProperty(obj, key, {
    enumerable: true, // 属性可枚举
    configurable: true, // 属性可被修改或删除
    get: function reactiveGetter() {
      dep.addSub(Dep.target); // 将Dep.target（即当前的Watcher对象存入dep的subs中）
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      dep.notify(); // 在set的时候触发dep的notify来通知所有的Watcher对象更新视图
      // cb(newVal);
    },
  });
}
function observer(value) {
  if (!value || typeof value !== "object") {
    return;
  }
  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key]);
  });
}
class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
  }
}
// 订阅者
class Dep {
  constructor() {
    this.subs = []; // 用来存放Watcher对象的实例
  }
  addSub(sub) {
    // 在subs中添加一个Watcher对象
    this.subs.push(sub);
  }
  notify() {
    // 通知所有Watcher对象更新视图
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
let uid = 0;
// 观察者
class Watcher {
  constructor() {
    // 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到
    // 「依赖收集」的过程就是把 Watcher 实例存放到对应的 Dep 对象中去
    Dep.target = this;
    this.id = ++uid;
  }
  // 更新视图的方法
  update() {
    // console.log("视图更新啦～");
    console.log("watch" + this.id + " update");
    queueWatcher(this);
  }
  run() {
    console.log("watch" + this.id + "视图更新啦～");
  }
}
let has = {};
let queue = [];
let waiting = false;
function queueWatcher(watcher) {
  const id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}
function flushSchedulerQueue() {
  let watcher, id;
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }
  waiting = false;
}

Dep.target = null;
// 虚拟DOM
class VNode {
  constructor(tag, data, children, text, elm) {
    /*当前节点的标签名*/
    this.tag = tag;
    /*当前节点的一些数据信息，比如props、attrs等数据*/
    this.data = data;
    /*当前节点的子节点，是一个数组*/
    this.children = children;
    /*当前节点的文本*/
    this.text = text;
    /*当前虚拟节点对应的真实dom节点*/
    this.elm = elm;
  }
}
function render() {
  return new VNode(
    "span",
    {
      /* 指令集合数组 */
      directives: [
        {
          /* v-show指令 */
          rawName: "v-show",
          expression: "isShow",
          name: "show",
          value: true,
        },
      ],
      /* 静态class */
      staticClass: "demo",
    },
    [new VNode(undefined, undefined, undefined, "This is a span.")]
  );
}
// +++++++++++++++++++++++++++++++++ 分割线 +++++++++++++++++++++++++++++++++++++
let o = new Vue({
  data: {
    test: "I am test.",
  },
});
o._data.test = "hello,world."; /* 视图更新啦～ */
