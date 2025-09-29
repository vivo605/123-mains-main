export {}

type Person = {
  name: string
  age: number
  isMarried: boolean
  gender: 'm' | 'f'
  books: string[]
  address: {
    home: number
    street: string
  }
}

const persons: Person[] = [
  {
    name: 'Мишутка',
    age: 14,
    isMarried: true,
    gender: 'm',
    books: ['грокаем алгоритмы', 'дети капитана гранта'],
    address : {
      home: 12,
      street: 'Ленина',
    }
  },
  {
    name: 'Мишутка',
    age: 11,
    isMarried: false,
    gender: 'm',
    books: [],
    address: {
      home: 2,
      street: 'Ромашкино',
    },
  },
  {
    name: 'Виталий',
    age: 12,
    isMarried: false,
    gender: 'm',
    books: [],
    address: {
      home: 3,
      street: 'Ромашкино',
    },
  },
  {
    name: 'Вася',
    age: 32,
    isMarried: false,
    gender: 'm',
    books: [],
    address: {
      home: 30,
      street: 'Ленина',
    },
  },
  {
    name: 'Катюша',
    age: 14,
    isMarried: true,
    gender: 'f',
    books: ['кулинарные рецепты', 'Гарри Поттер'],
    address: {
      home: 14,
      street: 'Независимости',
    },
  },
  {
    name: 'Петя',
    age: 40,
    isMarried: true,
    gender: 'm',
    books: [],
    address: {
      home: 13,
      street: 'Проблемная',
    },
  },
]

// const notZero = numbers.filter((n) => n !== 0) // 2 5 7 3

const adultCount: number = (
  persons
    .filter((p) => (
      p.age >= 18 
      &&
      !p.isMarried
      &&
      p.gender === 'm'
    ))
    .length
)
print(`Взрослых холостяков: ${adultCount}`)

const presonsCount: number = persons.length

// const likeBook: boolean = (
//   persons
//     .filter((p) => p.books.length !== 0)
//     .length == persons.length
// )
const allHaveFavouriteBooks: boolean = persons.every(p => p.books.length !== 0)
print(`${allHaveFavouriteBooks ? 'Все' : 'Не все'} жители имеют любимые книги`)

const smthLikePoter: boolean = persons.some(p => p.books.includes('Гарри Поттер'))
print(`${smthLikePoter ? 'Есть любитель' : 'Нет любителей (бедный Гарри 😭😭😭)'} Гарри Поттера`)


// TODO: задания на редактирование
/*

- убрать чела по имени Вася (он мне по-крупному задолжал)в
- вернуть Васю обратно (пора откопать, он обещал исправиться)
- поставить за Васей Петю (будет за ним присматривать)

*/

const vasya = persons.find(p => p.name === 'Вася')
// const indexOfVasya = persons.findIndex(p => p.name === 'Вася')
if (vasya) {
  const indexOfVasya = persons.indexOf(vasya)
  print('Мы Васю не любим.Удаляю таких... 😔😔😔')
  persons.splice(indexOfVasya, 1)
  print('Удаление законченно 😎😎')
}

const averageAge = persons.reduce((sum, person) => sum + person.age, 0) / persons.length
print(`Средний возраст: ${averageAge} лет`)

// print('Persons: ' + persons.map((person) => person.name).join(', '))
// Persons: Мишутка, Мишутка, Виталий, Катюша, Петя

if (vasya) {
  const newIndex = Math.trunc(persons.length / 2)
  persons.splice(newIndex, 0, vasya)
  print('Вася сказал что исправится поэтому, время его откопать')

  const indexOfPetya = persons.findIndex(p => p.name === 'Петя')
  const Petya = persons[indexOfPetya]
  if (Petya) {
    persons.splice(indexOfPetya, 1)
    persons.splice(newIndex,0,Petya)
    print('Петя смотри за этим должником вдруг депнет)')
  }
}

print('Persons: ' + persons.map((person) => person.name).join(', '))
// Persons: Мишутка, Мишутка, Петя, Вася, Виталий, Катюша

print() // И что это за print?
print('=== Семейный статус ===')
const marriedStatus = (person: Person): string => {
  switch (person.gender) {
    case "m":
      return (
        person.isMarried 
          ? 'женат'
          : 'не женат'
      )
    case "f":
      return (
        person.isMarried 
          ? 'замужем'
          : 'не замужем'
      )
  }
}
persons.toSorted((p1, p2) => p2.name.localeCompare(p1.name, 'ru')).forEach(p => {
  print(`${p.name}: ${marriedStatus(p)}`)
})

print()
print('=== Имена ===')

type NamesCount = {
  [key in string]: number
}

const names: NamesCount = {}

for (const p of persons) {
  // if (p.name in names) {
  //   names[p.name]!++
  // } else{
  //   names[p.name] = 1
  // }
  const count = names[p.name]
  if (typeof count !== 'undefined') {
    names[p.name] = count + 1
  } else {
    names[p.name] = 1
  }
}

for (const name in names) {
  const count = names[name]
  print(`${name}: ${count}`)
}

// Аня: 0
// names['Аня'] = 0

print()
print('=== Улицы ===')
// console.log('Persons: ' + persons.map((person) => person.name).join(', '))
// console.log(persons.map((persons) => persons.address.street + ' ' person))

type Streets = {
  [key in string]: string[]
}


const streets: Streets = {}

for (const p of persons) {
  // if (!(p.address.street in streets)){
  //   streets[p.address.street] = []
  // }
  // streets[p.address.street]!.push(p.name)
 
  const names = streets[p.address.street] ?? []
  names.push(p.name)
  streets[p.address.street] = names
}

/*
улица1: имя1, имя2
улица2: имя3, имя4
*/

for (const street in streets) {
  const names = streets[street]!
  print(`${street}: ${names.join(', ')}`)
}
