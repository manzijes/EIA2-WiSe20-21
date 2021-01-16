"use strict";
var L11_Advanced;
(function (L11_Advanced) {
    class Snowinput extends L11_Advanced.Moveable {
        constructor(randomX, randomY) {
            super();
            this.x = randomX;
            this.y = randomY;
            this.size = Math.random() * (8 - 6) + 6; // (max - min) + min
            this.velocity = Math.random() * (6 - 5) + 5;
            this.randomlyColorize();
            this.finalPosition = 420;
        }
        randomlyColorize() {
            let randomNumber = Math.floor(Math.random() * 4);
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
        draw() {
            L11_Advanced.crc2.fillStyle = this.color;
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.closePath();
        }
        update() {
            if (this.y >= this.finalPosition) {
                this.y = this.finalPosition;
            }
            else {
                this.y += this.velocity * 0.4;
            }
            if (this.y == this.finalPosition)
                this.expendable = true;
        }
    }
    L11_Advanced.Snowinput = Snowinput;
})(L11_Advanced || (L11_Advanced = {}));
//# sourceMappingURL=snowinput.js.map