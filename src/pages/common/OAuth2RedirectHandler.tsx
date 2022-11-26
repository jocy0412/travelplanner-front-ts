import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";

const OAuth2RedirectHandler = (props: any) => {
    const [acessToken, setAcessToken] = useState("아직 없음");

    const code = new URL(window.location.href).searchParams.get("code");

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    const uri = "https://kauth.kakao.com/oauth/token";
    const data = qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
        redirect_uri: "http://localhost:3000/oauth/callback/kakao",
        code,
    });

    (async () => {
        try {
            const response = await axios({
                method: "post",
                headers,
                url: uri,
                data,
            });
            const token = response.data.access_token;

            const result = await axios({
                method: "post",
                url: "http://localhost:8080/oauth/callback/kakao",
                data: {
                    token,
                },
            });
            console.log(response.data);
            console.log(result.data);
            // window.location.replace("/");
        } catch (error) {
            console.log(error);
        }
    })();

    return (
        <>
            <div>카카오 아이디로 로그인 중</div>
        </>
    );
};

export default OAuth2RedirectHandler;
