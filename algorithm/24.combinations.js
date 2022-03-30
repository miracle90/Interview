// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
// 你可以按 任何顺序 返回答案。
// 示例 1：
// 输入：n = 4, k = 2
// 输出：
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
// 示例 2：
// 输入：n = 1, k = 1
// 输出：[[1]]
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // 初始化结果数组
  const res = [];
  // 初始化组合数组
  const subset = [];
  // 进入 dfs，起始数字是1
  dfs(1);
  // 定义 dfs 函数，入参是当前遍历到的数字
  function dfs(index) {
    if (subset.length === k) {
      res.push(subset.slice());
      return;
    }
    // 从当前数字的值开始，遍历 index-n 之间的所有数字
    for (let i = index; i <= n; i++) {
      // 这是当前数字存在于组合中的情况
      subset.push(i);
      // 基于当前数字存在于组合中的情况，进一步 dfs
      dfs(i + 1);
      // 这是当前数字不存在与组合中的情况
      subset.pop();
    }
  }
  // 返回结果数组
  return res;
};
// function xxx(入参) {
//   前期的变量定义、缓存等准备工作 
  
//   // 定义路径栈
//   const path = []
  
//   // 进入 dfs
//   dfs(起点) 
  
//   // 定义 dfs
//   dfs(递归参数) {
//     if(到达了递归边界) {
//       结合题意处理边界逻辑，往往和 path 内容有关
//       return   
//     }
    
//     // 注意这里也可能不是 for，视题意决定
//     for(遍历坑位的可选值) {
//       path.push(当前选中值)
//       处理坑位本身的相关逻辑
//       path.pop()
//     }
//   }
// }
