/**
 * 快速排序入口
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 * @returns
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  // 定义递归边界，若数组只有一个元素，则没有排序必要
  if (arr.length > 1) {
    // lineIndex表示下一次划分左右子数组的索引位
    const lineIndex = partition(arr, left, right);
    // 如果左边子数组的长度不小于1，则递归快排这个子数组
    if (left < lineIndex - 1) {
      // 左子数组以 lineIndex-1 为右边界
      quickSort(arr, left, lineIndex - 1);
    }
    // 如果右边子数组的长度不小于1，则递归快排这个子数组
    if (lineIndex < right) {
      // 右子数组以 lineIndex 为左边界
      quickSort(arr, lineIndex, right);
    }
  }
  return arr;
}
// 以基准值为轴心，划分左右子数组的过程
function partition(arr, left, right) {
  // 基准值默认取中间位置的元素
  let pivotValue = arr[Math.floor(left + (right - left) / 2)];
  // 初始化左右指针
  let i = left;
  let j = right;
  // 当左右指针不越界时，循环执行以下逻辑
  while (i <= j) {
    // 左指针所指元素若小于基准值，则右移左指针
    while (arr[i] < pivotValue) {
      i++;
    }
    // 右指针所指元素大于基准值，则左移右指针
    while (arr[j] > pivotValue) {
      j--;
    }
    // 若i<=j，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
    if (i <= j) {
      // swap(arr, i, j);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  // 返回左指针索引作为下一次划分左右子数组的依据
  return i;
}
console.log(quickSort([2, 5, 1, 3, 4, 0]));
