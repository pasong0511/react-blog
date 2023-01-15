import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false, //로그인 상태를 나타냄
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state) => {
            localStorage.setItem("isLoggedIn", "yes"); //로컬스토리지에 로그인 상태 저장
            state.isLoggedIn = true;
        },
        logout: (state) => {
            localStorage.removeItem("isLoggedIn"); //로그아웃시 로컬스토리지에서 제거
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
