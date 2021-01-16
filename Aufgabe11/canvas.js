"use strict";
var L11_Advanced;
(function (L11_Advanced) {
    window.addEventListener("load", handleLoad);
    let imgData;
    let golden = 0.62;
    let moveables = [];
    let people = [];
    for (let i = 1; i < 40; i++) {
        // moveables.push(new Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413))));
        let snowflake = new L11_Advanced.Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413)));
        moveables.push(snowflake);
    }
    for (let i = 1; i < 5; i++) {
        let allColors = ["lightseagreen", "IndianRed", "darkturquoise", "lightcoral", "palevioletred", "sandybrown"];
        let randomColor = allColors[Math.floor(Math.random() * allColors.length)];
        let snowboarder = new L11_Advanced.Snowboarder({ x: 870, y: 170 }, { x: 15, y: 20 }, randomColor, (Math.random() * 3) + 1);
        moveables.push(snowboarder);
        people.push(snowboarder);
    }
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L11_Advanced.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", doSnowInput);
        canvas.addEventListener("click", jumpSnowboarder);
        drawBackground();
        drawSun({ x: 104.28, y: 82.4 });
        drawCloud({ x: 295.46, y: 164.8 }, { x: 86.9, y: 20.6 });
        drawCloud({ x: 782.1, y: 103 }, { x: 86.9, y: 20.6 });
        drawSnowMountain();
        drawHouse({ x: 547, y: 145 }, { x: 152.075, y: 82.4 });
        drawTree({ x: 173.8, y: 267.8 });
        drawLiftLine();
        drawTree({ x: 825.55, y: 370.8 });
        imgData = L11_Advanced.crc2.getImageData(0, 0, canvas.width, canvas.height);
        update();
    }
    function update() {
        window.setTimeout(update, 10);
        L11_Advanced.crc2.clearRect(0, 0, L11_Advanced.crc2.canvas.width, L11_Advanced.crc2.canvas.height);
        L11_Advanced.crc2.putImageData(imgData, 0, 0);
        updateMove();
        drawMoveables();
        deleteExpandables();
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
    function jumpSnowboarder(_event) {
        let mousePosition = { x: _event.clientX - L11_Advanced.crc2.canvas.offsetLeft, y: _event.clientY - L11_Advanced.crc2.canvas.offsetTop };
        for (let oneSnowboarder of people) {
            if (oneSnowboarder.position.x - oneSnowboarder.hitRadius < mousePosition.x && oneSnowboarder.position.x + oneSnowboarder.hitRadius > mousePosition.x && oneSnowboarder.position.y - oneSnowboarder.hitRadius < mousePosition.y && oneSnowboarder.position.y + oneSnowboarder.hitRadius > mousePosition.y) {
                oneSnowboarder.position.y -= 50;
                setTimeout(function () { oneSnowboarder.position.y += 50; }, 150);
                console.log("hallo");
            }
        }
    }
    function deleteExpandables() {
        for (let i = moveables.length - 1; i >= 0; i--) {
            if (moveables[i].expendable)
                moveables.splice(i, 1);
        }
    }
    function doSnowInput(_event) {
        let randomX = _event.clientX;
        let randomY = _event.clientY;
        for (let i = 0; i < 4; i++) {
            let snowinput = new L11_Advanced.Snowinput(randomX, randomY);
            moveables.push(snowinput);
            randomX += Math.random() * 70;
            randomX -= Math.random() * 70;
            randomY += Math.random() * 10;
        }
    }
    function drawBackground() {
        console.log("Background");
        let gradient = L11_Advanced.crc2.createLinearGradient(0, 0, 0, L11_Advanced.crc2.canvas.height);
        gradient.addColorStop(0, "cornflowerblue");
        gradient.addColorStop(golden, "skyblue");
        L11_Advanced.crc2.fillStyle = gradient;
        L11_Advanced.crc2.fillRect(0, 0, L11_Advanced.crc2.canvas.width, L11_Advanced.crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 20;
        let r2 = 45;
        let gradient = L11_Advanced.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        L11_Advanced.crc2.save();
        L11_Advanced.crc2.translate(_position.x, _position.y);
        L11_Advanced.crc2.fillStyle = gradient;
        L11_Advanced.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        L11_Advanced.crc2.fill();
        L11_Advanced.crc2.restore();
    }
    function drawCloud(_position, _size) {
        let nParticles = 15;
        let radiusParticle = 35;
        let particle = new Path2D();
        let gradient = L11_Advanced.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        L11_Advanced.crc2.save();
        L11_Advanced.crc2.translate(_position.x, _position.y);
        L11_Advanced.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            L11_Advanced.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            L11_Advanced.crc2.translate(x, y);
            L11_Advanced.crc2.fill(particle);
            L11_Advanced.crc2.restore();
        }
        L11_Advanced.crc2.restore();
    }
    function drawTree(_position) {
        L11_Advanced.crc2.fillStyle = "HSL(10.25,25.81%,40.47%)";
        L11_Advanced.crc2.beginPath();
        L11_Advanced.crc2.moveTo(_position.x + 5, _position.y + 7.5);
        L11_Advanced.crc2.lineTo(_position.x - 5, _position.y + 7.5);
        L11_Advanced.crc2.lineTo(_position.x - 5, _position.y - 12.5);
        L11_Advanced.crc2.lineTo(_position.x + 5, _position.y - 12.5);
        L11_Advanced.crc2.closePath();
        L11_Advanced.crc2.fill();
        L11_Advanced.crc2.fillStyle = "HSLA(147, 50%, 47%)";
        L11_Advanced.crc2.beginPath();
        L11_Advanced.crc2.moveTo(_position.x - 30, _position.y - 10);
        L11_Advanced.crc2.lineTo(_position.x, _position.y - 55);
        L11_Advanced.crc2.lineTo(_position.x + 30, _position.y - 10);
        L11_Advanced.crc2.closePath();
        L11_Advanced.crc2.fill();
        L11_Advanced.crc2.fillStyle = "HSLA(147, 50%, 47%)";
        L11_Advanced.crc2.beginPath();
        L11_Advanced.crc2.moveTo(_position.x - 27, _position.y - 27.5);
        L11_Advanced.crc2.lineTo(_position.x, _position.y - 75);
        L11_Advanced.crc2.lineTo(_position.x + 27, _position.y - 27.5);
        L11_Advanced.crc2.closePath();
        L11_Advanced.crc2.fill();
    }
    function drawSnowMountain() {
        L11_Advanced.crc2.fillStyle = "aliceblue";
        L11_Advanced.crc2.strokeStyle = "aliceblue";
        L11_Advanced.crc2.save();
        L11_Advanced.crc2.beginPath();
        L11_Advanced.crc2.moveTo(0, L11_Advanced.crc2.canvas.height);
        L11_Advanced.crc2.lineTo(0, L11_Advanced.crc2.canvas.height * 0.7);
        L11_Advanced.crc2.lineTo(L11_Advanced.crc2.canvas.width, L11_Advanced.crc2.canvas.height * 0.45);
        L11_Advanced.crc2.lineTo(L11_Advanced.crc2.canvas.width, L11_Advanced.crc2.canvas.height);
        L11_Advanced.crc2.closePath();
        L11_Advanced.crc2.fill();
        L11_Advanced.crc2.stroke();
        L11_Advanced.crc2.restore();
    }
    function drawLiftLine() {
        L11_Advanced.crc2.fillStyle = "aliceblue";
        L11_Advanced.crc2.strokeStyle = "aliceblue";
        L11_Advanced.crc2.save();
        L11_Advanced.crc2.beginPath();
        L11_Advanced.crc2.moveTo(0, L11_Advanced.crc2.canvas.height - 300);
        L11_Advanced.crc2.lineTo(L11_Advanced.crc2.canvas.width - 200, 0);
        L11_Advanced.crc2.lineWidth = 1.5;
        L11_Advanced.crc2.strokeStyle = "aliceblue";
        L11_Advanced.crc2.stroke();
        L11_Advanced.crc2.closePath();
        drawLiftCube({ x: 0, y: L11_Advanced.crc2.canvas.height - L11_Advanced.crc2.canvas.height * 0.685 }, { x: 30, y: 30 });
        drawLiftCube({ x: L11_Advanced.crc2.canvas.width * 0.2, y: L11_Advanced.crc2.canvas.height - L11_Advanced.crc2.canvas.height * 0.757 }, { x: 30, y: 30 });
        drawLiftCube({ x: L11_Advanced.crc2.canvas.width * 0.4, y: L11_Advanced.crc2.canvas.height - L11_Advanced.crc2.canvas.height * 0.823 }, { x: 30, y: 30 });
        drawLiftCube({ x: L11_Advanced.crc2.canvas.width * 0.6, y: L11_Advanced.crc2.canvas.height - L11_Advanced.crc2.canvas.height * 0.898 }, { x: 30, y: 30 });
        drawLiftCube({ x: L11_Advanced.crc2.canvas.width * 0.8, y: L11_Advanced.crc2.canvas.height - L11_Advanced.crc2.canvas.height * 0.973 }, { x: 30, y: 30 });
    }
    function drawLiftCube(_position, _size) {
        L11_Advanced.crc2.fillStyle = "aliceblue";
        L11_Advanced.crc2.fillRect(_position.x, _position.y, _size.x, _size.y);
        L11_Advanced.crc2.beginPath();
        L11_Advanced.crc2.moveTo(_position.x + 15, _position.y - 19.5);
        L11_Advanced.crc2.lineTo(_position.x + 15, _position.y);
        L11_Advanced.crc2.strokeStyle = "aliceblue";
        L11_Advanced.crc2.stroke();
        L11_Advanced.crc2.closePath();
    }
    function drawHouse(_position, _size) {
        L11_Advanced.crc2.beginPath();
        L11_Advanced.crc2.rect(_position.x, _position.y, _size.x, _size.y); // x, y, b, h
        L11_Advanced.crc2.fillStyle = "HSL(21.25,25.81%,45.47%)"; // Style für Füllung   
        L11_Advanced.crc2.strokeStyle = "HSLA(21.25,25.81%,36.47%)";
        L11_Advanced.crc2.fill();
        L11_Advanced.crc2.closePath();
        L11_Advanced.crc2.beginPath();
        L11_Advanced.crc2.fillStyle = "HSL(337.89,58.46%,25.49%)";
        L11_Advanced.crc2.strokeStyle = "HSL(337.89,58.46%,25.49%)";
        L11_Advanced.crc2.moveTo(_position.x, _position.y);
        L11_Advanced.crc2.lineTo(_position.x + _size.x / 4, _position.y - _size.y / 2.5);
        L11_Advanced.crc2.lineTo(_position.x + _size.x / 1.35, _position.y - _size.y / 2.5);
        L11_Advanced.crc2.lineTo(_position.x + _size.x, _position.y);
        L11_Advanced.crc2.fill();
        L11_Advanced.crc2.stroke();
        L11_Advanced.crc2.closePath();
    }
})(L11_Advanced || (L11_Advanced = {}));
//# sourceMappingURL=canvas.js.map