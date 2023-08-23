import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { allProjects, decrement, increment } from "../redux/slices/scrollSlice";

export default function UseTouchNavigate() {
    const dispatch = useDispatch();
    const { project, level } = useSelector((state: RootState) => state.scroll);
    const prevLevelRef = useRef<number>(level); // Use a ref to store the previous level
    const projectRef = useRef<string>(project);

    useEffect(() => {
        console.log({ project });
        projectRef.current = project;
    }, [project]);

    function swipedetect(el: any, callback: (swipedir: any) => void) {
        var touchsurface = el,
            swipedir: string,
            startX: number,
            startY: number,
            distX,
            distY,
            threshold = 100, //required min distance traveled to be considered swipe
            restraint = 100, // maximum distance allowed at the same time in perpendicular direction
            allowedTime = 300, // maximum time allowed to travel that distance
            elapsedTime,
            startTime: number,
            handleswipe = callback || function (swipedir: any) {};

        touchsurface.addEventListener(
            "touchstart",
            function (e: {
                changedTouches: any[];
                preventDefault: () => void;
            }) {
                var touchobj = e.changedTouches[0];
                swipedir = "none";
                // dist = 0
                startX = touchobj.pageX;
                startY = touchobj.pageY;
                startTime = new Date().getTime(); // record time when finger first makes contact with surface
                // e.preventDefault();
            },
            false
        );

        touchsurface.addEventListener(
            "touchmove",
            function (e: { preventDefault: () => void }) {
                e.preventDefault(); // prevent scrolling when inside DIV
            },
            false
        );

        touchsurface.addEventListener(
            "touchend",
            function (e: {
                changedTouches: any[];
                preventDefault: () => void;
            }) {
                var touchobj = e.changedTouches[0];
                distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
                distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
                elapsedTime = new Date().getTime() - startTime; // get time elapsed
                if (elapsedTime <= allowedTime) {
                    // first condition for awipe met
                    if (
                        Math.abs(distX) >= threshold &&
                        Math.abs(distY) <= restraint
                    ) {
                        // 2nd condition for horizontal swipe met
                        swipedir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
                    } else if (
                        Math.abs(distY) >= threshold &&
                        Math.abs(distX) <= restraint
                    ) {
                        // 2nd condition for vertical swipe met
                        swipedir = distY < 0 ? "up" : "down"; // if dist traveled is negative, it indicates up swipe
                    }
                }
                handleswipe(swipedir);
                // e.preventDefault();
            },
            false
        );
    }
    useEffect(() => {
        window.addEventListener("load", () => {
            let el = document.getElementById("app");
            swipedetect(el, function (swipedir) {
                if (swipedir !== "none") {
                    console.log(swipedir);
                }
                if (swipedir === "up" && prevLevelRef.current !== 1) {
                    dispatch(increment());

                    if (prevLevelRef.current === 0) {
                        window.history.pushState("work", "", "work");
                    }
                } else if (swipedir === "down" && prevLevelRef.current > 0) {
                    if (projectRef.current !== "all") {
                        return;
                    } else {
                        dispatch(decrement());
                        window.history.pushState(null, "", "/");
                    }
                } else if (
                    swipedir === "right" &&
                    projectRef.current !== "all"
                ) {
                    dispatch(allProjects());
                    if (prevLevelRef.current === 1) {
                        window.history.pushState({}, "", "/work");
                    }
                }
            });
        });

        return () => {
            window.removeEventListener("load", () => {});
        };
    }, []);

    useEffect(() => {
        prevLevelRef.current = level;
    }, [level]);
}
