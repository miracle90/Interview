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
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const head = new ListNode();
  let cur = head;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  //  如果while循环之后还有链表没有遍历完毕，拼接到后面
  cur.next = l1 ? l1 : l2;
  function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
  return head.next;
};
const list1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: {
        val: 5,
      },
    },
  },
};
const list2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
    },
  },
};
console.log(JSON.stringify(mergeTwoLists(list1, list2)));
