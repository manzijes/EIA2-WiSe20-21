"use strict";
var L11_Advanced;
(function (L11_Advanced) {
    class Snowflake extends L11_Advanced.Moveable {
        constructor(x, y) {
            super();
            this.x = x;
            this.y = y;
        }
        draw() {
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.arc(this.x, this.y, 4, 0 * Math.PI, 2.0 * Math.PI);
            L11_Advanced.crc2.strokeStyle = "lightgray";
            L11_Advanced.crc2.stroke();
            L11_Advanced.crc2.fillStyle = "aliceblue";
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.closePath();
        }
        update() {
            this.y += 1;
            if (this.y > 412)
                this.y = 0;
            this.draw();
        }
    }
    L11_Advanced.Snowflake = Snowflake;
})(L11_Advanced || (L11_Advanced = {}));
//# sourceMappingURL=snowflake.js.map