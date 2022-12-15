import SliderPlan from "../common/SliderPlan";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";

interface itemsProps {
    item: string;
    name: string;
}

const items: itemsProps[] = [
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/4654_large_square_1535621335.jpg?1535621335",
        name: "이미지01",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/4622_large_square_1535612092.jpg?1535612092",
        name: "이미지02",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/162_large_square_1405351663.jpg?1405351663",
        name: "이미지03",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/4737_large_square_1535949304.jpg?1535949304",
        name: "이미지04",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/4622_large_square_1535612092.jpg?1535612092",
        name: "이미지05",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/4654_large_square_1535621335.jpg?1535621335",
        name: "이미지06",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/4622_large_square_1535612092.jpg?1535612092",
        name: "이미지07",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/162_large_square_1405351663.jpg?1405351663",
        name: "이미지08",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/4737_large_square_1535949304.jpg?1535949304",
        name: "이미지09",
    },
    {
        item: "https://d2ur7st6jjikze.cloudfront.net/landscapes/4622_large_square_1535612092.jpg?1535612092",
        name: "이미지10",
    },
];

const Main = () => {
    return (
        <>
            <Header />
            <div className="section">
                <div className="box__title">
                    <h3 className="text__title">여행을 떠나보아요!</h3>
                </div>
                <ul className="list__trip">
                    <li className="list__item list__item--bg">
                        <Link to="/create">
                            <span className="text__desc">여행경로 만들기</span>
                        </Link>
                    </li>
                    <li className="list__item">
                        <Link to="/myplan">
                            <span className="text__desc">내 여행경로</span>
                        </Link>
                    </li>
                </ul>
                <div className="box__title">
                    <h3 className="text__title">추천 여행이 돌아왔어요!</h3>
                </div>
                <SliderPlan className="slider__product" speed={500} items={items} />

                <div className="box__title">
                    <h3 className="text__title">진짜 여행이 돌아왔어요!</h3>
                </div>
                <SliderPlan className="slider__product" speed={500} items={items} />
            </div>
            <Footer />
        </>
    );
};

export default Main;
