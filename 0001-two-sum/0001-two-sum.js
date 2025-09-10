// Efficient O(n) solution using a hash map
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Example usage:
console.log(twoSum([2,7,11,15], 9)); // Output: [0,1]
console.log(twoSum([3,2,4], 6));     // Output: [1,2]
console.log(twoSum([3,3], 6));       // Output: [0,1]