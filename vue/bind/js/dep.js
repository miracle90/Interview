/**
 * 订阅者
 */
export default class Dep {
  constructor() {
    // 存储观察者
    this.subs = [];
  }
  // 添加观察者
  addSub(sub) {
    console.log('~~~~~~sub ', sub)
    // 判断观察者是否存在和是否拥有update方法
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 通知方法
  notify() {
    /* 通知所有Watcher对象更新视图 */
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
