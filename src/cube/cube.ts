let A: number = 0
let B: number = 0
let C: number = 0

let x: number
let y: number
let z: number 
let ooz: number
let xp: number
let yp: number
let idx: number

const cubeWidth = 20
const width = 160
const height = 44
const K1 = 40

let zBuffer = new Array(width * height).fill(0)  
let buffer = new Array(width * height).fill(' '.charCodeAt(0))

const distanceFromCam = 60
const backgroundASCIICode = ' '

const incrementSpeed = 0.4

function calculateX(i: number, j: number, k: number) {
  return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B)
  * Math.cos(C) + j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) + 
  i * Math.cos(B) * Math.cos(C)
}

function calculateY(i: number, j: number, k: number) {
  return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C)
  - j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B)
  * Math.sin(C) - i * Math.cos(B) * Math.sin(C)
}

function calculateZ(i: number, j: number, k: number) {
  return k * Math.cos(A) * Math.cos(B) - j 
  * Math.sin(A) * Math.cos(B) + i * Math.sin(B)
}

function calculateForSurface(cubeX: number, cubeY: number, cubeZ: number, ch: string) {
  const x = calculateX(cubeX, cubeY, cubeZ)
  const y = calculateY(cubeX, cubeY, cubeZ)
  const z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam

  ooz = 1/z
  xp = Math.floor(width/2 + K1 * ooz * x * 2)
  yp = Math.floor(height/2 + K1 * ooz * y)   
  idx = xp + yp * width

  if (idx >= 0 && idx < width * height) {
    if (ooz > zBuffer[idx]) {
        zBuffer[idx] = ooz;
        buffer[idx] = ch.charCodeAt(0);
    }
  }
}

console.clear()

while (true) {
  buffer.fill(' '.charCodeAt(0))
  zBuffer.fill(0)

  for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
    for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
    calculateForSurface(cubeX, cubeY, -cubeWidth, '@')  
    calculateForSurface(cubeX, cubeY, cubeWidth, '#')   
    calculateForSurface(cubeX, -cubeWidth, cubeY, '$')  
    calculateForSurface(cubeX, cubeWidth, cubeY, '~') 
    calculateForSurface(-cubeWidth, cubeX, cubeY, ';')  
    calculateForSurface(cubeWidth, cubeX, cubeY, '+')   
    }
  }
  
  let output = ''
  for (let k = 0; k < width * height; k++) {
    output += String.fromCharCode(k % width ? buffer[k] : 10)
  }
  console.clear()
  console.log(output)
  
  A += 0.005
  B += 0.005
}