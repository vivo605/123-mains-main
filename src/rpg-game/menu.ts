// const result = menu('Выбери что-то там', {
//   head: 'голова',
//   arms: 'руки',
// })

export function menu<V extends string>(title: string, options: Record<V, string>): V {
  print(title)

  let i = 0
  for (const optionValue in options) {
    i++
    const optionName = options[optionValue]!
    print(`${i}.${optionName}`)
  }
  
  while (true) {
    const answer = input('> ')
    const n = Number(answer)
    const keys = Object.keys(options) as V[]
    const part = keys[n - 1]
    // if (isFinite(n) && Number.isInteger(n) && n >= 1 && n <= BodyParts.length) {
    if (typeof part !== 'undefined') {
      return part
    }
    print(`Нужно ввести цифру от 1 до ${keys.length}`)
  }
}

/*
Выбери что-то там
1. голова
> 1
*/
