/*
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Example 2:
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

Constraints:
The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
*/

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseKGroup(head, k) {
    let count = 0;
    let node = head;
    while (node && count < k) {
        node = node.next;
        count++;
    }
    if (count < k) return head;
    let prev = null, curr = head, next = null;
    count = 0;
    while (curr && count < k) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
        count++;
    }
    if (next) {
        head.next = reverseKGroup(next, k);
    }
    return prev;
}

// Helper functions for testing
function arrayToList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

function listToArray(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// Example usage:
const l1 = arrayToList([1,2,3,4,5]);
console.log(listToArray(reverseKGroup(l1, 2))); // [2,1,4,3,5]
const l2 = arrayToList([1,2,3,4,5]);
console.log(listToArray(reverseKGroup(l2, 3))); // [3,2,1,4,5]
