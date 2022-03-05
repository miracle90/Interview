/**
 * sort
 * a - b，由小 => 大
 */
const arr = [5, 2, 1, 9, 0, 10, 100, 6, 3];
const newArr1 = [...arr].sort((a, b) => a - b);
console.log("sort排序 ", newArr1);

/**
 * 冒泡排序 =》循环，相邻两个比较，如果左边比右边大，调换位置
 * 时间复杂度O(n^2)
 * @param {*} list
 * @returns
 */
function sort1(list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      let tempi = list[i];
      let tempj = list[j];
      if (tempi > tempj) {
        list[i] = tempj;
        list[j] = tempi;
      }
    }
  }
  return list;
}
const newArr2 = sort1([...arr]);
console.log("冒泡排序 ", newArr2);

/**
 * 快排，数组中间取值，遍历，比中间值小的放左边边，比中间值大的放右边，递归，concat拼接
 * 快排的平均时间复杂度O(nlog2n)
 * @param {*} list
 * @returns
 */
function fastSort(list) {
  // 如果数组长度小于等于1，直接return  
  if (list.length <= 1) return list;
  // 取中间值索引
  let mid = Math.floor(list / 2);
  // 取中间值
  let current = list.splice(mid, 1);
  // 声明left、right数组
  let left = [],
    right = [];
  // 循环变量，比大小，小的push进left，大的push进right
  for (let i = 0; i < list.length; i++) {
    if (list[i] < current) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }
  // 按照 left + current + right，拼接数组，递归遍历
  return fastSort(left).concat(current, fastSort(right));
}
const newArr3 = fastSort([...arr]);
console.log("快排 ", newArr3);
