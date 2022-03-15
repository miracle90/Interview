Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 没传值，设置为window
  context = context || window;
  // 使用symbol避免命名冲突
  const fnSymbol = Symbol("fn");
  // 将方法（this），写在作用域上
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};
Function.prototype.myApply = function (context, argsList) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 没传值，设置为window
  context = context || window;
  // 使用symbol避免命名冲突
  const fnSymbol = Symbol("fn");
  // 将方法（this），写在作用域上
  context[fnSymbol] = this;
  const result = context[fnSymbol](...argsList);
  delete context[fnSymbol];
  return result;
};
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") throw new TypeError("Error");
  context = context || window;
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  return function (..._args) {
    // 拼接参数ƒ
    const result = context[fnSymbol](...args.concat(..._args));
    delete context[fnSymbol];
    return result;
  };
};
let p1 = {
  name: "Tom",
  say(age, hobby) {
    console.log(`我叫${this.name} 我今年${age} 喜欢${hobby}`);
  },
};
let p2 = {
  name: "Bob",
};
// p1.say.myApply(p2, [18, "唱歌"]);
const f = p1.say.myBind(p2, "32", "搞钱");
f();
