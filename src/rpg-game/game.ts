import { startArena } from './arena'
import { Enemy, Character } from './types'
import { Enemy1 } from './enemies/1'
import { Enemy2 } from './enemies/2'
import { menu } from './menu'

const enemies: Enemy[]  = [
  new Enemy1(),
  new Enemy2(),
]

export function startGame() {
  print('Добро пожаловать, гладиктор!') // (приветствие)
  
  const player: Character = {
    hp: 10,
    strength: 1,
  }

  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index]!
    print(`--- Противник №${index + 1} ---`)
    // TODO: print(enemy.description)
    startArena(player, enemy)

    if (!player.hp){
      break
    }
    
    const upgrade = menu('Выбери апгрейд', {
      hp: 'Восстановить хп',
      strength: 'Увеличить силу на 1',
    })

    switch (upgrade) {
      case 'hp':
        player.hp = 10
        break
    
      case 'strength':
        player.strength++
        break
    }
  }
}
