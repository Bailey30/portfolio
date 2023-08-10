import { createSlice } from "@reduxjs/toolkit";

export interface ScrollSlice {
    level: number;
}

const initialState: ScrollSlice = {
    level: 0,
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
    },
});

export const { increment, decrement } = scrollSlice.actions;
export default scrollSlice.reducer;
