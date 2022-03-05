// 拷贝目标
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
//================ 方法一(最便捷)=================
// let newObj = JSON.parse(JSON.stringify(obj));

//================ 方法二(实现数组和对象深拷贝)=================
/**
 * 深拷贝
 * @param {*} obj 
 * @param {*} hash 引入WeakMap解决循环引用问题
 * @returns 
 */
function deepClone(obj, hash = new WeakMap()) {
  // 如果是undifined、null、Error类型、基础数据类型，直接return
  if (obj === null || obj instanceof Error || typeof obj !== 'object') return obj
  // Date和RegExp，重新new
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 引入hash，WeakMap，解决循环引用问题
  if (hash.get(obj)) return hash.get(obj)
  // 针对数组和对象，new实例
  const newObj = new obj.constructor
  hash.set(obj, newObj)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归遍历，拷贝数组和对象，将hash传入，解决循环引用问题
      newObj[key] = deepClone(obj[key], hash)
    }
  }
  return obj
}

let deepObj = deepClone(obj);
console.log(deepObj);

