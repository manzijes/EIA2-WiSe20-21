namespace L11_Advanced {
    export class Snowboarder extends Moveable {
        public velocity: number;
        public hitRadius: number;
        public position: Vector;
        private size: Vector;
        private color: string;
    
        constructor (_position: Vector, _size: Vector, _color: string, _velocity: number) {
            super();
            this.position = _position;
            this.size = _size;
            this.color = _color;
            this.velocity = _velocity;
            this.hitRadius = 35;
        }
    
        public draw(): void {
            let radiusHead: number = 8;

            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.strokeStyle = "black";
            crc2.fillStyle = "white";
            crc2.arc(this.position.x + 7.5, this.position.y - 5, radiusHead, 0, 2 * Math.PI);
            crc2.fill();
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.strokeStyle = "black";
            crc2.fillStyle = "darkslategrey";
            crc2.fillRect(this.position.x - 10, this.position.y + 20, this.size.x + 20, this.size.y - 10);
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
        }
    
        public update(): void {
            this.draw();

            this.position.y += this.velocity;
            this.position.x -= this.velocity + (Math.random() * (4 - 1) + 1);

            if (this.position.y > 600) {
                this.position.y = 170;
                this.position.x = 870;
            }
        }
    }
}