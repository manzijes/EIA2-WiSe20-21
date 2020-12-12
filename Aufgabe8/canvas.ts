namespace L08_Canvas2 {
    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc22: CanvasRenderingContext2D;
    let golden: number = 0.62;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc22 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawSun({ x: crc22.canvas.width - crc22.canvas.width * 0.88, y: crc22.canvas.height * 0.2 });
        drawCloud({ x: crc22.canvas.width - crc22.canvas.width * 0.66, y: crc22.canvas.height * 0.4 }, { x: crc22.canvas.width / 10, y: crc22.canvas.height * 0.05 });
        drawCloud({ x: crc22.canvas.width - crc22.canvas.width * 0.1, y: crc22.canvas.height * 0.25 }, { x: crc22.canvas.width / 10, y: crc22.canvas.height * 0.05 });
        drawSnowMountain();
        drawTree({ x: crc22.canvas.width * 0.20, y: crc22.canvas.height * 0.65 });
        drawLiftLine();
        drawHouse({ x: crc22.canvas.width * 0.625, y: crc22.canvas.height * 0.4 }, { x: crc22.canvas.width * 0.175, y: crc22.canvas.height * 0.2 });
        humanNumber();
        drawTree({ x: crc22.canvas.width * 0.95, y: crc22.canvas.height * 0.9 });
        drawSnow({ x: crc22.canvas.width * 0.5, y: crc22.canvas.height }, { x: crc22.canvas.width, y: crc22.canvas.height });
    }

    function drawBackground(): void {
        console.log("Background");
        let gradient: CanvasGradient = crc22.createLinearGradient(0, 0, 0, crc22.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "skyblue");
        // gradient.addColorStop(1, "HSL(100, 80%, 30%)");

        crc22.fillStyle = gradient;
        crc22.fillRect(0, 0, crc22.canvas.width, crc22.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun", _position);

        let r1: number = 20;
        let r2: number = 45;
        let gradient: CanvasGradient = crc22.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");

        crc22.save();
        crc22.translate(_position.x, _position.y);
        crc22.fillStyle = gradient;
        crc22.arc(0, 0, r2, 0, 2 * Math.PI);
        crc22.fill();
        crc22.restore();
    }

    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 15;
        let radiusParticle: number = 35;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc22.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc22.save();
        crc22.translate(_position.x, _position.y);
        crc22.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc22.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc22.translate(x, y);
            crc22.fill(particle);
            crc22.restore();
        }
        crc22.restore();
    }

    function drawTree(_position: Vector): void {
        crc22.fillStyle = "HSL(10.25,25.81%,40.47%)";

        crc22.beginPath();
        crc22.moveTo(_position.x + 5, _position.y + 7.5);
        crc22.lineTo(_position.x - 5, _position.y + 7.5);
        crc22.lineTo(_position.x - 5, _position.y - 12.5);
        crc22.lineTo(_position.x + 5, _position.y - 12.5);
        crc22.closePath();
        crc22.fill();

        crc22.fillStyle = "HSLA(147, 50%, 47%)";

        crc22.beginPath();
        crc22.moveTo(_position.x - 30, _position.y - 10);
        crc22.lineTo(_position.x, _position.y - 55);
        crc22.lineTo(_position.x + 30, _position.y - 10);
        crc22.closePath();
        crc22.fill();

        crc22.fillStyle = "HSLA(147, 50%, 47%)";

        crc22.beginPath();
        crc22.moveTo(_position.x - 27, _position.y - 27.5);
        crc22.lineTo(_position.x, _position.y - 75);
        crc22.lineTo(_position.x + 27, _position.y - 27.5);
        crc22.closePath();
        crc22.fill();
    }

    function drawSnowMountain(): void {
        crc22.fillStyle = "aliceblue";
        crc22.strokeStyle = "aliceblue";
        crc22.save();
        crc22.beginPath();
        crc22.moveTo(0, crc22.canvas.height);
        crc22.lineTo(0, crc22.canvas.height * 0.7);
        crc22.lineTo(crc22.canvas.width, crc22.canvas.height * 0.5);
        crc22.lineTo(crc22.canvas.width, crc22.canvas.height);
        crc22.closePath();
        crc22.fill();
        crc22.stroke();
        crc22.restore();
    }

    function drawLiftLine(): void {
        crc22.fillStyle = "aliceblue";
        crc22.strokeStyle = "aliceblue";
        crc22.save();
        crc22.beginPath();
        crc22.moveTo(0, crc22.canvas.height - 300);
        crc22.lineTo(crc22.canvas.width - 200, 0);
        crc22.lineWidth = 1.5;
        crc22.strokeStyle = "aliceblue";
        crc22.stroke();
        crc22.closePath();

        drawLiftCube({ x: 0, y: crc22.canvas.height - crc22.canvas.height * 0.685 }, { x: 30, y: 30 });
        drawLiftCube({ x: crc22.canvas.width * 0.2, y: crc22.canvas.height - crc22.canvas.height * 0.757 }, { x: 30, y: 30 });
        drawLiftCube({ x: crc22.canvas.width * 0.4, y: crc22.canvas.height - crc22.canvas.height * 0.823 }, { x: 30, y: 30 });
        drawLiftCube({ x: crc22.canvas.width * 0.6, y: crc22.canvas.height - crc22.canvas.height * 0.898 }, { x: 30, y: 30 });
        drawLiftCube({ x: crc22.canvas.width * 0.8, y: crc22.canvas.height - crc22.canvas.height * 0.973 }, { x: 30, y: 30 });
    }
    
    function drawLiftCube(_position: Vector, _size: Vector): void {
       
        crc22.save();
        crc22.fillStyle = "aliceblue";
        crc22.fillRect(_position.x, _position.y, _size.x, _size.y);
        
        crc22.beginPath();
        crc22.moveTo(_position.x + 15, _position.y - 19.5);
        crc22.lineTo(_position.x + 15, _position.y);
        crc22.strokeStyle = "aliceblue";
        crc22.stroke();
        crc22.closePath();
    }

    function drawHouse(_position: Vector, _size: Vector): void {
        crc22.beginPath();
        crc22.rect(_position.x, _position.y, _size.x, _size.y);    // x, y, b, h
        crc22.fillStyle = "HSL(21.25,25.81%,45.47%)";     // Style für Füllung   
        crc22.strokeStyle = "HSLA(21.25,25.81%,36.47%)";
        crc22.fill();
        crc22.closePath();

        crc22.beginPath();
        crc22.fillStyle = "HSL(337.89,58.46%,25.49%)";
        crc22.strokeStyle = "HSL(337.89,58.46%,25.49%)";
        crc22.moveTo(_position.x, _position.y);
        crc22.lineTo(_position.x + _size.x / 4, _position.y - _size.y / 2.5);
        crc22.lineTo(_position.x + _size.x / 1.35, _position.y - _size.y / 2.5);
        crc22.lineTo(_position.x + _size.x, _position.y);
        crc22.fill();
        crc22.stroke();
        crc22.closePath();
    }

    function humanNumber(): void {
        let nHuman: number = 5;
        for (let drawn: number = 0; drawn < nHuman; drawn++) {
            let xposition: number = Math.random() * crc22.canvas.width;
            let yposition: number =  Math.random() * (crc22.canvas.height * 0.2);
            drawHuman({ x: xposition, y: yposition + crc22.canvas.height * 0.7 }, { x: 15, y: 20 });
        }
    }

    function drawHuman(_position: Vector, _size: Vector): void {
        let radiusHead: number = 8;
        let allColors: string[] = ["lightseagreen", "IndianRed", "darkturquoise", "lightcoral", "palevioletred", "sandybrown"];
        let randomColor: string = allColors[Math.floor(Math.random() * allColors.length)];

        crc22.beginPath();
        crc22.fillStyle = randomColor;
        crc22.fillRect(_position.x, _position.y, _size.x, _size.y);
        crc22.fill();
        crc22.closePath();

        crc22.beginPath();
        crc22.strokeStyle = "black";
        crc22.fillStyle = "white";
        crc22.arc(_position.x + 7.5, _position.y - 5, radiusHead, 0, 2 * Math.PI);
        crc22.fill();
        crc22.stroke();
        crc22.closePath();

        crc22.beginPath();
        crc22.strokeStyle = "black";
        crc22.fillStyle = "darkslategrey";
        crc22.fillRect(_position.x - 10, _position.y + 20, _size.x + 20, _size.y - 10);
        crc22.fill();
        crc22.stroke();
        crc22.closePath();
    }

    function drawSnow(_position: Vector, _size: Vector): void {
        let nParticles: number = 60;
        let radiusParticle: number = 5;
        let particle: Path2D = new Path2D();
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
     
        crc22.save();
        crc22.translate(_position.x, _position.y);
        crc22.fillStyle = "aliceblue";

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc22.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc22.translate(x, y);
            crc22.fill(particle);
            crc22.restore();
        }
        crc22.restore();
    }

}