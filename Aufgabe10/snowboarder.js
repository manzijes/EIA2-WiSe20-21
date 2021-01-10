"use strict";
var L10_Inheritence;
(function (L10_Inheritence) {
    class Snowboarder extends L10_Inheritence.Moveable {
        constructor(_position, _size, _color, _velocity) {
            super();
            this.position = _position;
            this.size = _size;
            this.color = _color;
            this.velocity = _velocity;
        }
        draw() {
            let radiusHead = 8;
            L10_Inheritence.crc2.beginPath();
            L10_Inheritence.crc2.fillStyle = this.color;
            L10_Inheritence.crc2.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            L10_Inheritence.crc2.fill();
            L10_Inheritence.crc2.closePath();
            L10_Inheritence.crc2.beginPath();
            L10_Inheritence.crc2.strokeStyle = "black";
            L10_Inheritence.crc2.fillStyle = "white";
            L10_Inheritence.crc2.arc(this.position.x + 7.5, this.position.y - 5, radiusHead, 0, 2 * Math.PI);
            L10_Inheritence.crc2.fill();
            L10_Inheritence.crc2.stroke();
            L10_Inheritence.crc2.closePath();
            L10_Inheritence.crc2.beginPath();
            L10_Inheritence.crc2.strokeStyle = "black";
            L10_Inheritence.crc2.fillStyle = "darkslategrey";
            L10_Inheritence.crc2.fillRect(this.position.x - 10, this.position.y + 20, this.size.x + 20, this.size.y - 10);
            L10_Inheritence.crc2.fill();
            L10_Inheritence.crc2.stroke();
            L10_Inheritence.crc2.closePath();
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
    L10_Inheritence.Snowboarder = Snowboarder;
})(L10_Inheritence || (L10_Inheritence = {}));
//# sourceMappingURL=snowboarder.js.map