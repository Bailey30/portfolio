import React from "react";
import styles from "./styles.module.scss";

interface Props {
    imageLoaded: boolean;
}

const Loading = ({ imageLoaded }: Props) => {
    return (
        <div className={`${styles.loading} ${imageLoaded && styles.loaded}`}>
            LOADING...
        </div>
    );
};

export default Loading;
