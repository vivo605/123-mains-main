export {}

// CustomArray
// array.push(4)



class CustomArray {
  numbers: number[]
  
  get length(): number {
    return this.numbers.length
  }

  constructor(...numbers: number[]) {
    this.numbers = numbers
  }
  
  push(number: number) {
    // this.numbers.push(number)
    this.numbers[this.length] = number
  }
}


const array = new CustomArray(1, 2, 3)
console.log(array.length) // 3
array.push(4)
console.log(array.numbers)
console.log(array.length) // 4

// const texts = new CustomArray('a', 'b', 'c')
