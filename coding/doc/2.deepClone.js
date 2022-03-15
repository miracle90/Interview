let obj = {
  url: "/api/list",
  method: "GET",
  cache: false,
  timeout: 1000,
  key: Symbol("KEY"),
  big: 10n,
  n: null,
  u: undefined,
  headers: {
    "Content-Type": "application/json",
    post: {
      "X-Token": "xxx",
    },
  },
  arr: [10, 20, 30],
  reg: /^\d+$/,
  time: new Date(),
  fn: function () {
    console.log(this);
  },
  err: new Error("xxx"),
};
obj.obj = obj;
/**
 * 深拷贝
 * @param {*} obj 要拷贝的对象
 * @param {*} hash 用来存储拷贝过的对象，解决循环引用的问题
 * @returns
 */
function deepClone(obj, hash = new WeakMap()) {
  // 1、null
  // 2、typeof不为 object
  // 3、Error
  if (obj === null || typeof obj !== "object" || obj instanceof Error)
    return obj;
  //  Date类型
  if (obj instanceof Date) return new Date(obj);
  // 正则类型
  if (obj instanceof RegExp) return new RegExp(obj);
  // 查看hash中，是否存在已拷贝的对象，解决循环应用的问题
  if (hash.get(obj)) return hash.get(obj);
  // 对象+数组，使用 new obj.constructor 实现
  const newObj = new obj.constructor();
  // 使用 WeakMap 保存
  hash.set(obj, newObj);
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // 递归拷贝，将hash传进去
      newObj[key] = deepClone(obj[key], hash);
    }
  }
  // 返回通过构造函数新建的对象
  return newObj;
}
console.log(deepClone(obj));
