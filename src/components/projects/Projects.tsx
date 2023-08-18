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
import Nav from "../nav/Nav";

interface Props {
    sectionHovered: boolean;
}
const Projects = ({ sectionHovered }: Props) => {
    const location = window.location.pathname;
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
        console.log({ project });
    }, [project]);

    // useEffect(() => {
    //     window.addEventListener("popstate", (e) => {
    //         const state = e.state;
    //         console.log({ state });
    //         let currentPath = window.location.pathname;
    //         console.log({ currentPath });
    //         if (state === null) {
    //             console.log("state is null");

    //             return;
    //         }
    //         if (state.split("/")[1]) {
    //             console.log("forward");
    //             dispatch(selectProject(state));
    //         } else {
    //             dispatch(allProjects());
    //         }
    //     });

    //     return () => {
    //         window.removeEventListener("popstate", () => {});
    //     };
    // }, [mount]);

    return (
        <div className={`${styles.projectsContainer}`}>
            <div className={styles.allProjects}>
                <div className={styles.nav}>
                    {/* <Nav location="work" /> */}
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
                {sectionHovered && !expand && (
                    <HoverImage active={active} parentHovered={parentHovered} />
                )}
                <div className={styles.footer}>
                    <Nav />
                </div>
            </div>
        </div>
    );
};

export default Projects;
