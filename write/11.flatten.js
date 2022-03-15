var arr = [[1, 2, 2], [3, '4', 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

/**
 * toString() + split(',')
 */
// console.log(arr.toString().split(","));

/**
 * 递归
 * @param {*} arr 
 * @returns 
 */
// function flatten(arr) {
//   if (arr.length) {
//     return arr.reduce((prev, current) => {
//       return Array.isArray(current) ? [...prev, ...flatten(current)] : [...prev, current]
//     }, [])
//   }
// }
// console.log(flatten(arr));

/**
 * 迭代
 * @param {*} arr 
 * @returns 
 */
function flatten(arr) {
  if (!arr.length) return;
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(
  flatten(arr)
);
