// Enemy 2: Выбирает случайную цель на весь раунд
import { Enemy } from '../types'
import { BodyPart, randomBodyPart } from '../BodyParts'


export class Enemy2 implements Enemy {
  stats = {
    hp: 5,
    strength: 2,
  }

  #attack = randomBodyPart()
  #block = randomBodyPart()

  attack(): BodyPart {
    return this.#attack
  }
  block(): BodyPart {
    return this.#block
  }
}
