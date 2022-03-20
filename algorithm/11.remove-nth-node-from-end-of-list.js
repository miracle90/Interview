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
//

/** 创建链表 */
function arrayToListNode(arr) {
  const listNode = new ListNode();
  let cur = listNode;
  while (arr.length) {
    cur.next = new ListNode(arr.shift());
    cur = cur.next;
  }
  return listNode.next;
}
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
const arr1 = [1, 2, 3, 4, 5];
const l1 = arrayToListNode(arr1);
const arr2 = [1];
const l2 = arrayToListNode(arr2);
const arr3 = [1, 2];
const l3 = arrayToListNode(arr3);

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode();
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
console.log(JSON.stringify(removeNthFromEnd(l1, 2)));
console.log(JSON.stringify(removeNthFromEnd(l2, 1)));
console.log(JSON.stringify(removeNthFromEnd(l3, 1)));
