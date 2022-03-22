// 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
// 你可以认为每种硬币的数量是无限的。

// 示例 1：
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1

// 示例 2：
// 输入：coins = [2], amount = 3
// 输出：-1

// 示例 3：
// 输入：coins = [1], amount = 0
// 输出：0

// 示例 4：
// 输入：coins = [1], amount = 1
// 输出：1

// 示例 5：
// 输入：coins = [1], amount = 2
// 输出：2

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let f = [];
  f[0] = 0;
  for (let i = 1; i <= amount; i++) {
    // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
    f[i] = Infinity;
    for (let j = 0; j < coins.length; j++) {
      // 总金额大于当前硬币金额才有意义
      if (i >= coins[j]) {
        // f[i - coins[j]] + 1，退一个硬币的情况下，各个硬币循环取最小值
        f[i] = Math.min(f[i], f[i - coins[j]] + 1);
      }
    }
  }
  return f[amount] === Infinity ? -1 : f[amount];
};

console.log(coinChange([1, 2, 5], 11));
console.log(coinChange([1, 2, 5], 21));
console.log(coinChange([5], 3));
console.log(coinChange([1], 1));
