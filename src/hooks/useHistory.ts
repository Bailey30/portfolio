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
        console.log({ state });

        // "state" represents the page you want to navigate to
        if (state === null) {
            dispatch(setLevel(0));
            dispatch(allProjects());
        }

        if (state !== null) {
            dispatch(setLevel(1));
            dispatch(selectProject(state));
        }

        // when you use the browser back button and it takes you from all projects to a specific project
        if (state !== "work" && state !== null) {
            dispatch(selectProject(state));
        }
    }

    useEffect(() => {
        window.addEventListener("popstate", handleHistory);

        window.addEventListener("load", () => {
            if (location !== "/") {
                dispatch(setLevel(1));
                dispatch(selectProject(location.split("/")[1]));
            }
        });

        return () => {
            window.removeEventListener("popstate", handleHistory);
        };
    }, [location]);
}
