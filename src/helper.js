//toasts, setToastRerender를 props로 넘겨 줌
export const deleteToast = (id, toasts, setToastRerender) => {
    console.log("클릭한 햄토스트", id);

    //useRef를 사용하기 위해 current로 접근
    const filteredToasts = toasts.current.filter((toast) => {
        return toast.id !== id;
    });

    toasts.current = filteredToasts; //toasts의 값이 즉시 filteredToasts로 업데이트가 된다.
    //setToasts(filteredToasts); //지운 토스트 결과 업데이트
    setToastRerender((prev) => !prev); //토스트를 업데이트 시킨다. true이면 false, false 이면 true
};
