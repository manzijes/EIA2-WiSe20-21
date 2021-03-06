namespace L09_Classes {
    export class Snowflake {
        public x: number;
        public y: number;
    
        constructor (x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    
        public draw(): void {
            crc2.beginPath();
            crc2.arc(this.x, this.y, 4, 0 * Math.PI, 2.0 * Math.PI);
            crc2.strokeStyle = "lightgray";
            crc2.stroke();
            crc2.fillStyle = "aliceblue";
            crc2.fill();
            crc2.closePath();
        }
    
        public update(): void {
            this.y += 1;
            if (this.y > 412)
                this.y = 0;
            this.draw();
        }
    }
}