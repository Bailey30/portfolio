import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    allProjects,
    decrement,
    setLevel,
} from "../../redux/slices/scrollSlice";
import styles from "./styles.module.scss";
import { Data, data } from "./data";
import { RootState } from "../../redux/store";
import Nav from "../nav/Nav";
import squareArrowGreen from "../../assets/images/squareArrow2green.svg";
import squareArrow from "../../assets/images/squareArrow2.svg";
import thinArrow from "../../assets/images/thinArrow.svg";
import Loading from "../loading/Loading";

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
        setImageLoaded(false);
        if (project !== "all") {
            setInfo(data[project.split(" ").join("")]);
        }
    }, [project]);

    function handleReturnToProjects() {
        // dispatch(allProjects());
        dispatch(setLevel(0));
        window.history.pushState(null, "", "/");
    }

    return (
        <div className={`${styles.infoContainer}`}>
            <div className={styles.info}>
                <div className={styles.nav}>
                    <img
                        src={thinArrow}
                        alt="arrow"
                        onClick={() => handleReturnToProjects()}
                    />
                    {/* <span onClick={() => handleReturnToProjects()}>BACK</span> */}
                </div>

                <div className={styles.infoInner}>
                    <div className={`${styles.imageContainer}`}>
                        <Loading imageLoaded={imageLoaded} />

                        {
                            <img
                                src={info.img}
                                alt="gif showing website"
                                onLoad={() =>
                                    setTimeout(() => {
                                        setImageLoaded(true);
                                    }, 1000)
                                }
                                className={`${imageLoaded && styles.loaded}`}
                            />
                        }
                    </div>
                    <div className={styles.name}>
                        <h3>{info.name}</h3>
                        <a href={info.link} target="_blank" rel="noreferrer">
                            visit <span className={styles.site}>site</span>
                            <img src={squareArrowGreen} alt="arrow in link" />
                        </a>
                    </div>
                    <div className={styles.date}>
                        <span className={styles.role}>{info.role}</span> -{" "}
                        {info.date}
                    </div>
                    <div className={styles.tools}>{info.tools.join(" / ")}</div>
                </div>
            </div>
            {/* <div className={styles.footer}>
                <Nav />
            </div> */}
        </div>
    );
};

export default ProjectInfo;
