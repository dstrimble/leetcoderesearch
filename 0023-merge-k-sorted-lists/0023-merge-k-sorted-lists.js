/*
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6
Example 2:
Input: lists = []
Output: []
Example 3:
Input: lists = [[]]
Output: []

Constraints:
k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 10^4.
*/

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function mergeKLists(lists) {
    const heap = [];
    for (let node of lists) {
        if (node) heap.push(node);
    }
    heap.sort((a, b) => a.val - b.val);
    const dummy = new ListNode(0);
    let current = dummy;
    while (heap.length) {
        let node = heap.shift();
        current.next = node;
        current = current.next;
        if (node.next) {
            // Insert in sorted order
            let idx = heap.findIndex(n => n.val > node.next.val);
            if (idx === -1) heap.push(node.next);
            else heap.splice(idx, 0, node.next);
        }
    }
    return dummy.next;
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
const lists1 = [[1,4,5],[1,3,4],[2,6]].map(arrayToList);
console.log(listToArray(mergeKLists(lists1))); // [1,1,2,3,4,4,5,6]
console.log(listToArray(mergeKLists([]))); // []
console.log(listToArray(mergeKLists([arrayToList([])]))); // []
