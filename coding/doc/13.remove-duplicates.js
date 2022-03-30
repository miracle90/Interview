const arr = [2, 5, 6, 2, 5, 1, 7, 10, "a", "b", "a"];

// 方法一：
const newArr1 = [...new Set(arr)];
// console.log(newArr1);

// 方法二：
function filterRemoveDuplicates(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}
const newArr2 = filterRemoveDuplicates(arr);
// console.log(newArr2);

// 方法三：
function reduceRemoveDuplicates(arr) {
  return arr.reduce((newArr, cur) => {
    if (!newArr.includes(cur)) {
      newArr.push(cur);
    }
    return newArr;
  }, []);
}
const newArr3 = reduceRemoveDuplicates(arr);
console.log(newArr3);
