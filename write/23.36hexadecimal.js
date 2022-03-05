function nums36() {
  let arr = []
  for (let i = 0; i < 36; i++) {
    if (i < 10) {
      arr.push(i)
    } else {
      arr.push(String.fromCharCode(i + 87))
    }
  }
  return arr
}

function tenTo36(n) {
  const res = []
  const num36List = nums36()
  console.log(num36List)
  while (n) {
    // 先取个位
    const y = n % 36
    res.unshift(num36List[y])
    // 再取前面
    n = parseInt(n / 36)
  }
  return res.join('')
}
console.log(tenTo36(36));






// function getNums36() {
//   var nums36 = [];
//   for (var i = 0; i < 36; i++) {
//     if (i >= 0 && i <= 9) {
//       nums36.push(i);
//     } else {
//       nums36.push(String.fromCharCode(i + 87));
//     }
//   }
//   return nums36;
// }
// //十进制数转成36进制
// function scale36(n) {
//   var arr = [];
//   var nums36 = getNums36();
//   console.log(nums36);
//   while (n) {
//     var res = n % 36;
//     console.log(res)
//     //作为下标，对应的36进制数，转换成
//     arr.unshift(nums36[res]);
//     console.log(arr)
//     //去掉个位
//     n = parseInt(n / 36);
//     console.log(n)
//   }
//   return arr.join("");
// }

