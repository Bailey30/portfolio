import React, { useEffect } from "react";
import logo from "./logo.svg";
import styles from "./app.module.scss";
import Landing from "./sections/landing/Landing";
import { useScroll } from "./hooks/useScroll";
import Work from "./sections/work/Work";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import UseHistory from "./hooks/useHistory";
import UseTouchNavigate from "./hooks/useTouchNavigate.";

type Section = "styles.landing" | "styles.work";
function App() {
    // useScroll();
    UseHistory();
    UseTouchNavigate();

    const { project, level } = useSelector((state: RootState) => state.scroll);

    const sections = ["landing", "work"];

    return (
        <>
            <div className={`${styles.background}`} id="app">
                <div className={`${styles.movingContainer}`}>
                    <Landing />
                    <Work />
                </div>
                <svg>
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.5"
                            stitchTiles="stitch"
                        />
                        {/* <feColorMatrix
                        in="colorNoise"
                        type="matrix"
                        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
                        />
                        <feComposite
                        operator="in"
                        in2="SourceGraphic"
                        result="monoNoise"
                    /> */}
                        {/* <feBlend
                            in="SourceGraphic"
                            in2="monoNoise"
                            mode="screen"
                        /> */}
                    </filter>
                </svg>
                <div className={styles.filterDiv}></div>
            </div>
        </>
    );
}

export default App;
