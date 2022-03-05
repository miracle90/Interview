let a = "9007199254740991";
let b = "1234567899999999999";

function bigAdd(a, b) {
  let length = Math.max(a.length, b.length);
  a = a.padStart(length, "0");
  b = b.padStart(length, "0");
  let t = 0;
  let f = 0; // 进一位
  let res = "";
  for (let i = length - 1; i >= 0; i--) {
    // 当前的两个值相加 + 上一位是否进1
    t = parseInt(a[i]) + parseInt(b[i]) + f
    // 是否进一位
    f = Math.floor(t / 10)
    // 取余 + 之前的res
    res = (t % 10) + res
  }
  // 进一位，前面补1
  if (f === 1) {
    res = "1" + res;
  }
  return res;
}

console.log(bigAdd(a, b));
