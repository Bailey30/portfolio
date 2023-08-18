import { useDispatch } from "react-redux";
import {
    allProjects,
    selectProject,
    setLevel,
} from "../redux/slices/scrollSlice";
import { useEffect } from "react";

export default function UseHistory() {
    const dispatch = useDispatch();
    const location = window.location.pathname;
    function handleHistory(e: any) {
        const state = e.state;

        if (state === null) {
            dispatch(setLevel(0));
        }

        if (state === "work") {
            dispatch(setLevel(1));
            dispatch(allProjects());
        }

        if (state !== "work" && state !== null) {
            dispatch(selectProject(state));
        }
    }

    useEffect(() => {
        console.log({ location });
        window.addEventListener("popstate", handleHistory);

        return () => {
            window.removeEventListener("popstate", handleHistory);
        };
    }, [location]);
}
