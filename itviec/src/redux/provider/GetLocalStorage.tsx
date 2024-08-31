import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../reducers/auth-slice";

export default function GetLocalStorage({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        const user_data = localStorage.getItem("user");
        if (user_data) {
            dispatch(loginSuccess(JSON.parse(user_data)));
        }
    }, []);
    return children;
}
