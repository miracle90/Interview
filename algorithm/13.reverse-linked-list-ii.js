// 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

// 示例 1：
// 输入：head = [1,2,3,4,5], left = 2, right = 4
// 输出：[1,4,3,2,5]

// 示例 2：
// 输入：head = [5], left = 1, right = 1
// 输出：[5]

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
const arr2 = [5];
const l2 = arrayToListNode(arr2);

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  const dummy = new ListNode();
  dummy.next = head;
  let p = dummy;
  for (let i = 0; i < left - 1; i++) {
    // 遍历到反转区间的前一个
    p = p.next;
  }
  // 把反转区间之前的值暂存起来，后面使用
  let leftHead = p;
  // 开始进入反转区间，记录第一个节点为start，之后的循环结束，需要设置 start.next
  let start = leftHead.next;
  let pre = start;
  let cur = pre.next;
  for (let i = left; i < right; i++) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  leftHead.next = pre;
  start.next = cur;
  return dummy.next;
};
console.log(JSON.stringify(reverseBetween(l1, 2, 4)));
console.log(JSON.stringify(reverseBetween(l2, 1, 1)));
