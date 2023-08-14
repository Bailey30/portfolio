import React from "react";
import styles from "./styles.module.scss";

interface Props {
    word: string;
    isHovered: boolean;
    type: string;
}

const WordAnimation = ({ word, isHovered, type }: Props) => {
    const splitWord = word.split("");
    console.log(splitWord);

    return (
        <div
            className={`${styles.wordContainer} ${
                type === "view" && styles.view
            }`}
        >
            <h2 className={styles.originalWord}>
                {splitWord.map((letter, i) => {
                    console.log(letter);
                    return (
                        <div
                            key={letter + i}
                            className={`${styles.letter} ${
                                styles["letter_" + i]
                            } ${isHovered && styles.isHovered}`}
                        >
                            <span>{letter === " " ? " " : letter}</span>
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
