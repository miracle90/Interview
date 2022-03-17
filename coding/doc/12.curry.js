const curry = () => {
  let arr = [];
  const add = (...args) => {
    arr = arr.concat(args);
    return add
  };
  add.toString = () => {
    return arr.reduce((prev, cur) => {
      return prev + cur;
    });
  };
  return add;
};

const add = curry();
const res = add(1)(2)(3)
console.log(res.toString())
