import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toastSlice";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        //사용할 이름
        toast: toastReducer,
        auth: authReducer,
    },
});
