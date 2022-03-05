// function sum() {
//   let allArgs = Array.prototype.slice.call(arguments);
//   let add = function(){
//     allArgs.push(...arguments) // 每次调用 sum 函数都收集参数
//     return add
//   }
//   // 重写 toString 方法，函数执行的时候会自动调用toString()方法，计算返回所有参数结果
//   add.toString = function () {
//     return allArgs.reduce((a, b) => a+b)
//   }
//   return add
// }


// const s1 = sum(1, 2, 3)
// const s2 = sum(4)(5)(6)
// const s3 = sum(7,8)(9, 10)(11)

// alert(s3)

function currying() {
  // 转化成数组
  const arr = Array.prototype.slice.call(arguments)
  console.log('arr ', arr)
  const add = function() {
    // 每次调用 sum 函数都收集参数
    arr.push(...arguments)
    return add
  }
  add.toString = function() {
    console.log('toString', arr) // toString (5) [7, 8, 9, 10, 11]
    // 重写 toString 方法，函数执行的时候会自动调用toString()方法，计算返回所有参数结果
    return arr.reduce((total, item) => (total + item))
  }
  return add
}

const s1 = currying(1, 2, 3)
const s2 = currying(4)(5)(6)
const s3 = currying(7,8)(9, 10)(11)

console.log(typeof s1) // function
console.log(typeof s2) // function
console.log(typeof s3) // function
console.log(s3)

