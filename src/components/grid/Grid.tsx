import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { Paths } from "./paths";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const Grid = () => {
    const level = useSelector((state: RootState) => state.scroll.level);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const cursorRef = useRef<any>(null);
    const [pathsState, setPathsState] = useState<any>();

    let oldElapsedTime = 0;

    function animate(timestamp?: number) {
        const elapsedTime = timestamp as any;
        const deltaTime = elapsedTime - oldElapsedTime;
        oldElapsedTime = elapsedTime;

        ctx!.clearRect(0, 0, size.w, size.h);

        ctx!.fillStyle = "#DCDEE5";
        ctx!.fillRect(0, 0, size.w, size.h);
        // console.log(cursor);

        // for one wavey line
        // for (let x = 0; x < size.w; x += 5) {
        //     ctx!.fillStyle = "#050505";

        //     for (let y = 0; y < 1; y++) {
        //         const phi = (x * 2 * Math.PI) / size.w;

        //         let cy = y;
        //         if (y <= cursor.y - 100) {
        //             cy += 50;
        //         }
        //         // console.log(cursor.y);

        //         const posY = Math.sin(x / 400 - elapsedTime / 500) * 100 + 150;
        //         // const posY =
        //         //     ((Math.cos(elapsedTime / 500 + y * 2200) *
        //         //         Math.cos(phi / 2)) /
        //         //         (y / 1.5)) *
        //         //         200 +
        //         //     // y +
        //         //     (y * -y) / 100 +
        //         //     size.h;
        //         // const posY = y;
        //         ctx!.fillRect(x, posY, 5, 1);
        //     }
        // }

        requestAnimationFrame(animate);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        setCtx(canvas.getContext("2d"));
    }, []);

    useEffect(() => {
        if (ctx === null || !ctx) return;

        const container = containerRef.current;
        if (!container) return;
        setSize({ w: container.clientWidth, h: container.clientHeight });
        const containerRect = containerRef.current.getBoundingClientRect();

        const paths = new Paths(
            ctx,
            containerRef?.current?.clientWidth,
            containerRef?.current?.clientHeight,
            containerRect
        );
        setPathsState(paths);
        console.log(level);
    }, [ctx]);

    useEffect(() => {
        if (!pathsState) return;
        if (level === 0) {
            // paths.isDrawing = true;
            pathsState.drawGrid(0);
        } else {
            setTimeout(() => {
                pathsState.stopAnimation();
            }, 1000);
        }
    }, [level]);

    return (
        <div className={styles.linesContainer} ref={containerRef}>
            <canvas
                ref={canvasRef}
                // onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
                id="canvas"
            ></canvas>
        </div>
    );
};

export default Grid;
