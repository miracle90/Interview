// 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？

// 注意：每种物品都只有1件

// 入参是物品的个数和背包的容量上限，以及物品的重量和价值数组
/**
 * @param {*} n 有 n 件物品
 * @param {*} c 一个容量为 c 的背包
 * @param {*} w 物品体积用一个名为 w 的数组存起来
 * @param {*} value 物品的价值用一个名为 value 的数组存起来
 * @returns
 */
// 入参是物品的个数和背包的容量上限，以及物品的重量和价值数组
function knapsack(n, c, w, value) {
  // 把背包的空间化成数组
  const dp = new Array(c + 1).fill(0);
  let result = -Infinity;
  for (let i = 0; i < n; i++) {
    for (let j = c; j >= w[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - w[i]] + value[i]);
      if (dp[j] > result) {
        result = dp[j];
      }
    }
  }
  return result;
}
console.log(knapsack(3, 6, [1, 3, 2], [1, 3, 10]));
