"use strict";
var L10_Inheritence;
(function (L10_Inheritence) {
    class Snowflake extends L10_Inheritence.Moveable {
        constructor(x, y) {
            super();
            this.x = x;
            this.y = y;
        }
        draw() {
            L10_Inheritence.crc2.beginPath();
            L10_Inheritence.crc2.arc(this.x, this.y, 4, 0 * Math.PI, 2.0 * Math.PI);
            L10_Inheritence.crc2.strokeStyle = "lightgray";
            L10_Inheritence.crc2.stroke();
            L10_Inheritence.crc2.fillStyle = "aliceblue";
            L10_Inheritence.crc2.fill();
            L10_Inheritence.crc2.closePath();
        }
        update() {
            this.y += 1;
            if (this.y > 412)
                this.y = 0;
            this.draw();
        }
    }
    L10_Inheritence.Snowflake = Snowflake;
})(L10_Inheritence || (L10_Inheritence = {}));
//# sourceMappingURL=snowflake.js.map