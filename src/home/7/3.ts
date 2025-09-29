export {}

/*

type Client = {
  company: true
  representative: User 
} | { 
  company: false
  name: string 
}

const entity: Client = {
  company: true,
  representative: user,
}

const individual: Client = {
  company: false,
  name: 'Tom',
}

const greetClient = (client: Client) => {
  if (client.company) {
    print(`Здравствуйте, ${client.representative.name}!`)
  } else {
    print(`Приветствуем, ${client.name}.`)
  }
}

  3. numberInfo
  Создать функцию, которая принимает число и возвращает информацию для будущих проверок, является ли оно:
  - корректным (не NaN или не бесконечность)
  - целым, дробным или бесконечным (некорректное и не NaN)
  - положительным или отрицательным (для целых, дробных или бесконечных) или ноль (для целых или дробных)
  - чётным или нечётным (для целых)

  а также
  - целую часть (для дробного числа)
  - на какое максимальное целое число можно поделить целую часть без остатка, кроме самого себя (для целого числа)
  12 6
  2 1
  0 1
  -6 3

  // вариативные типы

  Целые числа
  - положительным или отрицательным, или ноль
  - чётным или нечётным (isEven | isOdd)
  ! на какое максимальное целое число можно поделить целую часть без остатка, кроме самого себя

  Дробное число FloatNumber
  - положительным или отрицательным
  - целую часть integerPart
*/

// abstract
type CorrectNumber = {
  isCorrect: true
  isPositive: boolean // Optional property to indicate if the number is positive
}

type FloatNumber = CorrectNumber & {
  sign: 'positive' | 'negative'
  integerPart: number
  // Math.trunc
}

type IntegerNumber = CorrectNumber & {
  sign: 'positive' | 'negative' | 'ignore'
  isEven: boolean
  isOdd: boolean
}

// abstract
type IncorrectNumber = {
  isCorrect: false
}

type InfinityNumber = IncorrectNumber & {
  isInfinity: true
  sign: 'positive' | 'negative'
}

type NotNumber = IncorrectNumber & {
  isInfinity: false
}

type NumberInfo = IntegerNumber | FloatNumber | InfinityNumber | NotNumber

const numberInfo = (n: number): NumberInfo => {
  if (isFinite(n)) {
    // TODO: заменить на IntegerNumber и FloatNumber
    return {
      isCorrect: true,
      isPositive: n > 0, 
    } satisfies CorrectNumber
  } else {
    const isInfinity = !isNaN(n)
    if (isInfinity) {
      return {
        isCorrect: false,
        isInfinity: true,
        sign: n > 0 ? 'positive' : 'negative',
      } satisfies InfinityNumber
    } else {
      return {
        isCorrect: false,
        isInfinity: false,
      } satisfies NotNumber
    }
  }
}


// start
const n = Number(input('> '))
const info = numberInfo(n)
if (!info.isCorrect && info.isInfinity) {
  info.sign
} else {
  // info.isPositive
}

