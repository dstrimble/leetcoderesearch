function isPalindrome(x) {
    if (x < 0) return false;
    const str = x.toString();
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

// Example usage:
console.log(isPalindrome(121));   // true
console.log(isPalindrome(-121));  // false
console.log(isPalindrome(10));    // false
