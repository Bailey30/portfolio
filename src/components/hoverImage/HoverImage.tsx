import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { data } from "./data";

interface Props {
    active: number | "none";
    parentHovered: boolean;
}

const HoverImage = ({ active, parentHovered }: Props) => {
    const itemsRef = useRef([]) as any;

    const [imagePool, setImagePool] = useState<{ img: string; id: number }[]>(
        []
    );

    useEffect(() => {
        console.log({ active });
        if (active === "none") {
            return;
        }

        let imgPool = [...imagePool];
        imgPool.push({ img: data[active].img, id: uuidv4() });
        if (imgPool.length > data.length * 2) imgPool.shift();
        setImagePool(imgPool);
    }, [active]);

    return (
        <div className={styles.imageContainer}>
            {/* {active !== "none" && (
                <img
                    src={prevImage}
                    alt="project"
                    className={`${styles.prevImage} ${
                        animate && styles.animate
                    }`}
                />
            )}
            <img
                src={activeImage}
                alt="project"
                className={styles.activeImage}
            /> */}
            {imagePool.map((image, i) => {
                return (
                    <img
                        src={image.img}
                        key={image.id}
                        alt="project"
                        className={`${
                            imagePool[0] === image && styles.activeImage
                        } ${imagePool[1] === image && styles.prevImage} ${
                            imagePool.includes(image) && styles.animate
                        } ${!parentHovered && styles.exit}`}
                        id={image.img}
                        ref={(el) => (itemsRef.current[i] = el)}
                    />
                );
            })}
        </div>
    );
};

export default HoverImage;
