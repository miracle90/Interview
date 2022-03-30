const a = "3782647863278468012934670";
const b = "23784678091370408971329048718239749083";

/**
 * 步骤
 * 1、取两个中最长的长度
 * 2、补0
 * 3、初始化t、f、res
 * 4、从后往前遍历
 * 5、计算两个数字的和为t
 * 6、是否进1，Math.floor(t/10)
 * 7、拼接字符串
 * 8、for循环之后，判断是否要在前头补1
 * @param {*} a
 * @param {*} b
 * @returns
 */
// function bigSum(a, b) {
//   // 取两数长度最大值
//   const maxLength = Math.max(a.length, b.length);
//   // 短的补0
//   a = a.padStart(maxLength, "0");
//   b = b.padStart(maxLength, "0");
//   // f：是否进1
//   // t：当前两个数字的和
//   let t = (f = 0);
//   // 要返回的结果
//   let res = "";
//   for (let i = maxLength - 1; i >= 0; i--) {
//     t = parseInt(a[i]) + parseInt(b[i]) + f;
//     f = Math.floor(t / 10);
//     res = (t % 10) + res;
//   }
//   // for循环之后，如果f为1，说明要进1，在res前头补一位
//   if (f === 1) {
//     res = "1" + "res";
//   }
//   return res;
// }
function bigSum(a, b) {
  // "00000000000003782647863278468012934670"
  // "23784678091370408971329048718239749083"
  let maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, "0");
  b = b.padStart(maxLength, "0");
  let x,
    y = 0,
    res = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    x = parseInt(a[i]) + parseInt(b[i]) + y;
    y = Math.floor(x / 10);
    res = (x % 10) + res;
  }
  if (y === 1) {
    res = '1' + res
  }
  return res
}
console.log(bigSum(a, b));
console.log(BigInt(a) + BigInt(b) + '');
console.log(bigSum(a, b) === BigInt(a) + BigInt(b) + '')
