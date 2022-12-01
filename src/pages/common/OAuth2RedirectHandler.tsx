import axios from "axios";

const OAuth2RedirectHandler = () => {
    const code = new URL(window.location.href).searchParams.get("code");

    // front에 verify code 전달을 통한 토큰 정보 받기
    (async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "https://localhost:8000/oauth/callback/kakao",
                params: {
                    code,
                },
                withCredentials: true,
            });
            console.log(response);
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
