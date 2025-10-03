export {}

// CustomArray
// array.push(4)



class CustomArray<T extends any> {
  items: T[]
  
  get length(): number {
    return this.items.length
  }

  constructor(...items: T[]) {
    this.items = items
  }

  at(index: number): T | undefined {
    if (index >= 0) {
      return this.items[index] 
    } else {
      return this.items[this.length + index]
    }
  }

  // push(item: T) {
  //   this.items[this.length] = item
  // }
  
  push(...items: T[]) {
    for (const n of items) { 
      this.items[this.length] = n  
    }
  }

  pop(): T | undefined {
    const lastItem = this.items[this.length - 1]
    this.items.length--
    return lastItem
  }

  // map

  map(callback: (value: T, index: number) => string): string[] {
    const newArray: string[] = []
    
    for (let i = 0; i < this.items.length; i++) {
      const r = callback(this.items[i]!, i)
      newArray[i] = r 
    }
    
    return newArray
  }

  // filter
} 


const r = [1,2,3].map(n => String(n + 1))
// Array<number>.map<string>(callback: (value: number, index: number) => string): string[]
console.log(r)

// string | number

// const array = new CustomArray(1, 2, 3)

// console.log(array.length) // 3
// console.log(array.pop()) // 3
// console.log(array.items)
// console.log(array.length)

// const texts = new CustomArray('a', 'b', 'c')
// const i1 = texts.at(0)
