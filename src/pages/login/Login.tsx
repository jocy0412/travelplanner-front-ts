import { useNavigate, Link } from "react-router-dom";
import Button from "../common/Button";
import { KAKAO_AUTH_URL } from "../common/OAuth";

const Login = () => {
    const navigate = useNavigate();
    const kakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <>
            <div className="section__login">
                <div className="logo__travel">
                    <span className="for-a11y">Travel Planner</span>
                    <img src="https://dffoxz5he03rp.cloudfront.net/icons/logo_mrt_web.svg" alt="logo" />
                </div>
                <div className="box__button">
                    <Button onClick={kakaoLogin} background="#fae100" color="black">
                        카카오로 계정으로 로그인
                    </Button>
                    <Button
                        background="#900"
                        color="white"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        홈으로 가기
                    </Button>
                </div>
                {/* <ul className="list__login-menu">
                    <li>
                        <Button
                            background="#900"
                            color="white"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            홈으로 가기
                        </Button>
                    </li>
                </ul> */}
            </div>
        </>
    );
};

export default Login;
