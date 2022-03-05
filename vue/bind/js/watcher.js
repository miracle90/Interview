import Dep from "./dep.js";

/**
 * 数据更新后 收到通知之后 调用 update 进行更新
 */
export default class Watcher {
  constructor(vm, key, cb) {
    // vm是vue的实例
    this.vm = vm;
    // key是data中的key
    this.key = key;
    // 回调函数，更新视图的具体方法
    this.cb = cb;
    // 把观察者存放在 Dep.target
    Dep.target = this;
    // 旧数据 更新视图的时候要进行比较
    // 还有一点就是 vm[key] 这个时候就触发了 get 方法
    // 之前在 get 把 观察者 通过dep.addSub(Dep.target) 添加到了 dep.subs中
    this.oldValue = vm[key];
    // Dep.target 就不用存在了 因为上面的操作已经存好了
    Dep.target = null;
  }
  // 观察者中的必备方法 用来更新视图
  update() {
    // 获取新值
    let newValue = this.vm[this.key];
    // 比较旧值和新值
    if (newValue === this.oldValue) return;
    // 调用具体的更新方法
    this.cb(newValue);
  }
}
