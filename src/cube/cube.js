var A = 0;
var B = 0;
var C = 0;
var x;
var y;
var z;
var ooz;
var xp;
var yp;
var idx;
var cubeWidth = 20;
var width = 160;
var height = 44;
var K1 = 30;
var zBuffer = new Array(width * height).fill(0);
var buffer = new Array(width * height).fill(' '.charCodeAt(0));
var distanceFromCam = 60;
var backgroundASCIICode = ' ';
var incrementSpeed = 0.4;
function calculateX(i, j, k) {
    return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B)
        * Math.cos(C) + j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) +
        i * Math.cos(B) * Math.cos(C);
}
function calculateY(i, j, k) {
    return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C)
        - j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B)
        * Math.sin(C) - i * Math.cos(B) * Math.sin(C);
}
function calculateZ(i, j, k) {
    return k * Math.cos(A) * Math.cos(B) - j
        * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
}
function calculateForSurface(cubeX, cubeY, cubeZ, ch) {
    var x = calculateX(cubeX, cubeY, cubeZ);
    var y = calculateY(cubeX, cubeY, cubeZ);
    var z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam;
    ooz = 1 / z;
    xp = Math.floor(width / 2 + K1 * ooz * x * 2);
    yp = Math.floor(height / 2 + K1 * ooz * y);
    idx = xp + yp * width;
    if (idx >= 0 && idx < width * height) {
        if (ooz > zBuffer[idx]) {
            zBuffer[idx] = ooz;
            buffer[idx] = ch.charCodeAt(0);
        }
    }
}
console.clear();
while (true) {
    buffer.fill(' '.charCodeAt(0));
    zBuffer.fill(0);
    for (var cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
        for (var cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
            calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
            calculateForSurface(cubeX, cubeY, cubeWidth, '#');
            calculateForSurface(cubeX, -cubeWidth, cubeY, '$');
            calculateForSurface(cubeX, cubeWidth, cubeY, '~');
            calculateForSurface(-cubeWidth, cubeX, cubeY, ';');
            calculateForSurface(cubeWidth, cubeX, cubeY, '+');
        }
    }
    var output = '';
    for (var k = 0; k < width * height; k++) {
        output += String.fromCharCode(k % width ? buffer[k] : 10);
    }
    console.clear();
    console.log(output);
    A += 0.005;
    B += 0.005;
}
