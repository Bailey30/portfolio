import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/slices/scrollSlice";
import { RootState } from "../redux/store";

export const useScroll = () => {
    const dispatch = useDispatch();
    const level = useSelector((state: RootState) => state.scroll.level);
    let lastScrollTime = 0;
    const prevLevelRef = useRef<number>(level); // Use a ref to store the previous level

    function detectScrollDirection(event: { deltaY: number }) {
        const delta = event.deltaY;
        const now = performance.now();
        if (now - lastScrollTime < 100) {
            return; // Debounce to prevent rapid firing of events
        }

        if (delta > 0 && prevLevelRef.current !== 1) {
            console.log(delta, prevLevelRef.current);
            dispatch(increment());
        } else if (event.deltaY < 0 && prevLevelRef.current > 0) {
            dispatch(decrement());
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
        console.log({ level });
    }, [level]);

    useEffect(() => {
        prevLevelRef.current = level; // Update the previous level when 'level' changes
    }, [level]);
};
