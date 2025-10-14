/**
 * LeetCode #60: Permutation Sequence
 * Find the kth permutation of numbers 1 to n.
 * 
 * Key Insight:
 * Instead of generating all permutations, we can calculate the kth permutation directly:
 * 1. For n numbers, there are (n-1)! permutations that start with each number
 * 2. By dividing k by (n-1)! we can find which number comes first
 * 3. Update k and repeat the process with remaining numbers
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * @param {number} n - Range of numbers (1 to n)
 * @param {number} k - The kth permutation to find
 * @return {string} - The kth permutation sequence
 */
function getPermutation(n, k) {
    // Create array of numbers and factorials
    const numbers = Array.from({length: n}, (_, i) => i + 1);
    const factorials = [1];
    
    // Precompute factorials up to (n-1)!
    for (let i = 1; i < n; i++) {
        factorials[i] = factorials[i-1] * i;
    }
    
    // Convert k to 0-based indexing
    k = k - 1;
    
    let result = '';
    
    // Build the permutation digit by digit
    while (numbers.length > 0) {
        // Calculate which number goes next
        const index = k / factorials[numbers.length - 1] | 0;
        k = k % factorials[numbers.length - 1];
        
        // Add the number to result and remove it from available numbers
        result += numbers.splice(index, 1)[0];
    }
    
    return result;
}

// Test cases
console.log(getPermutation(3, 3)); // Expected: "213"
console.log(getPermutation(4, 9)); // Expected: "2314"
console.log(getPermutation(3, 1)); // Expected: "123"

// Explanation of how it works for n=3, k=3:
// Initial numbers: [1,2,3]
// Factorials: [1,1,2]
// 
// First digit: k=2 (0-based), 2/(2!) = 1, so we take numbers[1] = 2
// Remaining numbers: [1,3], k=0
// Second digit: 0/(1!) = 0, so we take numbers[0] = 1
// Remaining numbers: [3], k=0
// Last digit: Only one choice left, take 3
// Result: "213"
