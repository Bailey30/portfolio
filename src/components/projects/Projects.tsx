import React, { useState } from "react";
import styles from "./styles.module.scss";
import Project from "../project/Project";
import { data } from "./data";

const Projects = () => {
    const [parentHovered, setParentHovered] = useState<boolean>(false);
    return (
        <div className={styles.projectsContainer}>
            <div
                className={styles.projectsBlock}
                onMouseEnter={() => setParentHovered(true)}
                onMouseLeave={() => setParentHovered(false)}
            >
                {data.map((project, i) => {
                    return (
                        <Project
                            data={project}
                            i={i}
                            parentHovered={parentHovered}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;
