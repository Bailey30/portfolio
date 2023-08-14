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
                {/* <Bio /> */}
                <Bio2 />

                {/* <Trail /> */}
                <Lines />
                {/* <Grid /> */}
            </div>
            <svg>
                <filter id="noiseFilter">
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.5"
                        stitchTiles="stitch"
                    />
                    {/* <feColorMatrix
                        in="colorNoise"
                        type="matrix"
                        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
                    />
                    <feComposite
                        operator="in"
                        in2="SourceGraphic"
                        result="monoNoise"
                    /> */}
                    <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
                </filter>
            </svg>
            <div className={styles.filterDiv}></div>
        </Section>
    );
};

export default Landing;
