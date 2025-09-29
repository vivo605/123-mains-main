import { menu } from "./menu"

export type BodyPart = typeof body_parts[number]

export const body_parts = ['head', 'arms' , 'torso' , 'legs'] as const

export function randomBodyPart(): BodyPart {
  return body_parts[random(0, body_parts.length-1)]!
}

export const body_parts_ru: Record<BodyPart, string> = {
  head: 'голова',
  arms: 'руки',
  torso: 'торс',
  legs: 'ноги',
}

// export function inputBodyPart(mode: 'attack' | 'block'): BodyPart {
//   const choice = (
//     mode == 'attack' 
//       ? 'куда ударить 👊' 
//       : 'что блокировать 🛡️'
//   )
  
//   print(
//     `Выбери ${choice}: \n` + 
//     body_parts.map((part, i) => `${i + 1}. ${body_parts_ru[part]}`).join('\n') 
//   )

//   while (true) {
//     const answer = input('> ')
//     const n = Number(answer)
//     const part = body_parts[n - 1]
//     // if (isFinite(n) && Number.isInteger(n) && n >= 1 && n <= BodyParts.length) {
//     if (typeof part !== 'undefined') {
//       return part
//     }
//     print(`Нужно ввести цифру от 1 до ${body_parts.length}`)
//   }
// }
export function inputBodyPart(mode: 'attack' | 'block'): BodyPart {
  const choice = (
    mode == 'attack' 
      ? 'куда ударить 👊' 
      : 'что блокировать 🛡️'
  )
  return menu(`Выбери ${choice}`, body_parts_ru)
}
