import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import bee from "../../assets/images/greenBee.svg";
import Arrow from "../../assets/images/arrow";
import { increment } from "../../redux/slices/scrollSlice";
import { useDispatch } from "react-redux";
import Lines from "../lines/Lines";
import squareArrow from "../../assets/images/squareArrow2.svg";
import circleArrow from "../../assets/images/circleArrow.svg";
import thinArrow from "../../assets/images/thinArrow.svg";
const Bio = () => {
    const dispatch = useDispatch();
    const bioRef = useRef<HTMLDivElement>(null);

    function scrollDown() {
        dispatch(increment());
        window.history.pushState("work", "", "work");
    }

    return (
        <div className={styles.bioSection} ref={bioRef}>
            <div className={styles.bioContainer}>
                <div className={styles.row}>
                    <h1>Alex Bailey </h1>
                    <a
                        href="https://www.linkedin.com/in/alex-bailey-9ba821229/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>
                </div>

                <div className={`${styles.row} ${styles.developer}`}>
                    <h1>Full stack developer</h1>
                    <a
                        href="https://www.github.com/bailey30"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </div>
                <div
                    className={`${styles.row} ${styles.link} ${styles.projects}`}
                    onClick={() => scrollDown()}
                >
                    <h1 className={``}>Some projects I've worked on:</h1>
                </div>

                <div className={`${styles.projectRow}`}>
                    Call me{" "}
                    <img
                        src={thinArrow}
                        alt="arrow"
                        className={`${styles.arrow} ${styles.down}`}
                    />
                </div>
                <div className={`${styles.projectRow}`}>
                    Evmet{" "}
                    <img
                        src={thinArrow}
                        alt="arrow"
                        className={`${styles.arrow} ${styles.down}`}
                    />
                </div>
                <div className={`${styles.projectRow}`}>
                    F12 Performance{" "}
                    <img
                        src={thinArrow}
                        alt="arrow"
                        className={`${styles.arrow} ${styles.down}`}
                    />
                </div>
                <div className={`${styles.projectRow}`}>
                    eco4u{" "}
                    <img
                        src={thinArrow}
                        alt="arrow"
                        className={`${styles.arrow} ${styles.down}`}
                    />
                </div>
                <div className={`${styles.projectRow}`}>
                    Pinnacle{" "}
                    <img
                        src={thinArrow}
                        alt="arrow"
                        className={`${styles.arrow} ${styles.down}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Bio;
