// 如何判断url中只包含qq.com
// url有很多种形式：
// http://www.qq.com //通过
// http://www.qq.com.cn //不通过
// http://www.qq.com/a/b //通过
// http://www.qq.com?a=1 //通过
// http://www.123qq.com?a=1 //不通过
// http://www.qq.cn?redirect=http://www.qq.com/a 不通过

function checkQQDomian(url) {
  // let reg = /.*(\.qq\.com)($|[\?\/])/;
  let reg = /^(http:\/\/[^=]+\.qq\.com)($|[\?\/])/;
  return reg.test(url);
}

const url1 = "http://www.qq.com";
const url2 = "http://www.qq.com.cn";
const url3 = "http://www.qq.com/a/b";
const url4 = "http://www.qq.com?a=1";
const url5 = "http://www.123qq.com?a=1";
const url6 = "http://www.qq.cn?redirect=http://www.qq.com/a";

console.log(checkQQDomian(url1));
console.log(checkQQDomian(url2));
console.log(checkQQDomian(url3));
console.log(checkQQDomian(url4));
console.log(checkQQDomian(url5));
console.log(checkQQDomian(url6));
