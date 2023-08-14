import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import bee from "../../assets/images/greenBee.svg";
import Arrow from "../../assets/images/arrow";
import { increment } from "../../redux/slices/scrollSlice";
import { useDispatch } from "react-redux";
import Lines from "../lines/Lines";
import squareArrow from "../../assets/images/squareArrow2.svg";
const Bio = () => {
    const dispatch = useDispatch();
    const bioRef = useRef<HTMLDivElement>(null);

    function scrollDown() {
        dispatch(increment());
    }

    return (
        <div className={styles.bioSection} ref={bioRef}>
            <div className={styles.bioContainer}>
                <div className={styles.row}>
                    <h1>ALEX BAILEY </h1>
                </div>

                <div className={`${styles.row} ${styles.developer}`}>
                    <h1>DEVELOPER</h1>
                    {/* <img src={bee} alt="manchester bee" /> */}
                </div>
                <div
                    className={`${styles.row} ${styles.link}`}
                    onClick={() => scrollDown()}
                >
                    <h1 className={``}>
                        THINGS I'VE DONE
                        <img
                            src={squareArrow}
                            alt="arrow"
                            className={`${styles.arrow} ${styles.down}`}
                        />
                    </h1>
                </div>
                <div className={`${styles.row} ${styles.link}`}>
                    <h1>
                        <a
                            href="https://www.linkedin.com/in/alex-bailey-9ba821229/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LINKEDIN
                            <img
                                src={squareArrow}
                                alt="arrow"
                                className={`${styles.arrow} ${styles.up}`}
                            />
                        </a>
                    </h1>
                </div>
                <div className={`${styles.row} ${styles.link}`}>
                    <h1 className={``}>
                        <a
                            href="https://www.github.com/bailey30"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GITHUB
                            <img
                                src={squareArrow}
                                alt="arrow"
                                className={`${styles.arrow} ${styles.up}`}
                            />
                        </a>
                    </h1>
                </div>

                {/* <Lines /> */}
            </div>
        </div>
    );
};

export default Bio;
