import { configureStore } from "@reduxjs/toolkit";
import scrollSlice from "./slices/scrollSlice";

export const store = configureStore({
    reducer: {
        scroll: scrollSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
