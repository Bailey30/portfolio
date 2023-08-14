import React, { useState } from "react";
import Section from "../../components/section/Section";
import Projects from "../../components/projects/Projects";
import styles from "./styles.module.scss";

const Work = () => {
    const [sectionHovered, setSectionHovered] = useState<boolean>(false);
    return (
        <Section>
            <div
                className={styles.inner}
                onMouseEnter={() => setSectionHovered(true)}
                onMouseLeave={() => setSectionHovered(false)}
            >
                <Projects sectionHovered={sectionHovered} />
            </div>
        </Section>
    );
};

export default Work;
