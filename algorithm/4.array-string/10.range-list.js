class RangeList {
  constructor() {
    this.list = [];
  }
  add(range) {
    if (!this.list.length) {
      this.list = [range];
      return;
    }
    this.list.push(range);
    this.list = this.list.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i + 1] && this.list[i][1] >= this.list[i + 1][0]) {
        this.list[i][1] = Math.max(
          this.list[i][1],
          this.list[i + 1][0],
          this.list[i + 1][1]
        );
        this.list.splice(i + 1, 1);
        i--;
      }
    }
  }
  remove(range) {
    for (let i = 0; i < this.list.length; i++) {
      // 有交集
      if (range[0] < this.list[i][1] && range[1] > this.list[i][0]) {
        if (range[1] >= this.list[i][1]) {
          if (range[0] > this.list[i][0]) {
            this.list[i][1] = range[0];
          } else {
            this.list.splice(i, 1);
            i--;
          }
        } else {
          if (range[0] <= this.list[i][0]) {
            this.list[i][0] = range[1];
          } else {
            this.list.splice(i + 1, 0, [range[1], this.list[i][1]]);
            this.list[i][1] = range[0];
            i++;
          }
        }
      }
    }
  }
  print() {
    console.log(this.list);
  }
}
const r1 = new RangeList();
r1.add([1, 5]);
r1.print(); // [[1,5]]
r1.add([10, 20]);
r1.print(); // [[1,5], [10, 20]]
r1.add([20, 20]);
r1.print(); // [[1,5], [10, 20]]
r1.add([20, 21]);
r1.print(); // [[1,5], [10, 21]]
r1.add([2, 4]);
r1.print(); // [[1,5], [10, 21]]
r1.add([3, 8]);
r1.print(); // [[1,8], [10, 21]]
console.log("+++++++++++++++++++++");
r1.remove([10, 10]);
r1.print(); // [[1,8], [10, 21]]
r1.remove([10, 11]);
r1.print(); // [[1,8], [11, 21]]
r1.remove([15, 17]);
r1.print(); // [[1,8], [11, 15], [17, 21]]
r1.remove([3, 19]);
r1.print(); // [[1,3],[19, 21]]
