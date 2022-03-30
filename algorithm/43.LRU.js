var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
};
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const value = this.map.get(key);
  this.map.delete(key);
  this.map.set(key, value);
  return value;
};
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key) || this.map.size < this.capacity) {
    this.map.delete(key);
    this.map.set(key, value);
  } else {
    this.map.delete(this.map.keys().next().value);
    this.map.set(key, value);
  }
};


const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get(1));    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache.get(2));    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache.get(1));    // 返回 -1 (未找到)
console.log(lRUCache.get(3));    // 返回 3
console.log(lRUCache.get(4));    // 返回 4
