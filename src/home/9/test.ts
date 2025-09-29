export {}
const nums = [1,2,3]
let sum = 0

// for (let i = 0; i < nums.length; i++) {
//   sum += nums[i]!
// }

for (const n of nums) {
  sum += n
}

console.log(sum)

