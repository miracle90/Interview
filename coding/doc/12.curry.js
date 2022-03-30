const curry = () => {
  let params = [];
  const fn = (...args) => {
    params = params.concat(args);
    return fn;
  };
  fn.toString = () => {
    return params.reduce((prev, cur) => {
      return prev + cur;
    }, 0);
  };
  return fn;
};
const add = curry();
const res = add(2, 3)(1)()(11);
console.log(res.toString());
