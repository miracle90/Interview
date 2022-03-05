const arr = [2, 5, 6, 2, 5, 1, 7, 10, "a", "b", "a"];

// 1、new Set
const newArr1 = [...new Set(arr)];
console.log(newArr1);

// 2、filter + indexOf
function unique1(list) {
  return list.filter((item, index, array) => array.indexOf(item) === index);
}
const newArr2 = unique1(arr);
console.log(newArr2);

// 3、循环 + indexOf不存在push进新数组
function unique2(list) {
  let arr = [];
  list.forEach((item) => {
    if (arr.indexOf(item) === -1) arr.push(item);
  });
  return arr;
}
const newArr3 = unique2(arr);
console.log(newArr3);
