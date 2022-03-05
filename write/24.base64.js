let arr = []

for (let i = 0; i < 62; i++) {
  if (i < 10) {
    arr.push(i)
  } else if (i < 36) {
    arr.push(String.fromCharCode(i + 87))
  } else {
    arr.push(String.fromCharCode(i - 26 + 87).toUpperCase())
  }
}

console.log(arr)