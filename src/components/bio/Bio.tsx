import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import bee from "../../assets/images/greenBee.svg";
import Arrow from "../../assets/images/arrow";
import {
    increment,
    selectProject,
    setLevel,
} from "../../redux/slices/scrollSlice";
import { useDispatch } from "react-redux";
import Lines from "../lines/Lines";
import thinArrow from "../../assets/images/thinArrow.svg";
import WordAnimation from "../wordAnimation/WordAnimation";

const projectNames = [
    "Call me",
    "F12 Performance",
    "Evmet",
    "eco4u",
    "Pinnacle",
];

const Bio = () => {
    const dispatch = useDispatch();
    const bioRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState<number | undefined>(undefined);

    function handleSelectInfo(name: string) {
        dispatch(selectProject(name));
        dispatch(setLevel(1));
        let currentPath = window.location.pathname;
        let newPath = currentPath + name.split(" ").join("");

        window.history.pushState(name, "", newPath);
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
                </div>
                <div className={`${styles.works}`}>
                    <div className={styles.row}>
                        <h2>
                            SELECTED WORKS{" "}
                            <div className={styles.arrow}>
                                <img
                                    src={thinArrow}
                                    alt="arrow"
                                    className={`${styles.arrow} ${
                                        isHovered !== undefined &&
                                        styles.hovered
                                    }`}
                                />
                            </div>
                        </h2>
                    </div>
                    {projectNames.map((project, i) => {
                        return (
                            <>
                                <h3
                                    onMouseEnter={() => setIsHovered(i)}
                                    onMouseLeave={() => setIsHovered(undefined)}
                                    onClick={() => handleSelectInfo(project)}
                                    className={`${
                                        isHovered !== i &&
                                        isHovered !== undefined &&
                                        styles.otherHovered
                                    }`}
                                >
                                    <WordAnimation
                                        isHovered={isHovered === i && true}
                                        word={project}
                                        type="name"
                                    />
                                </h3>

                                {i !== projectNames.length - 1 && (
                                    <span className={styles.slash}>
                                        &nbsp;/&nbsp;
                                    </span>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Bio;
