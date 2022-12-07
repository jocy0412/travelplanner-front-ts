import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeCookieToken } from "../../storage/Cookie";
import { SET_TOKEN, DELETE_TOKEN } from "../../store/Auth";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [swtich, setSwitch] = useState(false);
    const [cookies, setCookie] = useCookies(["jwtRefreshToken"]);

    const { accessToken, authenticated, expireTime } = useSelector((state: any) => state.authToken);

    const checkAccessToken = async () => {
        try {
            const result = await axios({
                method: "GET",
                url: "https://localhost:8000/user/getAccessToken",
                withCredentials: true,
            });

            if (result.status === 200) {
                dispatch(SET_TOKEN(result.data));
                setSwitch(true);
            } else {
                setSwitch(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (Object.keys(cookies).length > 0) {
            if (!accessToken) {
                checkAccessToken();
            }
        } else {
            setSwitch(false);
        }
    }, [cookies]);

    useEffect(() => {
        console.log("--accessToken--");
        console.log(accessToken);
        console.log("--authenticated--");
        console.log(authenticated);
        console.log("--expireTime--");
        console.log(expireTime);
    }, [accessToken]);

    async function logout() {
        // store에 저장된 Access Token 정보를 삭제
        dispatch(DELETE_TOKEN());
        // Cookie에 저장된 Refresh Token 정보를 삭제
        removeCookieToken();
        setSwitch(false);
        navigate("/");
    }

    return (
        <div className="header">
            <div className="header__inner">
                <h1 className="icon__logo">
                    <Link to="/">Travel Planner</Link>
                </h1>
                <ul className="list__top-menu">
                    <li className="list__item">
                        {swtich === false ? (
                            <Link to="/login" className="link__text">
                                Login
                            </Link>
                        ) : (
                            <button type="button" onClick={logout}>
                                Logout
                            </button>
                        )}
                    </li>
                    <li className="list__item">
                        <Link to="/myplan" className="link__text">
                            내 여행경로
                        </Link>
                    </li>
                    <li className="list__item">
                        <Link to="/detail" className="link__text">
                            Detail
                        </Link>
                    </li>
                    <li className="list__item">
                        <Link to="/mypage" className="link__text">
                            My Page
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
