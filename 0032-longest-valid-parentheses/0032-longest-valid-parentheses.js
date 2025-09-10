/*
Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.

Example 1:
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
Example 2:
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
Example 3:
Input: s = ""
Output: 0

Constraints:
0 <= s.length <= 3 * 10^4
s[i] is '(', or ')'.
*/

function longestValidParentheses(s) {
    let maxLen = 0;
    const dp = Array(s.length).fill(0);
    for (let i = 1; i < s.length; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === '(') {
                dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
    }
    return maxLen;
}

// Example usage:
console.log(longestValidParentheses("(()"));      // 2
console.log(longestValidParentheses(")()())"));   // 4
console.log(longestValidParentheses(""));         // 0
