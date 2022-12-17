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
                    <img
                        src="https://myawstravel.s3.ap-northeast-2.amazonaws.com//image/earth_1671289940398.png"
                        alt="logo"
                    />
                    <h1 className="text__service">TravelPlanner</h1>
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
