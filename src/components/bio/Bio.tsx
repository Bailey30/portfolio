import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import bee from "../../assets/images/greenBee.svg";
import Arrow from "../../assets/images/arrow";
import { increment } from "../../redux/slices/scrollSlice";
import { useDispatch } from "react-redux";
import Lines from "../lines/Lines";

const Bio = () => {
    const dispatch = useDispatch();
    const bioRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bio = bioRef.current;
        if (!bio) return;
        document.addEventListener("mousemove", (event: any) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const v = getComputedStyle(bio).getPropertyValue("--mouse-x");

            bio.style.setProperty("--mouse-x", `${mouseX}px`);
            bio.style.setProperty("--mouse-y", `${mouseY}px`);
        });
    }, []);

    function scrollDown() {
        dispatch(increment());
    }

    return (
        <div className={styles.bioSection} ref={bioRef}>
            <div className={styles.bioContainer}>
                <div className={styles.bioTop}>
                    <div className={styles.row}>
                        <h1>
                            ALEX BAILEY {">>>>"}{" "}
                            <a
                                href="https://www.linkedin.com/in/alex-bailey-9ba821229/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                        </h1>
                    </div>
                    <div className={styles.row}>
                        <h1>
                            DEVELOPER{" "}
                            <span
                                className={`${styles.github} ${styles.coloredText}`}
                            >
                                <a
                                    href="https://www.github.com/bailey30"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    ./GitHub
                                </a>
                            </span>
                        </h1>
                    </div>
                    <div className={styles.row}>
                        <h1>MANCHESTER</h1>
                        <img src={bee} alt="manchester bee" />
                        <h1>ENGLAND</h1>
                    </div>
                </div>
                {/* <Lines /> */}
                <div className={`${styles.row} ${styles.lastRow}`}>
                    <div onClick={scrollDown}>
                        <h4 className={`${styles.coloredText}`}>
                            THINGS I'VE DONE{" "}
                        </h4>
                        <div className={`${styles.imageContainer} `}>
                            <Arrow stroke="#D1FE2F" />
                            {/* <Arrow stroke="#D1FE2F" /> */}
                            {/* <Arrow stroke="#D1FE2F" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bio;
