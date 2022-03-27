function tree(val) {
  this.left = this.right = null;
  this.val = val;
}
const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D",
    },
    right: {
      val: "E",
    },
  },
  right: {
    val: "C",
    right: {
      val: "F",
    },
  },
};
function pre(root) {
  if (!root) return null;
  console.log(root.val);
  pre(root.left);
  pre(root.right);
}
pre(root);
console.log("----------------");
function mid(root) {
  if (!root) return null;
  mid(root.left);
  console.log(root.val);
  mid(root.right);
}
mid(root);
console.log("----------------");
function post(root) {
  if (!root) return null;
  post(root.left);
  post(root.right);
  console.log(root.val);
}
post(root);
console.log("----------------");
