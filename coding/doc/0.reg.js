// 1、替换日期格式，MM.dd/yyyy 替换成 yyyy-MM-dd
// 2、数字价格千分位分割，将 123456789 变成123,456,789


const str1 = "03.25/2022";
function transform(str) {
  return str.replace(/^([\d]{2})\.([\d]{2})\/([\d]{4})$/, '$3-$1-$2')
}
console.log(transform(str1))

const str2 = '123456789000'
function f2(str) {
  // 前向负查找	(?!)
  // 前向查找	(?=)
  const reg = /(?!^)(?=([\d]{3})+$)/g
  return str.replace(reg, ',')
}
console.log(f2(str2))

// function formatNum(num) {
//   // (num.toFixed(2) + '') 保留两位小数
//   return num && num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
// }
// console.log(formatNum(-123456789.123456))