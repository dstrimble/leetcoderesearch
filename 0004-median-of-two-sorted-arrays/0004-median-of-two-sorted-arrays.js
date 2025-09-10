/*
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Constraints:
nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6
*/

function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    let m = nums1.length, n = nums2.length;
    let imin = 0, imax = m, halfLen = Math.floor((m + n + 1) / 2);
    while (imin <= imax) {
        let i = Math.floor((imin + imax) / 2);
        let j = halfLen - i;
        if (i < m && nums2[j - 1] > nums1[i]) {
            imin = i + 1;
        } else if (i > 0 && nums1[i - 1] > nums2[j]) {
            imax = i - 1;
        } else {
            let maxLeft;
            if (i === 0) {
                maxLeft = nums2[j - 1];
            } else if (j === 0) {
                maxLeft = nums1[i - 1];
            } else {
                maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
            }
            if ((m + n) % 2 === 1) {
                return maxLeft;
            }
            let minRight;
            if (i === m) {
                minRight = nums2[j];
            } else if (j === n) {
                minRight = nums1[i];
            } else {
                minRight = Math.min(nums1[i], nums2[j]);
            }
            return (maxLeft + minRight) / 2.0;
        }
    }
    return 0;
}

// Example usage:
console.log(findMedianSortedArrays([1,3], [2]));      // 2.00000
console.log(findMedianSortedArrays([1,2], [3,4]));    // 2.50000
