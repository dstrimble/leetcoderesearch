// LeetCode: Spiral Matrix II
// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n^2 in spiral order.

/**
 * @param {number} n
 * @return {number[][]}
 */
function generateMatrix(n) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    let num = 1, left = 0, right = n - 1, top = 0, bottom = n - 1;
    while (left <= right && top <= bottom) {
        for (let i = left; i <= right; i++) matrix[top][i] = num++;
        top++;
        for (let i = top; i <= bottom; i++) matrix[i][right] = num++;
        right--;
        if (top <= bottom) {
            for (let i = right; i >= left; i--) matrix[bottom][i] = num++;
            bottom--;
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) matrix[i][left] = num++;
            left++;
        }
    }
    return matrix;
}

