/*
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:
Input: x = 123
Output: 321
Example 2:
Input: x = -123
Output: -321
Example 3:
Input: x = 120
Output: 21

Constraints:
-2^31 <= x <= 2^31 - 1
*/

function reverse(x) {
    const INT_MIN = -Math.pow(2, 31);
    const INT_MAX = Math.pow(2, 31) - 1;
    let sign = x < 0 ? -1 : 1;
    let rev = 0;
    x = Math.abs(x);
    while (x > 0) {
        rev = rev * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    rev *= sign;
    if (rev < INT_MIN || rev > INT_MAX) return 0;
    return rev;
}

// Example usage:
console.log(reverse(123));   // 321
console.log(reverse(-123));  // -321
console.log(reverse(120));   // 21
