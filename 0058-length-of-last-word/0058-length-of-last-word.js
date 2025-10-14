// LeetCode: Length of Last Word
// Given a string s consisting of words and spaces, return the length of the last word in the string.

/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLastWord(s) {
    let i = s.length - 1;
    // Skip trailing spaces
    while (i >= 0 && s[i] === ' ') i--;
    let length = 0;
    // Count the length of the last word
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }
    return length;
}

// Example usage:
console.log(lengthOfLastWord("Hello World")); // 5
console.log(lengthOfLastWord("   fly me   to   the moon  ")); // 4
console.log(lengthOfLastWord("luffy is still joyboy")); // 6
