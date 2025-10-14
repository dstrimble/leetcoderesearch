// LeetCode: Permutation Sequence
// Given n and k, return the kth permutation sequence of [1, 2, ..., n].

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
function getPermutation(n, k) {
    const nums = [];
    for (let i = 1; i <= n; i++) nums.push(i);
    let factorial = Array(n).fill(1);
    for (let i = 1; i < n; i++) factorial[i] = factorial[i - 1] * i;
    k--;
    let res = '';
    for (let i = n; i >= 1; i--) {
        const idx = Math.floor(k / factorial[i - 1]);
        res += nums[idx];
        nums.splice(idx, 1);
        k %= factorial[i - 1];
    }
    return res;
}

// Example usage:
console.log(getPermutation(3, 3)); // "213"
console.log(getPermutation(4, 9)); // "2314"
console.log(getPermutation(3, 1)); // "123"
