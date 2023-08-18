import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

interface Props {
    location?: string;
}
const Nav = ({ location }: Props) => {
    const [local, setLocal] = useState("");
    const project = useSelector((state: RootState) => state.scroll.project);

    useEffect(() => {
        if (location) {
            setLocal(location);
        } else {
            setLocal("work/" + project.split(" ").join("_"));
        }
    }, [location, project]);

    return (
        <div className={styles.navContainer}>
            <p>alex_bailey/{local}</p>
        </div>
    );
};

export default Nav;
