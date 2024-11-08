#include <stddef.h>
/**
 * Definition for singly-linked list.
 */
struct ListNode {
   int val;
   struct ListNode *next;
};

struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    if (list1 == NULL) return list2;
    if (list2 == NULL) return list1;

    struct ListNode* head;
    struct ListNode* other;
    if (list1->val < list2->val) {
        head = list1;
        other = list2;
    } else {
        head = list2;
        other = list1;
    }
    struct ListNode* curr = head;

    while(curr->next != NULL) {
        if (curr->next->val > other->val) {
            struct ListNode* tmp = curr->next;
            curr->next = other;
            other = tmp;
        }
        curr = curr->next;
    }
    curr->next = other;
    return head;
}
