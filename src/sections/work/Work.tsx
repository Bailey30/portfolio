import React, { useState } from "react";
import Section from "../../components/section/Section";
import Projects from "../../components/projects/Projects";
import styles from "./styles.module.scss";
import Nav from "../../components/nav/Nav";
import ProjectInfo from "../../components/projectInfo/ProjectInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Work = () => {
    const project = useSelector((state: RootState) => state.scroll.project);
    const [sectionHovered, setSectionHovered] = useState<boolean>(false);
    return (
        <div
            className={`${styles.workSection} ${
                project !== "all" && styles.infoVisible
            }`}
        >
            <Section>
                <div
                    className={styles.inner}
                    onMouseEnter={() => setSectionHovered(true)}
                    onMouseLeave={() => setSectionHovered(false)}
                >
                    <Projects sectionHovered={sectionHovered} />
                </div>
            </Section>
            <Section>
                <ProjectInfo />
            </Section>
        </div>
    );
};

export default Work;
