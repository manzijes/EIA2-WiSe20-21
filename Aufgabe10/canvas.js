"use strict";
var L10_Inheritence;
(function (L10_Inheritence) {
    window.addEventListener("load", handleLoad);
    let imgData;
    let golden = 0.62;
    let moveables = [];
    for (let i = 1; i < 60; i++) {
        // moveables.push(new Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413))));
        let snowflake = new L10_Inheritence.Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413)));
        moveables.push(snowflake);
    }
    for (let i = 1; i < 5; i++) {
        let allColors = ["lightseagreen", "IndianRed", "darkturquoise", "lightcoral", "palevioletred", "sandybrown"];
        let randomColor = allColors[Math.floor(Math.random() * allColors.length)];
        moveables.push(new L10_Inheritence.Snowboarder({ x: 870, y: 170 }, { x: 15, y: 20 }, randomColor, (Math.random() * 6) + 1));
    }
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L10_Inheritence.crc2 = canvas.getContext("2d");
        drawBackground();
        drawSun({ x: 104.28, y: 82.4 });
        drawCloud({ x: 295.46, y: 164.8 }, { x: 86.9, y: 20.6 });
        drawCloud({ x: 782.1, y: 103 }, { x: 86.9, y: 20.6 });
        drawSnowMountain();
        drawHouse({ x: 547, y: 145 }, { x: 152.075, y: 82.4 });
        drawTree({ x: 173.8, y: 267.8 });
        drawLiftLine();
        drawTree({ x: 825.55, y: 370.8 });
        imgData = L10_Inheritence.crc2.getImageData(0, 0, canvas.width, canvas.height);
        update();
    }
    function update() {
        window.setTimeout(update, 10);
        L10_Inheritence.crc2.clearRect(0, 0, L10_Inheritence.crc2.canvas.width, L10_Inheritence.crc2.canvas.height);
        L10_Inheritence.crc2.putImageData(imgData, 0, 0);
        updateMove();
        drawMoveables();
    }
    function updateMove() {
        for (let i = 0; i < moveables.length; i++) {
            moveables[i].update();
        }
    }
    function drawMoveables() {
        for (let i = 0; i < moveables.length; i++) {
            moveables[i].draw();
        }
    }
    function drawBackground() {
        console.log("Background");
        let gradient = L10_Inheritence.crc2.createLinearGradient(0, 0, 0, L10_Inheritence.crc2.canvas.height);
        gradient.addColorStop(0, "cornflowerblue");
        gradient.addColorStop(golden, "skyblue");
        L10_Inheritence.crc2.fillStyle = gradient;
        L10_Inheritence.crc2.fillRect(0, 0, L10_Inheritence.crc2.canvas.width, L10_Inheritence.crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 20;
        let r2 = 45;
        let gradient = L10_Inheritence.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        L10_Inheritence.crc2.save();
        L10_Inheritence.crc2.translate(_position.x, _position.y);
        L10_Inheritence.crc2.fillStyle = gradient;
        L10_Inheritence.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        L10_Inheritence.crc2.fill();
        L10_Inheritence.crc2.restore();
    }
    function drawCloud(_position, _size) {
        let nParticles = 15;
        let radiusParticle = 35;
        let particle = new Path2D();
        let gradient = L10_Inheritence.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        L10_Inheritence.crc2.save();
        L10_Inheritence.crc2.translate(_position.x, _position.y);
        L10_Inheritence.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            L10_Inheritence.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            L10_Inheritence.crc2.translate(x, y);
            L10_Inheritence.crc2.fill(particle);
            L10_Inheritence.crc2.restore();
        }
        L10_Inheritence.crc2.restore();
    }
    function drawTree(_position) {
        L10_Inheritence.crc2.fillStyle = "HSL(10.25,25.81%,40.47%)";
        L10_Inheritence.crc2.beginPath();
        L10_Inheritence.crc2.moveTo(_position.x + 5, _position.y + 7.5);
        L10_Inheritence.crc2.lineTo(_position.x - 5, _position.y + 7.5);
        L10_Inheritence.crc2.lineTo(_position.x - 5, _position.y - 12.5);
        L10_Inheritence.crc2.lineTo(_position.x + 5, _position.y - 12.5);
        L10_Inheritence.crc2.closePath();
        L10_Inheritence.crc2.fill();
        L10_Inheritence.crc2.fillStyle = "HSLA(147, 50%, 47%)";
        L10_Inheritence.crc2.beginPath();
        L10_Inheritence.crc2.moveTo(_position.x - 30, _position.y - 10);
        L10_Inheritence.crc2.lineTo(_position.x, _position.y - 55);
        L10_Inheritence.crc2.lineTo(_position.x + 30, _position.y - 10);
        L10_Inheritence.crc2.closePath();
        L10_Inheritence.crc2.fill();
        L10_Inheritence.crc2.fillStyle = "HSLA(147, 50%, 47%)";
        L10_Inheritence.crc2.beginPath();
        L10_Inheritence.crc2.moveTo(_position.x - 27, _position.y - 27.5);
        L10_Inheritence.crc2.lineTo(_position.x, _position.y - 75);
        L10_Inheritence.crc2.lineTo(_position.x + 27, _position.y - 27.5);
        L10_Inheritence.crc2.closePath();
        L10_Inheritence.crc2.fill();
    }
    function drawSnowMountain() {
        L10_Inheritence.crc2.fillStyle = "aliceblue";
        L10_Inheritence.crc2.strokeStyle = "aliceblue";
        L10_Inheritence.crc2.save();
        L10_Inheritence.crc2.beginPath();
        L10_Inheritence.crc2.moveTo(0, L10_Inheritence.crc2.canvas.height);
        L10_Inheritence.crc2.lineTo(0, L10_Inheritence.crc2.canvas.height * 0.7);
        L10_Inheritence.crc2.lineTo(L10_Inheritence.crc2.canvas.width, L10_Inheritence.crc2.canvas.height * 0.45);
        L10_Inheritence.crc2.lineTo(L10_Inheritence.crc2.canvas.width, L10_Inheritence.crc2.canvas.height);
        L10_Inheritence.crc2.closePath();
        L10_Inheritence.crc2.fill();
        L10_Inheritence.crc2.stroke();
        L10_Inheritence.crc2.restore();
    }
    function drawLiftLine() {
        L10_Inheritence.crc2.fillStyle = "aliceblue";
        L10_Inheritence.crc2.strokeStyle = "aliceblue";
        L10_Inheritence.crc2.save();
        L10_Inheritence.crc2.beginPath();
        L10_Inheritence.crc2.moveTo(0, L10_Inheritence.crc2.canvas.height - 300);
        L10_Inheritence.crc2.lineTo(L10_Inheritence.crc2.canvas.width - 200, 0);
        L10_Inheritence.crc2.lineWidth = 1.5;
        L10_Inheritence.crc2.strokeStyle = "aliceblue";
        L10_Inheritence.crc2.stroke();
        L10_Inheritence.crc2.closePath();
        drawLiftCube({ x: 0, y: L10_Inheritence.crc2.canvas.height - L10_Inheritence.crc2.canvas.height * 0.685 }, { x: 30, y: 30 });
        drawLiftCube({ x: L10_Inheritence.crc2.canvas.width * 0.2, y: L10_Inheritence.crc2.canvas.height - L10_Inheritence.crc2.canvas.height * 0.757 }, { x: 30, y: 30 });
        drawLiftCube({ x: L10_Inheritence.crc2.canvas.width * 0.4, y: L10_Inheritence.crc2.canvas.height - L10_Inheritence.crc2.canvas.height * 0.823 }, { x: 30, y: 30 });
        drawLiftCube({ x: L10_Inheritence.crc2.canvas.width * 0.6, y: L10_Inheritence.crc2.canvas.height - L10_Inheritence.crc2.canvas.height * 0.898 }, { x: 30, y: 30 });
        drawLiftCube({ x: L10_Inheritence.crc2.canvas.width * 0.8, y: L10_Inheritence.crc2.canvas.height - L10_Inheritence.crc2.canvas.height * 0.973 }, { x: 30, y: 30 });
    }
    function drawLiftCube(_position, _size) {
        L10_Inheritence.crc2.fillStyle = "aliceblue";
        L10_Inheritence.crc2.fillRect(_position.x, _position.y, _size.x, _size.y);
        L10_Inheritence.crc2.beginPath();
        L10_Inheritence.crc2.moveTo(_position.x + 15, _position.y - 19.5);
        L10_Inheritence.crc2.lineTo(_position.x + 15, _position.y);
        L10_Inheritence.crc2.strokeStyle = "aliceblue";
        L10_Inheritence.crc2.stroke();
        L10_Inheritence.crc2.closePath();
    }
    function drawHouse(_position, _size) {
        L10_Inheritence.crc2.beginPath();
        L10_Inheritence.crc2.rect(_position.x, _position.y, _size.x, _size.y); // x, y, b, h
        L10_Inheritence.crc2.fillStyle = "HSL(21.25,25.81%,45.47%)"; // Style für Füllung   
        L10_Inheritence.crc2.strokeStyle = "HSLA(21.25,25.81%,36.47%)";
        L10_Inheritence.crc2.fill();
        L10_Inheritence.crc2.closePath();
        L10_Inheritence.crc2.beginPath();
        L10_Inheritence.crc2.fillStyle = "HSL(337.89,58.46%,25.49%)";
        L10_Inheritence.crc2.strokeStyle = "HSL(337.89,58.46%,25.49%)";
        L10_Inheritence.crc2.moveTo(_position.x, _position.y);
        L10_Inheritence.crc2.lineTo(_position.x + _size.x / 4, _position.y - _size.y / 2.5);
        L10_Inheritence.crc2.lineTo(_position.x + _size.x / 1.35, _position.y - _size.y / 2.5);
        L10_Inheritence.crc2.lineTo(_position.x + _size.x, _position.y);
        L10_Inheritence.crc2.fill();
        L10_Inheritence.crc2.stroke();
        L10_Inheritence.crc2.closePath();
    }
})(L10_Inheritence || (L10_Inheritence = {}));
//# sourceMappingURL=canvas.js.map