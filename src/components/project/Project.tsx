import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import WordAnimation from "../wordAnimation/WordAnimation";
import { ProjectT } from "../projects/data";
import bullet from "../../assets/images/bullet.svg";
import halfBullet from "../../assets/images/halfBullet.svg";
import ellipse from "../../assets/images/ellipse.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "../../redux/slices/scrollSlice";
import { RootState } from "../../redux/store";
import thinArrow from "../../assets/images/thinArrow.svg";

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
    const project = useSelector((state: RootState) => state.scroll.project);
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
        dispatch(selectProject(data.name));
        let currentPath = window.location.pathname;
        let newPath = currentPath + "/" + data.name;
        window.history.pushState(data.name, "", newPath);
    }

    const otherExpanded = expand !== i && expand !== undefined;
    const otherIsActive = isHovered === undefined && parentHovered;
    const expanded = expand === i;
    const bulletSource = otherExpanded ? halfBullet : bullet;
    const bulletClass = otherExpanded && i > expand ? styles.rotate : "";

    return (
        <div
            className={`${styles.projectContainer} ${
                otherIsActive &&
                !otherExpanded &&
                !expanded &&
                styles.otherIsActive
            } 
           
            `}
        >
            <div
                className={`${styles.projectTitleContainer} `}
                onMouseEnter={() => handleHoverEnter()}
                onMouseLeave={() => handleHoverExit()}
                onClick={() => handleSelectInfo()}
            >
                <img
                    src={bulletSource}
                    alt="bullet point"
                    className={bulletClass}
                />
                <div className={styles.wordContainer}>
                    <WordAnimation
                        word={data.name}
                        isHovered={isHovered !== undefined && true}
                        type="name"
                    />
                </div>

                {/* <div
                    className={`${styles.ellipse} ${
                        isHovered === i && project === "all" && styles.visible
                    }`}
                >
                    <WordAnimation
                        word={"info"}
                        isHovered={isHovered !== undefined && true}
                        type="view"
                    />
                </div> */}
                {/* <div
                    className={`${styles.arrow} ${
                        isHovered === i && project === "all" && styles.visible
                    }`}
                >
                    <img src={thinArrow} />
                </div> */}
            </div>
        </div>
    );
};

export default Project;
