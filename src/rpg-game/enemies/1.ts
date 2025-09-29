// Enemy 1: всегда целится туда, куда мы заранее знаем
import { Enemy } from '../types'
import { BodyPart } from '../BodyParts'

export class Enemy1 implements Enemy {
  stats = {
    hp: 5,
    strength: 1,
  }
  attack(): BodyPart {
    return 'torso'
  }
  block(): BodyPart {
    return 'head'
  }
}
