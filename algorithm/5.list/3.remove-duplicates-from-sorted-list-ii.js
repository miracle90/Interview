// 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。

// 示例 1：
// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]
// 示例 2：
// 输入：head = [1,1,1,2,3]
// 输出：[2,3]

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head || !head.next) {
    return head;
  }
  const dummy = new ListNode();
  dummy.next = head;
  let cur = dummy;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const val = cur.next.val;
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
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
