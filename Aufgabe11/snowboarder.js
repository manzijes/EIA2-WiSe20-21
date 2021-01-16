"use strict";
var L11_Advanced;
(function (L11_Advanced) {
    class Snowboarder extends L11_Advanced.Moveable {
        constructor(_position, _size, _color, _velocity) {
            super();
            this.position = _position;
            this.size = _size;
            this.color = _color;
            this.velocity = _velocity;
            this.hitRadius = 35;
        }
        draw() {
            let radiusHead = 8;
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.fillStyle = this.color;
            L11_Advanced.crc2.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.closePath();
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.strokeStyle = "black";
            L11_Advanced.crc2.fillStyle = "white";
            L11_Advanced.crc2.arc(this.position.x + 7.5, this.position.y - 5, radiusHead, 0, 2 * Math.PI);
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.stroke();
            L11_Advanced.crc2.closePath();
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.strokeStyle = "black";
            L11_Advanced.crc2.fillStyle = "darkslategrey";
            L11_Advanced.crc2.fillRect(this.position.x - 10, this.position.y + 20, this.size.x + 20, this.size.y - 10);
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.stroke();
            L11_Advanced.crc2.closePath();
        }
        update() {
            this.draw();
            this.position.y += this.velocity;
            this.position.x -= this.velocity + (Math.random() * (4 - 1) + 1);
            if (this.position.y > 600) {
                this.position.y = 170;
                this.position.x = 870;
            }
        }
    }
    L11_Advanced.Snowboarder = Snowboarder;
})(L11_Advanced || (L11_Advanced = {}));
//# sourceMappingURL=snowboarder.js.map