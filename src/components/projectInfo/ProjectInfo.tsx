import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allProjects } from "../../redux/slices/scrollSlice";

const ProjectInfo = () => {
    const dispatch = useDispatch();

    function handleReturnToProjects() {
        dispatch(allProjects());
    }

    return (
        <div>
            <button onClick={handleReturnToProjects}>back</button>
        </div>
    );
};

export default ProjectInfo;
