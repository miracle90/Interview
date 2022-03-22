// 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？

// 注意：每种物品都只有1件

// 入参是物品的个数和背包的容量上限，以及物品的重量和价值数组
/**
 *
 * @param {*} n 有 n 件物品
 * @param {*} c 一个容量为 c 的背包
 * @param {*} w 物品体积用一个名为 w 的数组存起来
 * @param {*} value 物品的价值用一个名为 value 的数组存起来
 * @returns
 */
function knapsack(n, c, w, value) {
  // 把背包的空间化成数组
  const dp = new Array(c + 1).fill(0);
  // res 用来记录所有组合方案中的最大值
  let res = -Infinity;
  // 遍历物品
  for (let i = 1; i <= n; i++) {
    for (let v = c; v >= w[i]; v--) {
      // 写出状态转移方程
      dp[v] = Math.max(dp[v], dp[v - w[i]] + value[i]);
      // 即时更新最大值
      if (dp[v] > res) {
        res = dp[v];
      }
    }
  }
  return res;
}

console.log(knapsack(3, 5, [1, 2, 3], [1, 2, 3]));
