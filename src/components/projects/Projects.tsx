import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Project from "../project/Project";
import { data } from "./data";
import HoverImage from "../hoverImage/HoverImage";
import squareArrow from "../../assets/images/squareArrow2.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    allProjects,
    decrement,
    selectProject,
} from "../../redux/slices/scrollSlice";
import ProjectInfo from "../projectInfo/ProjectInfo";
import { RootState } from "../../redux/store";

interface Props {
    sectionHovered: boolean;
}
const Projects = ({ sectionHovered }: Props) => {
    const dispatch = useDispatch();
    const project = useSelector((state: RootState) => state.scroll.project);
    const [parentHovered, setParentHovered] = useState<boolean>(false);
    const [active, setActive] = useState<number | "none">("none");
    const [expand, setExpand] = useState<number | undefined>(undefined);
    const [mount, setMount] = useState<boolean>(false);
    useEffect(() => {
        document.addEventListener("mousemove", (e) => {
            let root = document.documentElement;
            root.style.setProperty("--mouse-x", e.clientX + "px");
            root.style.setProperty("--mouse-y", e.clientY + "px");
        });
        return () => {
            document.removeEventListener("mouse", (e) => {});
        };
    }, [mount]);

    useEffect(() => {
        if (!mount) {
            setMount(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("popstate", (e) => {
            const state = e.state;
            if (state) {
                dispatch(selectProject(state));
            } else {
                dispatch(allProjects());
            }
        });

        return () => {
            window.removeEventListener("popstate", () => {});
        };
    }, []);

    return (
        <div
            className={`${styles.projectsContainer} ${
                project !== "all" && styles.infoVisible
            }`}
        >
            <div className={styles.allProjects}>
                <div className={styles.nav}>
                    <img
                        src={squareArrow}
                        alt="arrow"
                        onClick={() => dispatch(decrement())}
                    />
                </div>
                <div
                    className={styles.projectsBlock}
                    onMouseEnter={() => setParentHovered(true)}
                    onMouseLeave={() => {
                        setParentHovered(false);
                        setActive("none");
                    }}
                >
                    {data.map((project, i) => {
                        return (
                            <Project
                                data={project}
                                i={i}
                                parentHovered={parentHovered}
                                key={project.name}
                                setActive={setActive}
                                expand={expand}
                                setExpand={setExpand}
                            />
                        );
                    })}
                </div>
                {sectionHovered && (
                    <HoverImage active={active} parentHovered={parentHovered} />
                )}
            </div>
            <div className={styles.projectInfo}>
                <ProjectInfo />
            </div>
        </div>
    );
};

export default Projects;
