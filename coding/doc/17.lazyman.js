// 核心：
// 1、taskList队列
// 2、next方法
// 3、return this
// 4、异步
class Lazy {
  constructor(name) {
    this.taskList = [];
    const task = () => {
      console.log(`Hi, This is ${name}`);
      this.next()
    };
    this.taskList.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }
  next = () => {
    const task = this.taskList.shift();
    task && task();
  };
  sleep = (time) => {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };
    this.taskList.push(task);
    return this;
  };
  eat = (name) => {
    const task = () => {
      console.log(`Eat ${name}`);
      this.next();
    };
    this.taskList.push(task);
    return this;
  };
  sleepFirst = (time) => {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };
    this.taskList.unshift(task);
    return this;
  };
}

function LazyMan(name) {
  return new Lazy(name);
}

// class _LazyMan {
//   constructor(name) {
//     this.taskList = [];
//     const task = () => {
//       console.log(`Hi! This is ${name}!`);
//       this.next();
//     };
//     this.taskList.push(task);
//     setTimeout(() => {
//       this.next();
//     }, 0);
//   }
//   next = () => {
//     const task = this.taskList.shift();
//     task && task();
//   };
//   sleep = (time) => {
//     const task = () => {
//       setTimeout(() => {
//         console.log(`Wake up after ${time}`);
//         this.next();
//       }, time * 1000);
//     };
//     this.taskList.push(task);
//     return this;
//   };
//   eat = (name) => {
//     const task = () => {
//       console.log(`Eat ${name}`);
//       this.next();
//     };
//     this.taskList.push(task);
//     return this;
//   };
//   sleepFirst = (time) => {
//     const task = () => {
//       setTimeout(() => {
//         console.log(`Wake up after ${time}`);
//         this.next();
//       }, time * 1000);
//     };
//     this.taskList.unshift(task);
//     return this;
//   };
// }
// function LazyMan(name) {
//   return new _LazyMan(name);
// }

// LazyMan("Hank");
// LazyMan("Hank").sleep(10).eat("dinner");
// LazyMan('Hank').eat('dinner').eat('supper')
LazyMan("Hank").sleepFirst(5).eat("supper");
