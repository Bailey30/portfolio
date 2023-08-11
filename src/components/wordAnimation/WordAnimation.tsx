import React from "react";
import styles from "./styles.module.scss";

interface Props {
    word: string;
    isHovered: boolean;
}

const WordAnimation = ({ word, isHovered }: Props) => {
    const splitWord = word.split("");

    return (
        <div className={styles.wordContainer}>
            <h2 className={styles.originalWord}>
                {splitWord.map((letter, i) => {
                    return (
                        <div
                            key={letter + i}
                            className={`${styles.letter} ${
                                styles["letter_" + i]
                            } ${isHovered && styles.isHovered}`}
                        >
                            {letter}
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
                            } ${isHovered && styles.isHovered}`}
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
