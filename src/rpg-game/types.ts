import { BodyPart } from './BodyParts'

export type Character = {
  hp: number
  strength: number
}

export type Enemy = {
  stats: Character
  attack(): BodyPart
  block(): BodyPart
}
