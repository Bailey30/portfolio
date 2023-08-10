import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import WordAnimation from "../wordAnimation/WordAnimation";
import { ProjectT } from "../projects/data";

interface Props {
    data: ProjectT;
    i: number;
    parentHovered: boolean;
}

const Project = ({ data, i, parentHovered }: Props) => {
    const [active, setActive] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleHoverEnter = () => {
        setIsHovered(true);
        setActive(i);
    };

    const handleHoverExit = () => {
        setIsHovered(false);
        setActive(null);
    };

    useEffect(() => {
        console.log(active);
    }, [active]);

    return (
        <div
            className={`${styles.projectContainer} ${
                !isHovered && parentHovered && styles.otherIsActive
            }`}
            onMouseEnter={() => handleHoverEnter()}
            onMouseLeave={() => handleHoverExit()}
        >
            <WordAnimation word={data.name} isHovered={isHovered} />
            <div className={styles.right}>
                <div className={styles.tools}>{data.tools.join("/")}</div>
                <div className={styles.role}>{data.role}</div>
            </div>
        </div>
    );
};

export default Project;
