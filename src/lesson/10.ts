export {}

function f1<TParam>(p: TParam): TParam {
  console.log(p)
  return p
}

const v = f1<string>('1')

type F1 = <T>(p: T) => T

const f11: F1 = f1
f11<number>(1)

type F2<T> = (p: T) => T

const f22: F2<number> = f1
f22(1)



type Container<T> = {
  value: T
  index: number
}

const studentsNames: Container<string>[] = [
  {
    index: 0,
    value: 'Jerry',
  }
]

const takeValue = <T>(container: Container<T>): T => {
	return container.value
}

const value = takeValue({
  index: 0,
  value: true
})



class TestClass<T1, T2 extends T1> {
  value: T2

  constructor(p: T1) {
    this.value = p as T2
  }
}

const t = new TestClass(1)
t.value
