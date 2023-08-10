import React from "react";
import logo from "./logo.svg";
import styles from "./app.module.scss";
import Landing from "./sections/landing/Landing";
import { useScroll } from "./hooks/useScroll";
import Work from "./sections/work/Work";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

type Section = "styles.landing" | "styles.work";
function App() {
    useScroll();
    const level = useSelector((state: RootState) => state.scroll.level);

    const sections = ["landing", "work"];

    return (
        <div className={`${styles.background}`}>
            <div
                className={`${styles.movingContainer} ${
                    styles[sections[level]]
                }`}
            >
                <Landing />
                <Work />
            </div>
        </div>
    );
}

export default App;
