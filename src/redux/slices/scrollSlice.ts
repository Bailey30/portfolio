import { createSlice } from "@reduxjs/toolkit";

export interface ScrollSlice {
    level: number;
    project: string;
}

const initialState: ScrollSlice = {
    level: 0,
    project: "all",
};

export const scrollSlice = createSlice({
    name: "scroll",
    initialState,
    reducers: {
        increment: (state: ScrollSlice) => {
            state.level += 1;
        },
        decrement: (state: ScrollSlice) => {
            state.level -= 1;
        },
        selectProject: (state: ScrollSlice, action) => {
            state.project = action.payload;
        },
        allProjects: (state: ScrollSlice) => {
            state.project = "all";
        },
    },
});

export const { increment, decrement, selectProject, allProjects } =
    scrollSlice.actions;
export default scrollSlice.reducer;
