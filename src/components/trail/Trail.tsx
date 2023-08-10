import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Bio from "../bio/Bio";

type trailSegment = {
    x: number;
    y: number;
    timestamp: number;
    alpha: number;
    r: number;
};

const Trail = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
    const canvas: HTMLCanvasElement = document.getElementById(
        "canvas"
    ) as HTMLCanvasElement;

    const cursor = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    };

    const ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 1,
        radius: 5,
        color: "blue",
        move: 2,
        draw() {
            ctx?.beginPath();
            ctx?.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx?.closePath();
            ctx!.fillStyle = this.color;
            ctx?.fill();
        },
    };

    // Trail properties
    const trailLength = 900; // Number of frames to keep the trail
    // let trailArr = [{ x: ball.x, y: ball.y }];
    let trailArr: trailSegment[] = Array(900).fill({
        x: cursor.x,
        y: cursor.y,
    });

    function setSize() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }

    function filterTrailArr(arr: trailSegment[], timestamp: number) {
        trailArr = arr.filter((item) => item.timestamp !== timestamp);
    }

    function drawTrail() {
        const now = Date.now();
        let opacity = 1;
        ctx!.globalAlpha = 1;
        for (let i = 0; i < trailArr.length; i++) {
            const age = now - trailArr[i].timestamp;

            // ctx.fillStyle = "rgba(0,0,0,0.1)";

            // ctx.fillRect(0, 0, canvas.width, canvas.height);
            opacity -= 0.05;
            // const alpha = 1 - i / trailLength; // Calculate alpha for fading eff0.5ct
            // const alpha = 1 - Math.min(age / fadeDuration, 1); // Calculate alpha for fading effect
            // const alpha = 1 - age / 2000;
            // const alpha = Math.min(Math.abs(37 - (trailArr.length / i) * 100), 15) ;
            // const alpha = Math.min(Math.abs(trailArr.length / i), 15) + "%";

            // works with rgba as one of the colors
            // const alpha =225 -  Math.abs(trailArr.length / i) * 100;

            // const alpha = Math.abs( 1 - i/900)

            // this one works with hsl
            const alpha = Math.max(150 - (trailArr.length / i) * 100, 20) + "%";

            const alpha2 = 1 - i / 1000;
            trailArr[i].alpha -= 0.5;

            // makes it go to black
            const a3 = Math.max(trailArr[i].alpha, 15);

            // for green
            // const a3 = Math.max(trailArr[i].alpha / (i + 1 / 1000), 88);

            // const o3 = Math.max((trailArr[i].alpha * i) / 100000, 0.1);

            // const o = isNaN(o3) ? 1 : o3;
            // const a = isNaN(a3) ? 100 : a3;
            // // console.log(o3);

            // const lr = Math.min(a / 100 / i, 1);

            // const a4 = Math.max(trailArr[i].alpha, 0.5);

            trailArr[i].r += (0.075 * i) / 100;
            const r = Math.min(trailArr[i].r, 100);

            // i > 300
            //     ? (trailArr[i].r -= (0.075 * i) / 100)
            //     : (trailArr[i].r -= 0);
            // const r = Math.max(trailArr[i].r, ball.radius / 2);

            let style = `rgba(0,0,255,${alpha})`;

            let trailX = (trailArr[i].x -= 2);
            let trailY = (trailArr[i].y -= 0.5);

            const gradient = ctx!.createRadialGradient(
                trailX,
                trailY - 20,
                10,
                trailX,
                trailY,
                70
            );

            // Add three color stops
            // gradient.addColorStop(lr, `hsl(140.2,100%,${100}%, 1)`);
            // gradient.addColorStop(0.9, `hsl(140.2,100%,${a / 2}%, ${o})`);
            // gradient.addColorStop(0.9, `hsl(140.2,100%,${0}%, 1)`);

            ctx!.save();
            ctx!.globalAlpha -= 0.2;
            // console.log(alpha)
            ctx!.beginPath();
            ctx!.arc(trailX, trailY, r, 0, Math.PI * 2);
            // ctx.fillStyle = `rgba(${0},${alpha},${0} , ${0.5})`;

            // ctx.fillStyle = `rgba(${0},${456},${0} , ${alpha})`;

            // starts white
            ctx!.fillStyle = `hsl(210, 11%, ${a3}%, ${a3})`;

            // ctx!.fillStyle = `hsl(140, 100%, ${a3}%, ${o3})`;

            // ctx!.fillStyle = gradient;
            // ctx!.fillRect(trailX - ball.radius, trailY - ball.radius, 160, 160);

            ctx!.fill();
            ctx!.closePath();
            // ctx.globalAlpha = 1 - i / trailArr.length;
            ctx!.restore();

            if (trailX < -100 || trailY < -100) {
                filterTrailArr(trailArr, trailArr[i].timestamp);
            }
        }
    }

    function updateTrail(x: number, y: number) {
        // Add the current position to the trail
        // trailArr.unshift({ x, y });

        const timestamp = Date.now();
        if (trailArr.length < 900) {
            trailArr.push({ x, y, timestamp, alpha: 100, r: 5 });
        }

        // Remove the oldest positions if the trail exceeds the desired length
        if (trailArr.length > trailLength) {
            trailArr.shift();
        }
    }

    function anim() {
        ctx!.fillStyle = "hsl(226.7, 14.8%, 88%)";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        // ctx!.clearRect(0, 0, canvas.width, canvas.height);

        updateTrail(ball.x, ball.y);

        drawTrail();

        requestAnimationFrame(anim);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Get the 2D context
        setCtx(canvas.getContext("2d"));

        canvas.addEventListener("mousemove", (e) => {
            updateTrail(ball.x, ball.y);
        });
    }, []);

    useEffect(() => {
        if (ctx === null || !ctx) return;
        document.addEventListener("resize", () => setSize());
        document.addEventListener("mousemove", (e) => {
            cursor.x = e.clientX;
            cursor.y = e.clientY;
            ball.x = cursor.x;
            ball.y = cursor.y;
        });
        anim();
        setSize();
    }, [ctx]);

    return (
        <div className={styles.canvasContainer}>
            <>
                <canvas
                    id="canvas"
                    ref={canvasRef}
                    className={styles.canvas}
                ></canvas>
            </>
        </div>
    );
};

export default Trail;
