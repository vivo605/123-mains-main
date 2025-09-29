export {}

// ООП
/*
  - инкапсуляция (скрыть часть данных)
  - наследование (заимствовать логику)
  - полиморфизм (работа с абстракциями)

  const userInterface: UserInterface = {
  name: 'noname',
  age: 10,
}

*/

class Container {
  #value: number

  get value() {
    return this.#value
  }

  set value(value: number) {
    if (this.#value < value) {
      this.#value = value
    }
  }

  constructor(v: number = 0) {
    this.#value = v
  }

  inc() {
    this.#value++
  }
}

type MyObject = {
  readonly value: number
  name: string
  inc(): void
}

const object = (v: number = 0): MyObject => {
  const obj = {
    value: v,
    name: 'asd',
    inc: () => {
      obj.value++
    }
  }
  return obj
}

const c = new Container(12)
const o = object(12)

console.log(c) // Container { value: 12 }
console.log(o) // { value: 12 }

console.log(c instanceof Container) // true
console.log(o instanceof Container) // false

c.value--
// c.test

c.inc()
o.inc()
o.name
console.log(c.value === o.value)


class SuperContainer extends Container {
  test: string

  constructor(v: number) {
    super(v)
    this.test = 'text'
  }
}

const c2 = new SuperContainer(12)
c2.inc()
c2.value
c2.test
