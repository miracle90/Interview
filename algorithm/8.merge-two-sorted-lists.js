// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
// 示例 1：
// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]
// 示例 2：
// 输入：l1 = [], l2 = []
// 输出：[]
// 示例 3：
// 输入：l1 = [], l2 = [0]
// 输出：[0]
var deleteDuplicates = function (head) {
  var cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
};
let h1 = {
  val: 1,
  next: {
    val: 1,
    next: {
      val: 2,
      next: null,
    },
  },
};
let h2 = {
  val: 1,
  next: {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 3,
          next: null,
        },
      },
    },
  },
};
let h3 = {
  val: 1,
  next: {
    val: 1,
    next: null,
  },
};
console.log(deleteDuplicates(h1));
console.log(deleteDuplicates(h2));
console.log(deleteDuplicates(h3));
