import Observer from "./observer.js";
import Compiler from "./compiler.js";

export default class Vue {
  constructor(options) {
    this.$options = options || {};
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
    this.$data = options.data || {};
    // 看到这里为什么做了两个重复性的操作呢？
    // 重复性两次把 data 的属性转为响应式
    // 在obsever.js 中是把 data 的所有属性 加到 data 自身 变为响应式 转成 getter setter方式
    // 在vue.js 中 也把 data的 的所有属性 加到 Vue 上,是为了以后方面操作可以用 Vue 的实例直接访问到 或者在 Vue 中使用 this 访问
    this._proxyData(this.$data);
    // 使用 Obsever 把data中的数据转为响应式
    new Observer(this.$data);
    // 编译模板
    new Compiler(this);
  }
  // 把data 中的属性注册到 Vue
  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      // 进行数据劫持
      // 把每个data的属性 到添加到 Vue 转化为 getter setter方法
      Object.defineProperty(this, key, {
        // 设置可以枚举
        enumerable: true,
        // 设置可以配置
        configurable: true,
        // 获取数据
        get() {
          return data[key];
        },
        // 设置数据
        set(newValue) {
          // 判断新值和旧值是否相等
          if (newValue === data[key]) return;
          // 设置新值
          data[key] = newValue;
        },
      });
    });
  }
}
