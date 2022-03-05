// Array.reduce是Array.prototype上的原型方法
// Array.reduce 接收两个参数:callback函数和initialVaule初始值[可选]
// 没有初始值 && 空数字 会进行报错
// 没有初始值 && 数组长度为1 直接返回数组里的这一项，不需要执行callback
// 没有初始值 && 数组长度大于1 正常流程走 index=1
// 有初始值 && 数组长度大于1 正常流程走 index=0
// reduce返回值是pre
Array.prototype.myReduce = function (cb, initValue) {
  // if (!Array.isArray(this)) {
  //   throw new TypeError("not a array");
  // }
  // // 数组为空，并且有初始值，报错
  // if (this.length === 0 && arguments.length < 2) {
  //   throw new TypeError("Reduce of empty array with no initial value");
  // }
  let arr = this;
  let res = null;
  let existInitValue = arguments.length > 1;
  // 判断有没有初始值
  res = existInitValue ? initValue : arr[0];
  arr.forEach((item, index) => {
    if (!existInitValue && index === 0) return;
    res = cb(res, item, index, arr); // cb 每次执行完都会返回一个新的 res值，覆盖之前的 res
  });
  return res;
};

var points = {
  HarryPotter: 500,
  CedricDiggory: 750,
  RonaldWeasley: 100,
  HermioneGranger: 1270,
};

var wizards = [
  {
    name: "Harry Potter",
    house: "Gryfindor",
  },
  {
    name: "Cedric Diggory",
    house: "Hufflepuff",
  },
  {
    name: "Tonks",
    house: "Hufflepuff",
  },
  {
    name: "Ronald Weasley",
    house: "Gryfindor",
  },
  {
    name: "Hermione Granger",
    house: "Gryfindor",
  },
];

var wizardsAsAnObject = wizards.myReduce(function (obj, wizard) {
  // 移除巫师名字中的空格，用来获取对应的 points
  var key = wizard.name.replace(" ", "");

  // 如果wizard有points，则加上它，否则设置为0
  if (points[key]) {
    wizard.points = points[key];
  } else {
    wizard.points = 0;
  }

  // 删除 name 属性
  delete wizard.name;

  // 把 wizard 数据添加到新对象中
  obj[key] = wizard;

  // 返回该对象
  return obj;
}, {});

console.log(wizardsAsAnObject)

/**
 * 求和
 */
// var total = [1, 2, 3].myReduce(function (sum, current) {
//   console.log(sum, current)
//   return sum + current;
// }, 0);
// console.log(total)

/**
 * 组合多个数组
 */
// var wizards = [
//   {
//     name: "Harry Potter",
//     house: "Gryfindor",
//   },
//   {
//     name: "Cedric Diggory",
//     house: "Hufflepuff",
//   },
//   {
//     name: "Tonks",
//     house: "Hufflepuff",
//   },
//   {
//     name: "Ronald Weasley",
//     house: "Gryfindor",
//   },
//   {
//     name: "Hermione Granger",
//     house: "Gryfindor",
//   },
// ];
// var hufflepuff = wizards.myReduce(function (newArr, wizard) {
//   console.log(newArr, wizard);
//   if (wizard.house === "Hufflepuff") {
//     newArr.push(wizard.name);
//   }
//   return newArr;
// }, []);
// console.log(hufflepuff);
