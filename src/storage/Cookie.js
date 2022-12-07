import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (jwtRefreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    return cookies.set("jwtRefreshToken", jwtRefreshToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(expireDate),
    });
};

export const getCookieToken = () => {
    return cookies.get("jwtRefreshToken");
};

export const removeCookieToken = () => {
    return cookies.remove("jwtRefreshToken", { sameSite: "strict", path: "/" });
};
