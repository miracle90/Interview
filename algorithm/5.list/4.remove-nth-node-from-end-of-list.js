// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
// 示例 1：
// 输入：head = [1,2,3,4,5], n = 2
// 输出：[1,2,3,5]
// 示例 2：
// 输入：head = [1], n = 1
// 输出：[]
// 示例 3：
// 输入：head = [1,2], n = 1
// 输出：[1]

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode();
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  while (n) {
    fast = fast.next;
    n--;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};
let h2 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null,
        },
      },
    },
  },
};
console.log(JSON.stringify(removeNthFromEnd(h2, 2)));
