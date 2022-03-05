class DonePlugin {
  //每个插件都是一个类，而每个类都需要定义一个apply方法
  apply(compiler) {
    compiler.hooks.done.tap("DonePlugin", () => {
      console.log("done:结束编译");
    });
  }
}
module.exports = DonePlugin;
