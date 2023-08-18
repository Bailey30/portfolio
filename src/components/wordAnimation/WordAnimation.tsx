import React from "react";
import styles from "./styles.module.scss";

interface Props {
    word: string;
    isHovered: boolean;
    type: string;
    otherExpanded?: boolean;
}

const WordAnimation = ({ word, isHovered, type, otherExpanded }: Props) => {
    const splitWord = word.split("");

    return (
        <div
            className={`${styles.wordContainer} ${
                type === "view" && styles.view
            } ${otherExpanded && styles.otherExpanded}`}
        >
            <h2 className={styles.originalWord}>
                {splitWord.map((letter, i) => {
                    return (
                        <div
                            key={letter + i}
                            className={`${styles.letter} ${
                                styles["letter_" + i]
                            } ${isHovered && styles.isHovered} ${
                                letter === " " && styles.space
                            }`}
                        >
                            <span>{letter}</span>
                        </div>
                    );
                })}
            </h2>
            <h2 className={styles.newWord}>
                {splitWord.map((letter, i) => {
                    return (
                        <div
                            key={letter + i}
                            className={`${styles.letter} ${
                                styles["letter_" + i]
                            } ${isHovered && styles.isHovered} ${
                                letter === " " && styles.space
                            }`}
                        >
                            {letter}
                        </div>
                    );
                })}
            </h2>
        </div>
    );
};

export default WordAnimation;
