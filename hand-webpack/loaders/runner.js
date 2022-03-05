let { runLoaders } = require("loader-runner");
//let runLoaders = require('./loader-runner')
let path = require("path");
let fs = require("fs");
let filePath = path.resolve(__dirname, "src", "index.js"); //入口模块
//定在require方法里的 inline Loader
let request = `!!inline-loader1!inline-loader2!${filePath}`;
//不同的loader并不loader的类型属性，而是你在使用 的使用了什么样的enforce
let rules = [
  {
    test: /\.js$/,
    use: ["norma-loader1", "normal-loader2"], //普通的loader
  },
  {
    test: /\.js$/,
    enforce: "post",
    use: ["post-loader1", "post-loader2"], //post的loader 后置
  },
  {
    test: /\.js$/,
    enforce: "pre",
    use: ["pre-loader1", "pre-loader2"], //pre的loader 前置
  },
];
//loader执行的真正顺序是
// post pitch inline pitch normal pitch pre pitch=>pre loader normal loader inline loader post loader
// pitch很少使用
//顺序是 post(后置)+inline(内联)+normal(普通)+pre(前置)
//parts=['inline1-loader','inline2-loader','src/index.js']
let parts = request.replace(/^-?!+/, "").split("!");
let resource = parts.pop(); //'src/index.js'
//解析loader的绝对路径 C:\5.loader\loaders\inline1-loader.js
let resolveLoader = (loader) => path.resolve(__dirname, "loaders", loader);
//inlineLoaders=[inline1-loader绝对路径，inline2-loader绝对路径]
let inlineLoaders = parts;
let preLoaders = [],
  normalLoaders = [],
  postLoaders = [];
for (let i = 0; i < rules.length; i++) {
  let rule = rules[i];
  if (rule.test.test(resource)) {
    if (rule.enforce === "pre") {
      preLoaders.push(...rule.use);
    } else if (rule.enforce === "post") {
      postLoaders.push(...rule.use);
    } else {
      normalLoaders.push(...rule.use);
    }
  }
}

/**
 * 正常 post(后置)+inline(内联)+normal(普通)+pre(前置)
 * Prefixing with ! will disable all configured normal loaders
 * post(后置)+inline(内联)+pre(前置)
 * Prefixing with !! will disable all configured loaders (preLoaders, loaders, postLoaders)
 * inline(内联)
 * Prefixing with -! will disable all configured preLoaders and loaders but not postLoaders
 * post(后置)+inline(内联)
 */
let loaders = []; //表示最终生效的loader
if (request.startsWith("!!")) {
  loaders = [...inlineLoaders];
} else if (request.startsWith("-!")) {
  loaders = [...postLoaders, ...inlineLoaders];
} else if (request.startsWith("!")) {
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders];
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}
loaders = loaders.map(resolveLoader);
//我们已经 收到了所有的loader绝对路径组成的数组
runLoaders(
  {
    resource, //要加载和转换的模块
    loaders, //loader的数组
    context: { name: "zhufeng" }, //基础上下文件对象
    readResource: fs.readFile.bind(fs), //读取硬盘文件的方法
  },
  (err, result) => {
    console.log(err);
    console.log(result);
    console.log(result.resourceBuffer.toString("utf8"));
  }
);
