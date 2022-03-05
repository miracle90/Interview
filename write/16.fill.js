let arr = new Array(8)

Array.prototype.myFill = function(value, start = 0, end = this.length) {
  if (start < end) {
    this[start] = value
    this.myFill(value, start + 1, end)
  }
  return this
}

let a1 = [...arr].myFill(true)
let a2 = [...arr].myFill('a', 3, 6)
console.log(arr)
console.log(a1)
console.log(a2)