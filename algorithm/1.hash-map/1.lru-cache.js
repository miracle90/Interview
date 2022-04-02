// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
// 示例：
// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]
// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4

// 双向链表实现 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cacheCount = 0;
  // 用对象来使 get 操作时间复杂度为O(1)
  this.cache = {};
  this.dummy = {
    key: "dummy",
    value: null,
    prev: null,
    next: null,
  };
  this.tail = {
    key: "tail",
    value: null,
    prev: this.dummy,
    next: null,
  };
  this.dummy.next = this.tail; // 初始化时cache中没有任何数据因此这两个指针互相指向对方
};
LRUCache.prototype.get = function (key) {
  const node = this.cache[key];
  if (!node) return -1;
  this.appendToHead(key); // 读取时，移到链表的头部
  return node.value;
};
LRUCache.prototype.put = function (key, value) {
  // 如果已经存在
  if (this.cache[key]) {
    this.cache[key].value = value;
    this.appendToHead(key);
    return;
  }
  // 容量已满，删除tail之前的节点
  if (this.cacheCount === this.capacity) this.deleteLast();
  const node = this.dummy.next;
  const newNode = {
    key,
    value,
    prev: this.dummy,
    next: node,
  };
  // console.log(newNode)
  // 每次put，都把节点，插入到 this.dummy.next
  this.dummy.next = newNode;
  node.prev = newNode;
  // 并且写入cache
  this.cache[key] = newNode;
  this.cacheCount++;
};
LRUCache.prototype.deleteLast = function () {
  const node = this.tail.prev;
  const prev = node.prev;
  this.tail.prev = prev;
  prev.next = this.tail;
  delete this.cache[node.key];
  this.cacheCount--;
};
// dummy.next 指向该节点
LRUCache.prototype.appendToHead = function (key) {
  const node = this.cache[key];
  node.prev.next = node.next;
  node.next.prev = node.prev;
  let initialNext = this.dummy.next;
  this.dummy.next = node;
  node.prev = this.dummy;
  node.next = initialNext;
  initialNext.prev = node;
};

// ["LRUCache","put","put","get","put","get","put","get","get","get"]
// [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
// [null,null,null,1,null,-1,null,-1,3,4]
const lRUCache = new LRUCache(2);
lRUCache.put(1, 1);
lRUCache.put(2, 2);
console.log(lRUCache.get(1));
lRUCache.put(3, 3);
console.log(lRUCache.dummy.next);
console.log(lRUCache.get(2));
lRUCache.put(4, 4);
console.log(lRUCache.get(1));
console.log(lRUCache.get(3));
console.log(lRUCache.get(4));

// Map实现 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// var LRUCache = function (capacity) {
//   this.capacity = capacity;
//   this.map = new Map();
// };
// LRUCache.prototype.get = function (key) {
//   if (!this.map.has(key)) return -1;
//   const value = this.map.get(key);
//   this.map.delete(key);
//   this.map.set(key, value);
//   return value;
// };
// LRUCache.prototype.put = function (key, value) {
//   if (this.map.has(key) || this.map.size < this.capacity) {
//     // 如果存在，或者小于容量，直接删除key，再set key和value
//     this.map.delete(key);
//     this.map.set(key, value);
//   } else {
//     // 当达到容量时，删除最久的一对key、value
//     this.map.delete(this.map.keys().next().value);
//     this.map.set(key, value);
//   }
// };
// 对象 + 数组实现，LeetCode上会导致超时，不建议使用 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// var LRUCache = function (capacity) {
//   this.capacity = capacity;
//   this.keys = [];
//   this.cache = {};
// };

// LRUCache.prototype.get = function (key) {
//   const idx = this.keys.indexOf(key);
//   if (idx === -1) {
//     return -1;
//   }
//   this.keys.push(this.keys.splice(idx, 1)[0]);
//   return this.cache[key];
// };

// LRUCache.prototype.put = function (key, value) {
//   const idx = this.keys.indexOf(key);
//   if (idx !== -1) {
//     // 如果已经存在了，把key放到keys的最后
//     this.keys.push(this.keys.splice(idx, 1)[0]);
//   } else {
//     // 如果不存在，判断是否当前已经到达容量
//     if (this.capacity <= this.keys.length) {
//       const firstKey = this.keys.shift();
//       this.cache[firstKey] = null;
//     }
//     this.keys.push(key);
//   }
//   // 将value赋给this.cache[key]，防止key相同，value不同的情况
//   this.cache[key] = value;
// };
