// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
//
// 示例 1：
// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

// 示例 2：
// 输入：head = [1,2]
// 输出：[2,1]

// 示例 3：
// 输入：head = []
// 输出：[]

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
 * @return {ListNode}
 */
var reverseList = function (head) {
  let pre = null;
  let cur = head;
  while (cur) {
    // 取出next
    let next = cur.next;
    // 反转指针
    cur.next = pre;
    // pre继续向前走一步
    pre = cur;
    // cur继续向前走一步
    cur = next;
  }
  return pre;
};

console.log(JSON.stringify(reverseList(l1)));
console.log(JSON.stringify(reverseList(l2)));
console.log(JSON.stringify(reverseList(l3)));
