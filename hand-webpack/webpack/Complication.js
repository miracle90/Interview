let fs = require("fs");
// @babel/types 用于 AST 节点的 Lodash 式工具库, 它包含了构造、验证以及变换 AST 节点的方法，对编写处理 AST 逻辑非常有用
let types = require("babel-types");
// 可以把源码转换成AST
let parser = require("@babel/parser");
// 用于对 AST 的遍历，维护了整棵树的状态，并且负责替换、移除和添加节点
let traverse = require("@babel/traverse").default;
// 可以把AST生成源码，同时生成sourcemap
let generator = require("@babel/generator").default;
const path = require("path");
//根目录就是当前的工作目录
let baseDir = toUnixPath(process.cwd()); // \ => /
function toUnixPath(filePath) {
  return filePath.replace(/\\/g, "/");
}
class Complication {
  constructor(options) {
    this.options = options;
    this.modules = []; //存放着本次编译生产所有的模块 所有的入口产出的模块
    this.chunks = []; //代码块的数组
    this.assets = {}; //产出的资源
    this.fileDependencies = [];
  }
  //这个才是编译最核心的方法
  build(callback) {
    //5.根据配置中的entry找出入口文件
    let entry = {};
    if (typeof this.options.entry === "string") {
      entry.main = this.options.entry;
    } else {
      entry = this.options.entry;
    }
    for (let entryName in entry) {
      //找到入口文件的绝对路径
      let entryFilePath = path.posix.join(baseDir, entry[entryName]);
      this.fileDependencies.push(entryFilePath);
      //6.从入口文件出发,调用所有配置的Loader对模块进行编译
      let entryModule = this.buildModule(entryName, entryFilePath);
      //8.根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
      let chunk = {
        name: entryName, //代码块的名字就是入口的名字
        entryModule, //入口模块 entry1.js
        modules: this.modules.filter((item) => item.name.includes(entryName)),
      };
      this.chunks.push(chunk);
    }
    //9.再把每个Chunk转换成一个单独的文件加入到输出列表
    this.chunks.forEach((chunk) => {
      let filename = this.options.output.filename.replace("[name]", chunk.name);
      this.assets[filename] = getSource(chunk);
    });

    callback(
      null,
      {
        chunks: this.chunks,
        modules: this.modules,
        assets: this.assets,
      },
      this.fileDependencies
    );
  }
  //name此模块是属于哪个入口的 modulePath 模块的绝对路径
  buildModule(name, modulePath) {
    //6.从入口文件出发,调用所有配置的Loader对模块进行编译
    //1.读取模块的内容
    let sourceCode = fs.readFileSync(modulePath, "utf8");
    let { rules } = this.options.module;
    let loaders = []; //
    rules.forEach((rule) => {
      let { test } = rule;
      if (modulePath.match(test)) {
        loaders.push(...rule.use);
      }
    }); //loaders=[logger1,logger2]
    sourceCode = loaders.reduceRight((sourceCode, loader) => {
      return require(loader)(sourceCode);
    }, sourceCode);
    //当前模块的模块ID
    let moduleId = "./" + path.posix.relative(baseDir, modulePath);
    let module = { id: moduleId, dependencies: [], name: [name] };
    //7.再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
    let ast = parser.parse(sourceCode, { sourceType: "module" });
    traverse(ast, {
      CallExpression: ({ node }) => {
        if (node.callee.name === "require") {
          //获取依赖模块的相对路径 wepback打包后不管什么模块，模块ID都是相对于根目录的相对路径 ./src ./node_modules
          let depModuleName = node.arguments[0].value; // ./title
          //获取当前模块的所在的目录
          let dirname = path.posix.dirname(modulePath); //src
          //C:\aproject\zhufengwebpack202108\4.flow\src\title.js
          let depModulePath = path.posix.join(dirname, depModuleName);
          let extensions = this.options.resolve.extensions;
          depModulePath = tryExtensions(depModulePath, extensions);
          this.fileDependencies.push(depModulePath);
          //生成此模块的模块ID
          let depModuleId = "./" + path.posix.relative(baseDir, depModulePath);
          node.arguments = [types.stringLiteral(depModuleId)]; // ./title => ./src/title.js
          //把此模块依赖的模块ID和模块路径放到此模块的依赖数组中
          module.dependencies.push({ depModuleId, depModulePath });
        }
      },
    });
    //根据改造后的语法树生成源代码
    let { code } = generator(ast);
    module._source = code; //module._source属必指向此模块的改造后的源码
    //7.再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
    module.dependencies.forEach(({ depModuleId, depModulePath }) => {
      let existModule = this.modules.find((item) => item.id === depModuleId);
      if (existModule) {
        existModule.name.push(name);
      } else {
        let depModule = this.buildModule(name, depModulePath);
        this.modules.push(depModule);
      }
    });
    return module;
  }
}
function tryExtensions(modulePath, extensions) {
  if (fs.existsSync(modulePath)) {
    return modulePath;
  }
  for (let i = 0; i < extensions.length; i++) {
    let filePath = modulePath + extensions[i];
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  throw new Error(`${modulePath}没找到`);
}

function getSource(chunk) {
  return `
   (() => {
    var modules = {
      ${chunk.modules.map(
        (module) => `
        "${module.id}": (module) => {
          ${module._source}
        },
      `
      )}  
    };
    var cache = {};
    function require(moduleId) {
      var cachedModule = cache[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = (cache[moduleId] = {
        exports: {},
      });
      modules[moduleId](module, module.exports, require);
      return module.exports;
    }
    var exports ={};
    ${chunk.entryModule._source}
  })();
   `;
}
module.exports = Complication;
