import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProjects, decrement } from "../../redux/slices/scrollSlice";
import styles from "./styles.module.scss";
import { Data, data } from "./data";
import { RootState } from "../../redux/store";
import Nav from "../nav/Nav";
import squareArrowGreen from "../../assets/images/squareArrow2green.svg";
import squareArrow from "../../assets/images/squareArrow2.svg";

interface infoI {
    img: string;
    tools: string[];
    role: string;
    name: string;
    date: string;
    link: string;
}
const ProjectInfo = () => {
    const dispatch = useDispatch();
    const project = useSelector((state: RootState) => state.scroll.project);
    const [info, setInfo] = useState<infoI>({
        img: "",
        name: "",
        role: "",
        tools: [""],
        date: "",
        link: "",
    });
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        console.log(project);
        if (project !== "all") {
            setInfo(data[project.split(" ").join("")]);
        }
    }, [project]);

    function handleReturnToProjects() {
        dispatch(allProjects());
        window.history.pushState({}, "", "/work");
    }

    return (
        <div className={`${styles.infoContainer}`}>
            <div className={styles.info}>
                <div className={styles.nav}>
                    <img
                        src={squareArrow}
                        alt="arrow"
                        onClick={() => handleReturnToProjects()}
                    />
                </div>

                <div className={styles.infoInner}>
                    <div className={`${styles.imageContainer}`}>
                        {
                            <img
                                src={info.img}
                                alt="gif showing website"
                                onLoad={() => setImageLoaded(true)}
                            />
                        }
                    </div>
                    <div className={styles.name}>
                        <h3>
                            {info.name} <span className={styles.dash}>-</span>{" "}
                            <span className={styles.role}>{info.role}</span>
                        </h3>
                        <a href={info.link} target="_blank" rel="noreferrer">
                            visit site
                            <img src={squareArrowGreen} alt="arrow in link" />
                        </a>
                    </div>
                    <div className={styles.date}>{info.date}</div>
                    <div className={styles.tools}>{info.tools.join(" / ")}</div>
                </div>
            </div>
            <div className={styles.footer}>
                <Nav />
            </div>
        </div>
    );
};

export default ProjectInfo;
