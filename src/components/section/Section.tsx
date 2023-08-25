import React, { PropsWithChildren, ReactNode } from "react";

import styles from "./styles.module.scss";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Section = ({ children }: PropsWithChildren) => {
    const level = useSelector((state: RootState) => state.scroll.level);

    return (
        <div
            className={`${styles.sectionContainer} ${
                level !== 0 && styles.infoVisible
            }`}
        >
            {children}
        </div>
    );
};

export default Section;
