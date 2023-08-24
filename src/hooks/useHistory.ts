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

        // "state" represents the page you want to navigate to
        if (state === null) {
            dispatch(setLevel(0));
            dispatch(allProjects());
        }

        if (state === "work") {
            dispatch(setLevel(1));
            dispatch(allProjects());
        }

        // when you use the browser back button and it takes you from all projects to a specific project
        if (state !== "work" && state !== null) {
            dispatch(selectProject(state));
        }
    }

    useEffect(() => {
        window.addEventListener("popstate", handleHistory);

        return () => {
            window.removeEventListener("popstate", handleHistory);
        };
    }, [location]);
}
