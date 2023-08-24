import React, { PropsWithChildren, ReactNode } from "react";

import styles from "./styles.module.scss";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Section = ({ children }: PropsWithChildren) => {
    const project = useSelector((state: RootState) => state.scroll.project);

    return (
        <div
            className={`${styles.sectionContainer} ${
                project !== "all" && styles.infoVisible
            }`}
        >
            {children}
        </div>
    );
};

export default Section;
