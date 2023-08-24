import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import bee from "../../assets/images/greenBee.svg";
import Arrow from "../../assets/images/arrow";
import { increment } from "../../redux/slices/scrollSlice";
import { useDispatch } from "react-redux";
import Lines from "../lines/Lines";
import thinArrow from "../../assets/images/thinArrow.svg";

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
                <div className={styles.bio}>
                    <div className={styles.row}>
                        <h1>ALEX BAILEY</h1>{" "}
                        <a
                            href="https://www.linkedin.com/in/alex-bailey-9ba821229/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className={styles.row}>
                        <h1>FULL STACK DEVELOPER</h1>
                        <a
                            href="https://www.github.com/bailey30"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                    </div>
                    <div className={styles.row}>
                        {/* <div className={styles.links}>
                            <a
                                href="https://www.linkedin.com/in/alex-bailey-9ba821229/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://www.github.com/bailey30"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </div> */}
                    </div>
                </div>
                <div className={`${styles.works}`}>
                    <div className={styles.row}>
                        <h2>SELECTED WORKS</h2>
                    </div>
                    <h3>Call me</h3>
                    <span>&nbsp;/&nbsp;</span>
                    <h3>F12 Performance</h3>
                    <span>&nbsp;/&nbsp;</span>
                    <h3>Evmet</h3>
                    <span>&nbsp;/&nbsp;</span>
                    <h3>eco4u</h3>
                    <span>&nbsp;/&nbsp;</span>
                    <h3>Pinnacle</h3>
                </div>
            </div>
        </div>
    );
};

export default Bio;
