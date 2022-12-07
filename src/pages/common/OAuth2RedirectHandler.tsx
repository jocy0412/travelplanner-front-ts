import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { SET_TOKEN } from "../../store/Auth";

const OAuth2RedirectHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");

    // front에 verify code 전달을 통한 토큰 정보 받기
    (async () => {
        try {
            const response: any = await axios({
                method: "GET",
                url: "https://localhost:8000/oauth/callback/kakao",
                params: {
                    code,
                },
                withCredentials: true,
            });

            console.log(response);

            // 쿠키에 Refresh Token, store에 Access Token 저장
            dispatch(SET_TOKEN(response.jwtAccessToken));
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("잘못된 접근 경로로 홈으로 이동합니다.");
            navigate("/");
        }
    })();

    return (
        <>
            <div>카카오 아이디로 로그인 중</div>
        </>
    );
};

export default OAuth2RedirectHandler;
