/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var mergeTwoLists = function(list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  let head;
  let other;
  if (list1.val < list2.val) {
    head = list1;
    other = list2;
  } else {
    head = list2;
    other = list1;
  }

  let curr = head;
  while (curr.next !== null) {
    if (other.val < curr.next.val) {
      const tmp = curr.next;
      curr.next = other;
      other = tmp;
    }
    curr = curr.next;
  }
  curr.next = other;
  return head;
}
