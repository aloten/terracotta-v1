// Range (inclusive)
// Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
//
// Example: 
// Generate numbers range 0..4
// range(0, 4, 1);
// [0, 1, 2, 3, 4]
export const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
