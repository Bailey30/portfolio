import React, { useEffect } from "react";
import Trail from "../../components/trail/Trail";
import Bio from "../../components/bio/Bio";
import styles from "./styles.module.scss";
import Lines from "../../components/lines/Lines";
import Section from "../../components/section/Section";
import Bio2 from "../../components/bio2/Bio2";
import Grid from "../../components/grid/Grid";
import ProjectInfo from "../../components/projectInfo/ProjectInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const projectNames = ["Callme", "F12Performance", "Evmet", "eco4u", "Pinnacle"];

const Landing = () => {
    return (
        <Section>
            <div className={`${styles.landingContainer}`}>
                <Bio />
            </div>
            <ProjectInfo />
        </Section>
    );
};

export default Landing;
