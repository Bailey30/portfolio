import React from "react";
import Trail from "../../components/trail/Trail";
import Bio from "../../components/bio/Bio";
import styles from "./styles.module.scss";
import Lines from "../../components/lines/Lines";
import Section from "../../components/section/Section";

const Landing = () => {
    return (
        <Section>
            <div className={`${styles.landingContainer} `}>
                <Bio />

                {/* <Trail /> */}
                {/* <Lines /> */}
            </div>
        </Section>
    );
};

export default Landing;
