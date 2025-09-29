const nums = [1,2,3]
// const sum = nums.reduce(
//   (counter, n, i) => {
//     return counter + n
//   },
//   0
// )
const sum = nums.reduce((counter, n) => counter + n)
console.log(sum)