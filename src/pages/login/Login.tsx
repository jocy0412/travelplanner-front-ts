import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const Login = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="section__login">
                <div className="logo__travel">
                    <span className="for-a11y">Travel Planner</span>
                    <img src="https://dffoxz5he03rp.cloudfront.net/icons/logo_mrt_web.svg" alt="logo" />
                </div>
                <div className="box__input">
                    <input type="text" placeholder="ID(아이디 또는 이메일)" title="id" name="id" />
                    <input type="password" placeholder="비밀번호" title="password" name="password" />
                </div>
                <div className="box__button">
                    <Button primary>Travel Planner 로그인</Button>
                    <Button background="#fae100" color="white">
                        카카오로 계정으로 로그인
                    </Button>
                </div>
                <ul className="list__login-menu">
                    <li>
                        <Button
                            background="#900"
                            color="white"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            회원가입
                        </Button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Login;
