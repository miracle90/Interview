/**
 * 冒泡排序
 * @param {*} arr
 * @returns
 */
function bubbleSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 外层循环用于控制从头到尾的比较+交换到底有多少轮
  for (let i = 0; i < len; i++) {
    // 内层循环用于完成每一轮遍历过程中的重复比较+交换
    for (let j = 0; j < len - 1; j++) {
      // 若相邻元素前面的数比后面的大
      if (arr[j] > arr[j + 1]) {
        // 交换两者
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  // 返回数组
  return arr;
}

/**
 * 插入排序
 * @param {*} arr
 * @returns
 */
function insertSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // temp 用来保存当前需要插入的元素
  let temp;
  // i用于标识每次被插入的元素的索引
  for (let i = 1; i < len; i++) {
    // j用于帮助 temp 寻找自己应该有的定位
    let j = i;
    temp = arr[i];
    // 判断 j 前面一个元素是否比 temp 大
    while (j > 0 && arr[j - 1] > temp) {
      // 如果是，则将 j 前面的一个元素后移一位，为 temp 让出位置
      arr[j] = arr[j - 1];
      j--;
    }
    // 循环让位，最后得到的 j 就是 temp 的正确索引
    arr[j] = temp;
  }
  return arr;
}

/**
 * 选择排序
 * @param {*} arr
 * @returns
 */
function selectSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
  let minIndex;
  // i 是当前排序区间的起点
  for (let i = 0; i < len - 1; i++) {
    // 初始化 minIndex 为当前区间第一个元素
    minIndex = i;
    // i、j分别定义当前区间的上下界，i是左边界，j是右边界
    for (let j = i; j < len; j++) {
      // 若 j 处的数据项比当前最小值还要小，则更新最小值索引为 j
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

/**
 * 归并排序
 * @param {*} arr
 * @returns
 */
function mergeSort(arr) {
  const len = arr.length;
  // 处理边界情况
  if (len <= 1) {
    return arr;
  }
  // 计算分割点
  const mid = Math.floor(len / 2);
  // 递归分割左子数组，然后合并为有序数组
  const leftArr = mergeSort(arr.slice(0, mid));
  // 递归分割右子数组，然后合并为有序数组
  const rightArr = mergeSort(arr.slice(mid, len));
  // 合并左右两个有序数组
  arr = mergeArr(leftArr, rightArr);
  // 返回合并后的结果
  return arr;
}
function mergeArr(arr1, arr2) {
  // 初始化两个指针，分别指向 arr1 和 arr2
  let i = 0,
    j = 0;
  // 初始化结果数组
  const res = [];
  // 缓存arr1的长度
  const len1 = arr1.length;
  // 缓存arr2的长度
  const len2 = arr2.length;
  // 合并两个子数组
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }
  // 若其中一个子数组首先被合并完全，则直接拼接另一个子数组的剩余部分
  if (i < len1) {
    return res.concat(arr1.slice(i));
  } else {
    return res.concat(arr2.slice(j));
  }
}

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
// 快速排序中使用 swap 的地方比较多，我们提取成一个独立的函数
// function swap(arr, i, j) {
//   [arr[i], arr[j]] = [arr[j], arr[i]];
// }
