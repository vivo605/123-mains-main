import { relative } from "path"

export {}
/*
5. Тамагочи

- создать 2 животных (кот и собака), придумать им клички, научить команде "голос"
- создать функцию, которая принимает животное и даёт ему кманду "голос"
(показывать на экране - кто и что сказал)

- собака радостно лает или злобно рычит
- кот мяучит или бросает философскую цитатку

в процессе бесконечно можем делать:
- покормить питомца
- заставить выполнять команду "голос"

В зависимости от того, накормлен ли питомец, он издаёт разные звуки.
Спустя случайное время после кормления животное сново проголодается.
(от голода никто не умирает!)

Дополнительно, собака умеет приносить мячик, а кот умеет гадить в тапочек :3
Это действие животное может выполнить вместо команды "голос" независимо от накормленности.
*/

// Pet
// isSleeping

abstract class Pet {
  readonly name: string
  #isSleeping: boolean
  #onHome: boolean
  readonly abstract type: string

  protected _energy: number
  protected readonly abstract _additionalActions: string

  get availableActions() {
    return (
      '1. eat \n' +
      '2. voice \n' +
      '3. sleep \n' +
      '4. wake up \n' +
      this._additionalActions+
      '6. home \n'
      // '5. surprise | get ball \n'
    )
  }

  get isSleeping() {
    return this.#isSleeping
  }

  constructor(name: string) {
    this.name = name
    this.#isSleeping = false
    this._energy = 0
    this.#onHome = false
  }

  home() {
    if (this.#onHome) {
      print('Я и так у тебя дома или у тебя нет дома..)')
    }
    else{
      print('Вы забрали существо домой))')
    }
  }

  protected abstract _voice(): void
  
  sleep() {
    if (this.#isSleeping) {
      print(`${this.name} уже спит`)
    }
    else {
      this.#isSleeping = true
      print(`${this.name} уснул`)
    }
  }

  wakeUp() {
    if (this.#isSleeping) {
      this.#isSleeping = false
      print(`${this.name} проснулся`)
    }
    else {
      print(`${this.name} и так не спит`)
    }
  }

  voice() {
    if (this.#isSleeping) {
      return print(`${this.name} спит`)
    }

    this._voice()
  }

  eat() {
    this._energy = random(1, 3)
    print(`${this.name} наелся :Ъ`)
  }
}

class Cat extends Pet {
  readonly type: string
  constructor(name: string) {
    super(name)
    this.type = 'кот'
  }

  protected _voice() {
    if (this._energy > 0){
      print('Мяу :3')
      this._energy--
    } else {
      print('Цитаты великих котов: "Не откладывай на завтра то, что можно съесть сегодня..." 👆')
    }
  }

  getSurprise() {
    if (this._energy < 1){
      print('Я накакал тебе в тапки.Теперь еду давай :3') //:3
    }
    else{
      print('Что то я не то сьел.Загляни в тапки)')
    }
  }

  protected get _additionalActions() {
    return '5. surprise'
  }
}

class Dog extends Pet {
  readonly type = 'пёс'

  protected _voice(){
    if (this._energy > 0){
      print('Гаф :3')
      this._energy--
    }
    else{
      print('Жрать хочу >:(')
    }
  }

  protected get _additionalActions() {
    return '5. get ball'
  }

  getBall() {
    print('Кинь мячик ещё раз')
    this._energy--
  }
}

// class Dog {} // !

// 1. eat2. voice3. sleep4. wakeUp5. surprise

// input('Как зовут кота или гибрида): ')


const cat1 = new Cat('Матроскин')
const cat2 = new Cat('Васька')
const dog = new Dog('Шарик')

// не надо так 😡  
// class home
// Home.callRandomPet()

class Home {
  allPetsAreSleeping: boolean
  
  constructor() {
    this.allPetsAreSleeping = false
  }

  home() {
    if (this.allPetsAreSleeping) {
      print('Мы и так дома')
    }
  }

}

const home = new Home()

loop: while (true) {
  print()
  // const pet: Pet = random(0, 1) ? cat : dog
  const pet = home.callRandomPet()
  print(`Это ${pet.type}, его зовут ${pet.name}`)

  print(pet.availableActions)
  const input_actions = input('Выберите действие: ').toLowerCase()
  switch (input_actions) {
    case "eat":
      pet.eat()
      break;

    case "voice":
      pet.voice()
      break;

    case "sleep":
      pet.sleep()

      // if (cat.isSleeping || dog.isSleeping){
      if (home.allPetsAreSleeping){
        print('Все уснули, хватит их дёргать)')
        break loop
      }
      break;

    case "wake up":
      pet.wakeUp()
      break;

    case "surprise":
      if (pet instanceof Cat) {
        pet.getSurprise()
      } else {
        console.log("Это действие доступно только для кота! Или у тебя гебрид?...");
      }
      break;

    case "get ball":
      if (pet instanceof Dog) {
        pet.getBall()
      } else {
        console.log("Это действие доступно только для собаки! Или у тебя гебрид?...")
      }
      break;

    case 'home':
      Pet.home()
    default:
      console.log("Выбери реальное действие")
      break;
  }

}


// // примеры
// print(`Кота зовут: ${cat.name}`)
// cat.sleep() // Васька уснул / Васька уже спит 
// cat.wakeUp() // Васька проснулся / Васька и так не спит
// cat.voice() // Мяу :3 / Не откладывай на завтра то, что можно съесть сегодня...
// cat.isSleeping
// cat.eat() // energy [1..3]
// // cat.#energy

/*
Домашка:
7.3 - дописать все CorrectNumber
7.4 - переписать с использованием классов
7.5 - доделать цикл с выбором действий
*/