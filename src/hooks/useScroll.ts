import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    allProjects,
    decrement,
    increment,
    selectProject,
    setLevel,
} from "../redux/slices/scrollSlice";
import { RootState } from "../redux/store";

export const useScroll = () => {
    const dispatch = useDispatch();
    const { project, level } = useSelector((state: RootState) => state.scroll);
    let lastScrollTime = 0;
    const prevLevelRef = useRef<number>(level); // Use a ref to store the previous level
    const projectRef = useRef<string>(project);

    useEffect(() => {
        console.log({ project });
        projectRef.current = project;
    }, [project]);

    function detectScrollDirection(event: { deltaY: number }) {
        const delta = event.deltaY;
        const now = performance.now();
        if (now - lastScrollTime < 100) {
            return; // Debounce to prevent rapid firing of events
        }

        if (delta > 0 && prevLevelRef.current !== 1) {
            console.log(delta, prevLevelRef.current);
            dispatch(increment());

            if (prevLevelRef.current === 0) {
                window.history.pushState("work", "", "work");
            }
        } else if (event.deltaY < 0 && prevLevelRef.current > 0) {
            console.log("decrement");
            console.log({ project });
            if (projectRef.current !== "all") {
                return;
            } else {
                dispatch(decrement());
                window.history.pushState(null, "", "/");
            }
        }

        lastScrollTime = now;
    }
    useEffect(() => {
        document.addEventListener("wheel", (e) => detectScrollDirection(e));

        return () => {
            document.removeEventListener("wheel", () => {});
        };
    }, []);

    useEffect(() => {
        prevLevelRef.current = level;
    }, [level]);
};
