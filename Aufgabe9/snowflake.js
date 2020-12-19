"use strict";
var L09_Classes;
(function (L09_Classes) {
    class Snowflake {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        draw() {
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.arc(this.x, this.y, 4, 0 * Math.PI, 2.0 * Math.PI);
            L09_Classes.crc2.strokeStyle = "lightgray";
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.fillStyle = "aliceblue";
            L09_Classes.crc2.fill();
            L09_Classes.crc2.closePath();
        }
        update() {
            this.y += 1;
            if (this.y > 412)
                this.y = 0;
            this.draw();
        }
    }
    L09_Classes.Snowflake = Snowflake;
})(L09_Classes || (L09_Classes = {}));
//# sourceMappingURL=snowflake.js.map