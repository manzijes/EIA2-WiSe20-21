"use strict";
var L09_Classes;
(function (L09_Classes) {
    class Snowboarder {
        constructor(_position, _size, _color, _velocity) {
            this.position = _position;
            this.size = _size;
            this.color = _color;
            this.velocity = _velocity;
        }
        draw() {
            let radiusHead = 8;
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.fillStyle = this.color;
            L09_Classes.crc2.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            L09_Classes.crc2.fill();
            L09_Classes.crc2.closePath();
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.strokeStyle = "black";
            L09_Classes.crc2.fillStyle = "white";
            L09_Classes.crc2.arc(this.position.x + 7.5, this.position.y - 5, radiusHead, 0, 2 * Math.PI);
            L09_Classes.crc2.fill();
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.strokeStyle = "black";
            L09_Classes.crc2.fillStyle = "darkslategrey";
            L09_Classes.crc2.fillRect(this.position.x - 10, this.position.y + 20, this.size.x + 20, this.size.y - 10);
            L09_Classes.crc2.fill();
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
        }
        update() {
            this.draw();
            this.position.y += this.velocity;
            this.position.x -= this.velocity + (Math.random() * (5 - 1) + 1);
            if (this.position.y > 600) {
                this.position.y = 170;
                this.position.x = 870;
            }
        }
    }
    L09_Classes.Snowboarder = Snowboarder;
})(L09_Classes || (L09_Classes = {}));
//# sourceMappingURL=snowboarder.js.map