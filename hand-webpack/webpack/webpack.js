const Compiler = require("./Compiler");

function webpack(options) {
  // 1.初始化参数：从配置文件和Shell语句中读取并合并参数,得出最终的配置对象
  console.log(process.argv); //['node.exe','debugger.js']
  let argv = process.argv.slice(2);
  let shellOptions = argv.reduce((shellOptions, option) => {
    let [key, value] = option.split("=");
    shellOptions[key.slice(2)] = value;
    return shellOptions;
  }, {});

  let finalOptions = { ...options, ...shellOptions };
  console.log("finalOptions", finalOptions);

  // 2.用上一步得到的参数初始化Compiler对象
  let compiler = new Compiler(finalOptions);
  // 3.加载所有配置的插件
  let { plugins } = finalOptions;
  for (let plugin of plugins) {
    plugin.apply(compiler);
  }
  return compiler;
}

module.exports = webpack;
