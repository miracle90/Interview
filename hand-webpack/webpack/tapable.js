// tapable 是一个类似于 Node.js 中的 EventEmitter 的库，但更专注于自定义事件的触发和处理
// webpack 通过 tapable 将实现与流程解耦，所有具体实现通过插件的形式存在
class SyncHook {
  constructor() {
    this.taps = [];
  }
  tap(name, fn) {
    this.taps.push(fn);
  }
  call() {
    this.taps.forEach((tap) => tap());
  }
}

let hook = new SyncHook();
hook.tap("some name", () => {
  console.log("some name");
});

class Plugin {
  apply() {
    hook.tap("Plugin", () => {
      console.log("Plugin ");
    });
  }
}
new Plugin().apply();

hook.call();
