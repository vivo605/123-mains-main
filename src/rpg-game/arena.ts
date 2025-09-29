import { Enemy, Character } from './types'
import { inputBodyPart, BodyPart, body_parts_ru } from './BodyParts'

// параметр
export function startArena(player: Character, enemy: Enemy) {
  print('Битва начинается!') // (приветствие)
  
  // пока не закончились хп
  while (true) {
    // игрок атакует, NPC блокирует

    const player_attack: BodyPart = inputBodyPart('attack')
    const npc_block: BodyPart = enemy.block()
    print(`Блок противника - ${body_parts_ru[npc_block]}`)

    if (player_attack !== npc_block) {
      enemy.stats.hp -= player.strength 
      print(`👤🎯 Ты попал в противника. У врага осталось ${enemy.stats.hp}❤️`)

      if (!enemy.stats.hp) {
        print('Ты выйграл. Иди работай, а не играй в свои игрулки)')
        return
      }
    }
    else {
      print(`👤 Ты промазал. У врага так и осталось ${enemy.stats.hp}❤️😱😱😱.`)
    }

    // NPC атакует, игрок блокирует

    const player_block = inputBodyPart('block')
    const npc_attack: BodyPart = enemy.attack()
    print(`Цель противника - ${body_parts_ru[npc_block]}`)

    if (npc_attack !== player_block) {
      player.hp -= enemy.stats.strength
      if (player.hp < 0) {
        player.hp = 0
      }
      print(`🤖🎯 В тебя попал бот. Давай придумывай как поднять свою удачу) у тебя осталось ${player.hp}❤️`)

      if (!player.hp) {
        print('Ты проиргал. Тебе надо тренеревотся)')
        return
      }
    }
    else {
      print(`🤖 Бот в тебя не попал, радуйся. У тебя так и осталось ${player.hp}❤️`)
    }
  }
}