namespace L10_Inheritence {

    window.addEventListener("load", handleLoad);
    
    export interface Vector {
        x: number;
        y: number;
    }

    export let crc2: CanvasRenderingContext2D;
    let imgData: ImageData;
    let golden: number = 0.62;

    let moveables: Moveable[] = [];

    for (let i: number = 1; i < 60; i++) {
        // moveables.push(new Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413))));
        let snowflake: Snowflake = new Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413)));
        moveables.push(snowflake);
    }

    for (let i: number = 1; i < 5; i++) {
        let allColors: string[] = ["lightseagreen", "IndianRed", "darkturquoise", "lightcoral", "palevioletred", "sandybrown"];
        let randomColor: string = allColors[Math.floor(Math.random() * allColors.length)];
        moveables.push(new Snowboarder({ x: 870, y: 170 }, { x: 15, y: 20 }, randomColor, (Math.random() * 6) + 1));
    }

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawSun({ x: 104.28, y: 82.4 });
        drawCloud({ x: 295.46, y: 164.8 }, { x: 86.9, y: 20.6 });
        drawCloud({ x: 782.1, y: 103 }, { x: 86.9, y: 20.6 });
        drawSnowMountain();
        drawHouse({ x: 547, y: 145 }, { x: 152.075, y: 82.4 });
        drawTree({ x: 173.8, y: 267.8 });
        drawLiftLine();
        drawTree({ x: 825.55, y: 370.8 });
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        update();
    }

    function update(): void {
        window.setTimeout(update, 10);
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(imgData, 0, 0);
        updateMove();
        drawMoveables();
    }

    function updateMove(): void {
        for (let i: number = 0; i < moveables.length; i++) {
            moveables[i].update();
        }
    }

    function drawMoveables(): void {
        for (let i: number = 0; i < moveables.length; i++) {
            moveables[i].draw();
        }
    }

    function drawBackground(): void {
        console.log("Background");
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "skyblue");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun", _position);
        let r1: number = 20;
        let r2: number = 45;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawCloud(_position: Vector, _size: Vector): void {
        let nParticles: number = 15;
        let radiusParticle: number = 35;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawTree(_position: Vector): void {
        crc2.fillStyle = "HSL(10.25,25.81%,40.47%)";

        crc2.beginPath();
        crc2.moveTo(_position.x + 5, _position.y + 7.5);
        crc2.lineTo(_position.x - 5, _position.y + 7.5);
        crc2.lineTo(_position.x - 5, _position.y - 12.5);
        crc2.lineTo(_position.x + 5, _position.y - 12.5);
        crc2.closePath();
        crc2.fill();

        crc2.fillStyle = "HSLA(147, 50%, 47%)";

        crc2.beginPath();
        crc2.moveTo(_position.x - 30, _position.y - 10);
        crc2.lineTo(_position.x, _position.y - 55);
        crc2.lineTo(_position.x + 30, _position.y - 10);
        crc2.closePath();
        crc2.fill();

        crc2.fillStyle = "HSLA(147, 50%, 47%)";

        crc2.beginPath();
        crc2.moveTo(_position.x - 27, _position.y - 27.5);
        crc2.lineTo(_position.x, _position.y - 75);
        crc2.lineTo(_position.x + 27, _position.y - 27.5);
        crc2.closePath();
        crc2.fill();
    }

    function drawSnowMountain(): void {
        crc2.fillStyle = "aliceblue";
        crc2.strokeStyle = "aliceblue";
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(0, crc2.canvas.height);
        crc2.lineTo(0, crc2.canvas.height * 0.7);
        crc2.lineTo(crc2.canvas.width, crc2.canvas.height * 0.45);
        crc2.lineTo(crc2.canvas.width, crc2.canvas.height);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
    }

    function drawLiftLine(): void {
        crc2.fillStyle = "aliceblue";
        crc2.strokeStyle = "aliceblue";
        crc2.save();
        crc2.beginPath();
        crc2.moveTo(0, crc2.canvas.height - 300);
        crc2.lineTo(crc2.canvas.width - 200, 0);
        crc2.lineWidth = 1.5;
        crc2.strokeStyle = "aliceblue";
        crc2.stroke();
        crc2.closePath();

        drawLiftCube({ x: 0, y: crc2.canvas.height - crc2.canvas.height * 0.685 }, { x: 30, y: 30 });
        drawLiftCube({ x: crc2.canvas.width * 0.2, y: crc2.canvas.height - crc2.canvas.height * 0.757 }, { x: 30, y: 30 });
        drawLiftCube({ x: crc2.canvas.width * 0.4, y: crc2.canvas.height - crc2.canvas.height * 0.823 }, { x: 30, y: 30 });
        drawLiftCube({ x: crc2.canvas.width * 0.6, y: crc2.canvas.height - crc2.canvas.height * 0.898 }, { x: 30, y: 30 });
        drawLiftCube({ x: crc2.canvas.width * 0.8, y: crc2.canvas.height - crc2.canvas.height * 0.973 }, { x: 30, y: 30 });
    }
    
    function drawLiftCube(_position: Vector, _size: Vector): void {
        crc2.fillStyle = "aliceblue";
        crc2.fillRect(_position.x, _position.y, _size.x, _size.y);
        
        crc2.beginPath();
        crc2.moveTo(_position.x + 15, _position.y - 19.5);
        crc2.lineTo(_position.x + 15, _position.y);
        crc2.strokeStyle = "aliceblue";
        crc2.stroke();
        crc2.closePath();
    }

    function drawHouse(_position: Vector, _size: Vector): void {
        crc2.beginPath();
        crc2.rect(_position.x, _position.y, _size.x, _size.y);    // x, y, b, h
        crc2.fillStyle = "HSL(21.25,25.81%,45.47%)";     // Style für Füllung   
        crc2.strokeStyle = "HSLA(21.25,25.81%,36.47%)";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.fillStyle = "HSL(337.89,58.46%,25.49%)";
        crc2.strokeStyle = "HSL(337.89,58.46%,25.49%)";
        crc2.moveTo(_position.x, _position.y);
        crc2.lineTo(_position.x + _size.x / 4, _position.y - _size.y / 2.5);
        crc2.lineTo(_position.x + _size.x / 1.35, _position.y - _size.y / 2.5);
        crc2.lineTo(_position.x + _size.x, _position.y);
        crc2.fill();
        crc2.stroke();
        crc2.closePath();
    }
}