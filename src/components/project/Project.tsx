import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import WordAnimation from "../wordAnimation/WordAnimation";
import { ProjectT } from "../projects/data";
import bullet from "../../assets/images/bullet.svg";
import ellipse from "../../assets/images/ellipse.svg";
import { useDispatch } from "react-redux";
import { selectProject } from "../../redux/slices/scrollSlice";

interface Props {
    data: ProjectT;
    i: number;
    parentHovered: boolean;
    setActive: React.Dispatch<React.SetStateAction<number | "none">>;
    expand: number | undefined;
    setExpand: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Project = ({
    data,
    i,
    parentHovered,
    setActive,
    expand,
    setExpand,
}: Props) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState<number | undefined>(undefined);

    function handleHoverEnter() {
        setIsHovered(i);
        setActive(i);
    }

    function handleHoverExit() {
        setIsHovered(undefined);
        setActive("none");
    }

    function handleSelectInfo() {
        // dispatch(selectProject(data.name));
        // window.history.pushState(data.name, "", data.name);

        if (expand === i) {
            setExpand(undefined);
        } else {
            setExpand(i);
        }
    }

    function handleExpand(i: number) {}

    return (
        <div
            className={`${styles.projectTitleContainer} ${
                isHovered === undefined && parentHovered && styles.otherIsActive
            } ${expand === i && styles.expanded} ${
                expand !== i && expand !== undefined && styles.otherExpanded
            }`}
            onMouseEnter={() => handleHoverEnter()}
            onMouseLeave={() => handleHoverExit()}
            onClick={() => handleSelectInfo()}
        >
            <img src={bullet} alt="bullet point" />
            <div className={styles.wordContainer}>
                <WordAnimation
                    word={data.name}
                    isHovered={isHovered !== undefined && true}
                    type="name"
                />
            </div>

            <div
                className={`${styles.ellipse} ${
                    isHovered === i && styles.visible
                }`}
            >
                <WordAnimation
                    word={"info"}
                    isHovered={isHovered !== undefined && true}
                    type="view"
                />
            </div>
        </div>
    );
};

export default Project;
