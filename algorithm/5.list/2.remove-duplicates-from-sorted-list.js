// 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
// 示例 1：
// 输入：head = [1,1,2]
// 输出：[1,2]
// 示例 2：
// 输入：head = [1,1,2,3,3]
// 输出：[1,2,3]
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let cur = head;
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
