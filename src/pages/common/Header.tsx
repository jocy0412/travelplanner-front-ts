import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className="header">
            <div className="header__inner">
                <h1 className="icon__logo">
                    <Link to="/">Travel Planner</Link>
                </h1>
                <ul className="list__top-menu">
                    <li className="list__item">
                        <Link to="/login" className="link__text">
                            Login
                        </Link>
                    </li>
                    <li className="list__item">
                        <Link to="/signup" className="link__text">
                            회원가입
                        </Link>
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
