class RotatingCube3D {
    private A: number = 0;
    private B: number = 0;
    private C: number = 0;

    private cubeWidth: number = 20;
    private readonly width: number = 160;
    private readonly height: number = 44;
    private zBuffer: Float32Array;
    private buffer: Uint8Array;
    private readonly backgroundASCIICode: number = ' '.charCodeAt(0);
    private readonly distanceFromCam: number = 100;
    private horizontalOffset: number = 0;
    private readonly K1: number = 40;
    private readonly incrementSpeed: number = 0.6;

    constructor() {
        this.zBuffer = new Float32Array(this.width * this.height);
        this.buffer = new Uint8Array(this.width * this.height);
    }

    private calculateX(i: number, j: number, k: number): number {
        return j * Math.sin(this.A) * Math.sin(this.B) * Math.cos(this.C) - 
               k * Math.cos(this.A) * Math.sin(this.B) * Math.cos(this.C) +
               j * Math.cos(this.A) * Math.sin(this.C) + 
               k * Math.sin(this.A) * Math.sin(this.C) + 
               i * Math.cos(this.B) * Math.cos(this.C);
    }

    private calculateY(i: number, j: number, k: number): number {
        return j * Math.cos(this.A) * Math.cos(this.C) + 
               k * Math.sin(this.A) * Math.cos(this.C) -
               j * Math.sin(this.A) * Math.sin(this.B) * Math.sin(this.C) + 
               k * Math.cos(this.A) * Math.sin(this.B) * Math.sin(this.C) -
               i * Math.cos(this.B) * Math.sin(this.C);
    }

    private calculateZ(i: number, j: number, k: number): number {
        return k * Math.cos(this.A) * Math.cos(this.B) - 
               j * Math.sin(this.A) * Math.cos(this.B) + 
               i * Math.sin(this.B);
    }

    private calculateForSurface(cubeX: number, cubeY: number, cubeZ: number, ch: number): void {
        const x = this.calculateX(cubeX, cubeY, cubeZ);
        const y = this.calculateY(cubeX, cubeY, cubeZ);
        const z = this.calculateZ(cubeX, cubeY, cubeZ) + this.distanceFromCam;

        // Проверка деления на ноль
        if (z === 0) return;
        
        const ooz = 1 / z;

        const xp = Math.floor(this.width / 2 + this.horizontalOffset + this.K1 * ooz * x * 2);
        const yp = Math.floor(this.height / 2 + this.K1 * ooz * y);

        const idx = xp + yp * this.width;
        
        // Проверка границ массива
        if (idx >= 0 && idx < this.zBuffer.length && idx < this.buffer.length) {
            const currentZ = this.zBuffer[idx] || 0; // Защита от undefined
            if (ooz > currentZ) {
                this.zBuffer[idx] = ooz;
                this.buffer[idx] = ch;
            }
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private clearConsole(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
    }

    private renderCube(cubeSize: number, offsetMultiplier: number): void {
        this.cubeWidth = cubeSize;
        this.horizontalOffset = offsetMultiplier * this.cubeWidth;

        for (let cubeX = -this.cubeWidth; cubeX < this.cubeWidth; cubeX += this.incrementSpeed) {
            for (let cubeY = -this.cubeWidth; cubeY < this.cubeWidth; cubeY += this.incrementSpeed) {
                // Явное преобразование символов в коды
                this.calculateForSurface(cubeX, cubeY, -this.cubeWidth, '@'.charCodeAt(0));
                this.calculateForSurface(this.cubeWidth, cubeY, cubeX, '$'.charCodeAt(0));
                this.calculateForSurface(-this.cubeWidth, cubeY, -cubeX, '~'.charCodeAt(0));
                this.calculateForSurface(-cubeX, cubeY, this.cubeWidth, '#'.charCodeAt(0));
                this.calculateForSurface(cubeX, -this.cubeWidth, -cubeY, ';'.charCodeAt(0));
                this.calculateForSurface(cubeX, this.cubeWidth, cubeY, '+'.charCodeAt(0));
            }
        }
    }

    public async run(): Promise<void> {
        this.clearConsole();

        while (true) {
            // Очищаем буферы - используем fill с явными значениями
            this.buffer.fill(this.backgroundASCIICode, 0, this.buffer.length);
            this.zBuffer.fill(0, 0, this.zBuffer.length);

            // Рендерим три куба разных размеров
            this.renderCube(20, -2);
            this.renderCube(10, 1);  
            this.renderCube(5, 8);

            // Очищаем консоль и выводим кадр
            this.clearConsole();
            let output = '';

            for (let k = 0; k < this.width * this.height; k++) {
                // Проверяем границы буфера
                if (k < this.buffer.length) {
                    const charCode = this.buffer[k];
                    output += (k % this.width) ? String.fromCharCode(charCode!) : '\n';
                }
            }

            console.log(output);

            // Обновляем углы вращения
            this.A += 0.05;
            this.B += 0.05;
            this.C += 0.01;

            await this.sleep(16);
        }
    }
}

// Запуск программы с обработкой ошибок
const cube = new RotatingCube3D();
cube.run().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});