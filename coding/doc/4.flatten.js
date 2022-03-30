const arr = [
  [1, 2, 2],
  [3, "4", 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];

/**
 * 方法一：
 * toString().split(',')
 * 缺陷：会改变内容的类型，number => string
 */
const res1 = arr.toString().split(",");
console.log(res1);

/**
 * 方法二：
 * 判断数组中是否有数组了
 * 有的话不断的通过 arr = [].concat(...arr) 解构
 */
function flatten_some(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
const res2 = flatten_some(arr);
console.log(res2);

/**
 * 方法三：
 * 使用reduce + 递归
 */
function flatten_reduce(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatten_reduce(cur) : cur);
  }, []);
}
const res3 = flatten_reduce(arr);
console.log(res3);
