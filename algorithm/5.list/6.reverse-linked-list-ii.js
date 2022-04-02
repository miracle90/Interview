// 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
// 示例 1：
// 输入：head = [1,2,3,4,5], left = 2, right = 4
// 输出：[1,4,3,2,5]
// 示例 2：
// 输入：head = [5], left = 1, right = 1
// 输出：[5]
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let dummy = new ListNode();
  dummy.next = head;
  let leftHead = dummy;
  for (let i = 0; i < left - 1; i++) {
    leftHead = leftHead.next;
  }
  let start = leftHead.next;
  let prev = start;
  let cur = prev.next;
  for (let i = left; i < right; i++) {
    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next    
  }
  leftHead.next = prev
  start.next = cur
  return dummy.next
};
let list = {
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
console.log(JSON.stringify(reverseBetween(list, 2, 4)));
