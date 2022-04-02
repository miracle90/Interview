// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
// 示例 1：
// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]
// 示例 2：
// 输入：head = [1,2]
// 输出：[2,1]
// 示例 3：
// 输入：head = []
// 输出：[]
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let cur = head
  let pre = null
  while (cur) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
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
console.log(JSON.stringify(reverseList(list)));
