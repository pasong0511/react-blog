import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //state임
    toasts: [],
};

const toastSlice = createSlice({
    //사용할 이름
    name: "toast",
    //state의 초기 상태
    initialState: initialState,
    //state를 변경하는 업데이트 함수
    reducers: {
        //state : Slice안에 initialState의 toasts
        //action안에는 payload가 있다.
        addToast: (state, action) => {
            state.toasts.push(action.payload);
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter((toast) => {
                return toast.id !== action.payload;
            });
        },
    },
});

//console.log(toastSlice.actions.addToast("hello"));

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
