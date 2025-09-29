export {}

/*
  3. Настраиваемые часы
  Написать функцию, которая принимает количество секунд и заданную точность (s, m, h, d), с которой выводит прошедшее время. 
  Например:
  61, m: 01:01
  61, h: 00:01:01

  s, m, h, d

  const translateNumberType = (type: NumberType): string => {
  switch (type) {
    case 'integer':
      return 'Целое'
    case 'float':
      return 'дробное'
    case 'infinity':
      return 'Как ты напиал бесконечность?)))'
    case 'null':
      return 'Не чесло'
  }
}
*/


type PM = 's' | 'm' | 'h' | 'd'

const printTime = (time: number, pm: PM): string => {
  const second = time % 60
  const s = `${(second < 10) ? '0' : ''}${second}`
  
  const minuts = Math.floor((time % (60 * 60)) / 60)
  const m = `${(minuts < 10) ? '0' : ''}${minuts}:`

  const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60))
  const h = `${(hours < 10) ? '0' : ''}${hours}:`

  const days = Math.floor(time / (24 * 60 * 60))
  const d = `${(days < 10) ? '0' : ''}${days}:`

  switch (pm) {
    case 's':
      return s
    case 'm':
      return `${m}${s}`
    case 'h':
      return `${h}${m}${s}`
    case 'd':
      return `${d}${h}${m}${s}`
  }
}


print(printTime(3661, 'h'))
print(printTime(60, 'm'))
print(printTime(3600, 's'))
print(printTime(86400, 'd'))
