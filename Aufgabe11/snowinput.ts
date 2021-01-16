namespace L11_Advanced {
    export class Snowinput extends Moveable {
        private size: number;
        private velocity: number;
        private color: string;
        private finalPosition: number;

        constructor(randomX: number, randomY: number) {
            super();
            this.x = randomX;
            this.y = randomY;
            this.size = Math.random() * (8 - 6) + 6; // (max - min) + min
            this.velocity = Math.random() * (6 - 5) + 5;
            this.randomlyColorize();
            this.finalPosition = 420;
        }
        
        randomlyColorize(): void {
            let randomNumber: number = Math.floor(Math.random() * 4);
            switch (randomNumber) {
                case 0:
                    this.color = "lightcyan";
                    break;
                case 1:
                    this.color = "#caf0f7";
                    break;
                case 2:
                    this.color = "#d0e6f0";
                    break;
                case 3:
                    this.color = "aliceblue";
                    break;
            }
        }

        draw(): void {
            crc2.fillStyle = this.color;
            crc2.beginPath();
            crc2.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();
        }

        update(): void {
            if (this.y >= this.finalPosition) {
                this.y = this.finalPosition;
            } else {
                this.y += this.velocity * 0.4;
            }
            if (this.y == this.finalPosition)
                this.expendable = true;
        }
    }
}