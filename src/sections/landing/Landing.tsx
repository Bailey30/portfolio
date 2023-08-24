import React from "react";
import Trail from "../../components/trail/Trail";
import Bio from "../../components/bio/Bio";
import styles from "./styles.module.scss";
import Lines from "../../components/lines/Lines";
import Section from "../../components/section/Section";
import Bio2 from "../../components/bio2/Bio2";
import Grid from "../../components/grid/Grid";

const Landing = () => {
    return (
        <Section>
            <div className={`${styles.landingContainer} `}>
                <Bio />
            </div>
        </Section>
    );
};

export default Landing;
