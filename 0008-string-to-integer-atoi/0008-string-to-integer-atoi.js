/*
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:
- Whitespace: Ignore any leading whitespace (" ").
- Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
- Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
- Rounding: If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then round the integer to remain in the range. Specifically, integers less than -2^31 should be rounded to -2^31, and integers greater than 2^31 - 1 should be rounded to 2^31 - 1.
- Return the integer as the final result.

Example 1:
Input: s = "42"
Output: 42
Example 2:
Input: s = "   -042"
Output: -42
Example 3:
Input: s = "1337c0d3"
Output: 1337
Example 4:
Input: s = "0-1"
Output: 0
Example 5:
Input: s = "words and 987"
Output: 0

Constraints:
0 <= s.length <= 200
s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.
*/

function myAtoi(s) {
    const INT_MIN = -Math.pow(2, 31);
    const INT_MAX = Math.pow(2, 31) - 1;
    let i = 0, n = s.length;
    // Skip leading whitespace
    while (i < n && s[i] === ' ') i++;
    // Check sign
    let sign = 1;
    if (i < n && (s[i] === '-' || s[i] === '+')) {
        if (s[i] === '-') sign = -1;
        i++;
    }
    // Read digits
    let numStr = '';
    while (i < n && s[i] === '0') i++; // skip leading zeros
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        numStr += s[i];
        i++;
    }
    if (numStr.length === 0) return 0;
    let num = sign * parseInt(numStr, 10);
    if (num < INT_MIN) return INT_MIN;
    if (num > INT_MAX) return INT_MAX;
    return num;
}

// Example usage:
console.log(myAtoi("42"));           // 42
console.log(myAtoi("   -042"));      // -42
console.log(myAtoi("1337c0d3"));    // 1337
console.log(myAtoi("0-1"));         // 0
console.log(myAtoi("words and 987")); // 0
