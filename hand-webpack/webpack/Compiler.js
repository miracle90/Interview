const { SyncHook } = require("tapable");
const fs = require("fs");
const path = require("path");
const Complication = require("./Complication");

/**
 * Compiler就是编译大管家
 * 负责整个编译过程，里面保存整个编译所有的信息
 */
class Compiler {
  constructor(options) {
    this.options = options;
    this.hooks = {
      //会在开始编译的时候触发
      run: new SyncHook(),
      //会在结束编译的时候触发
      done: new SyncHook(),
    };
  }
  //4.执行Compiler对象的run方法开始执行编译
  run(callback) {
    this.hooks.run.call();
     //5.根据配置中的entry找出入口文件
    const onCompiled = (err, stats, fileDependencies) => {
      //10在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
      for (const filename in stats.assets) {
        let filePath = path.join(this.options.output.pathname, filename)
        fs.writeFileSync(filePath, stats.assets[filename], 'utf-8')
      }
      callback(err, {
        toJson: () => stats
      })
      fileDependencies.forEach(fileDependency => {
        // 监听文件改变，实现HMR
        fs.watch(fileDependency, () => this.compile(onCompiled))
      });
    };
    this.compile(onCompiled);
    this.hooks.done.call();
  }
  compile(callback) {
    let compilation = new Complication(this.options);
    //每次编译都会创建一个新的Compilcation
    compilation.build(callback);
  }
}

module.exports = Compiler;
