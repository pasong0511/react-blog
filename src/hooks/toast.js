import { v4 as uuid4 } from "uuid";

import { addToast as add, removeToast } from "../store/toastSlice";
import { useDispatch } from "react-redux";

//커스텀 훅스
const useToast = () => {
    const dispatch = useDispatch();

    const deleteToast = (id) => {
        // //useRef를 사용하기 위해 current로 접근
        // const filteredToasts = toasts.current.filter((toast) => {
        //     return toast.id !== id;
        // });

        // toasts.current = filteredToasts; //toasts의 값이 즉시 filteredToasts로 업데이트가 된다.
        // //setToasts(filteredToasts); //지운 토스트 결과 업데이트
        // setToastRerender((prev) => !prev); //토스트를 업데이트 시킨다. true이면 false, false 이면 true

        dispatch(removeToast(id));
    };

    const addToast = (toast) => {
        const id = uuid4(); //id 추가
        const toastWithId = {
            ...toast,
            id: id,
        };

        dispatch(add(toastWithId)); //action 함수를 이용해서 toasts에 추가하기
        //toasts.current = [...toasts.current, toastWithId]; //기존에 있던 토스트 넣어주고, 새로운 토스트 넣어준다.
        //setToasts((prev) => [...prev, toastWithId]); //기존에 있던거 넣어주고, 새로운 것도 넣어줌
        //setToastRerender((prev) => !prev); //토스트를 업데이트 시킨다. true이면 false, false 이면 true

        //3초 이후 삭제 토스트 버튼 사라짐
        setTimeout(() => {
            deleteToast(id);
        }, 3000);
    };

    return { addToast, deleteToast };
};

export default useToast;
