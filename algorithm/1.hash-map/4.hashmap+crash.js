class HashMap {
  constructor(size) {
    this.table = new Array(size);
    this.size = 0;
  }
  // 哈希函数，将value转化，计算出存储的key
  hashConversion(value) {
    let keyCode = 0;
    for (let item of value) {
      keyCode += item.charCodeAt(0);
    }
    console.log(keyCode);
    let key = keyCode % this.table.length;
    return key;
  }
  set(value) {
    let key = this.hashConversion(value);
    // this.size++;
    // this.table[key] = value;
    while (this.table[key] !== undefined && this.table[key] !== value) {
      key++;
      if (key >= this.table.length) {
        throw new Error("已经没有可用空间");
      }
    }
    if (this.table[key] !== value) {
      this.size++;
      this.table[key] = value;
    }
  }
  get(value) {
    let key = this.hashConversion(value);
    while (this.table[key] !== undefined && this.table[key] !== value) {
      key++;
      if (key >= this.table.length) {
        return undefined;
      }
    }
    return this.table[key];
  }
  delete(value) {
    let key = this.hashConversion(value);
    while (this.table[key] !== undefined && this.table[key] !== value) {
      key++;
      if (key >= this.table.length) {
        return false;
      }
    }
    this.table[key] = undefined;
    this.size--;
    return true;
  }
  has(value) {
    let key = this.hashConversion(value);
    while (this.table[key] !== undefined && this.table[key] !== value) {
      key++;
      if (key >= this.table.length) {
        return false;
      }
    }
    if (this.table[key] !== undefined) {
      return true;
    } else {
      return false;
    }
  }
  showAllData() {
    let result = [];
    for (let item of this.table) {
      if (item !== undefined) {
        result.push(item);
      }
    }
    return result;
  }
}
// 1、很明显没有做冲突的处理，当输入的值发生冲突时，我们就没有办法得到想要的结果，在这里扩展上方代码，用线性探测法进行冲突处理。
let hashTable = new HashMap(10);
hashTable.set("1");
hashTable.set("aa");
hashTable.set("6a");
hashTable.set("75");
console.log("size:" + hashTable.size);
console.log(hashTable.showAllData());
