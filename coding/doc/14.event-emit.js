class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, cb) {
    if (this.events[eventName]) {
      this.events[eventName].push(cb);
    } else {
      this.events[eventName] = [cb];
    }
  }
  emit(eventName, ...args) {
    if (this.events[eventName] && this.events[eventName].length) {
      this.events[eventName].forEach((fn) => fn.call(this, ...args));
    }
  }
  off(eventName, cb) {
    if (this.events[eventName] && this.events[eventName].length) {
      this.events[eventName] = this.events[eventName].filter((fn) => fn !== cb);
    }
  }
  once(eventName, cb) {
    // 新建一个函数，将该函数push进events[eventName]
    const fn = (...args) => {
      cb.call(this, ...args);
      // 将自己off掉
      this.off(eventName, fn);
    };
    this.on(eventName, fn);
  }
}
const f1 = (a, b, c) => {
  console.log("f1", a, b, c);
};
const f2 = (a, b, c) => {
  console.log("f2", a, b, c);
};
const f3 = (a, b, c) => {
  console.log("f3", a, b, c);
};
const myEvent = new MyEventEmitter();
myEvent.on("event1", f1);
myEvent.on("event1", f2);
myEvent.emit("event1", 3, 4, 5);
console.log("++++++++++++");
myEvent.on("event2", f2);
myEvent.once("event2", f3);
myEvent.emit("event2", 6, 6, 6);
console.log("++++++++++++");
myEvent.emit("event2", 6, 6, 6);
console.log("++++++++++++");
myEvent.off("event1", f2);
myEvent.emit("event1", 3, 4, 5);
