import Dep from "./dep.js";

export default class Observer {
  constructor(data) {
    // 用来遍历 data
    this.walk(data);
  }
  // 遍历 data 转为响应式
  walk(data) {
    // 判断 data是否为空 和 对象
    if (!data || typeof data !== "object") return;
    // 遍历 data
    Object.keys(data).forEach((key) => {
      // 转为响应式
      this.defineReactive(data, key, data[key]);
    });
  }
  // 转为响应式
  // 要注意的 和vue.js 写的不同的是
  // vue.js中是将 属性给了 Vue 转为 getter setter
  // 这里是 将data中的属性转为getter setter
  defineReactive(obj, key, value) {
    // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
    this.walk(value);
    const _this = this;
    // 创建 Dep 对象
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      // 设置可枚举
      enumerable: true,
      // 设置可配置
      configurable: true,
      // 获取值
      get() {
        // 在这里添加观察者对象 Dep.target 表示观察者
        console.log("observer get key => ", key);
        console.log("Dep.target ", Dep.target);
        console.log(dep.subs);
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      // 设置值
      set(newValue) {
        // 判断旧值和新值是否相等
        if (newValue === value) return;
        // 设置新值
        value = newValue;
        // 赋值的话如果是newValue是对象，对象里面的属性也应该设置为响应式的
        _this.walk(newValue);
        // 触发通知 更新视图
        dep.notify();
      },
    });
  }
}
