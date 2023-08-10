import React, { PropsWithChildren, ReactNode } from "react";

import styles from "./styles.module.scss";

const Section = ({ children }: PropsWithChildren) => {
    return <div className={styles.sectionContainer}>{children}</div>;
};

export default Section;
