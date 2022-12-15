import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
const Myplan = () => {
    const [list, setList] = useState<number[] | undefined>();
    useEffect(() => {
        const copy = [1, 2, 3, 4, 5, 6, 7, 8];
        setList(copy);
    }, []);
    return (
        <>
            <Header />
            <div className="box__detail">
                <div className="container">
                    <ul className="list__plan">
                        {list &&
                            list.map((a, i) => {
                                return (
                                    <li className="list__item" key={i}>
                                        <Link to={`/detail/${i + 1}`}>
                                            <div className="item__plan">
                                                <h2 className="text__title">여행계획{i + 1}</h2>
                                                <p className="text__desc">설명설명설명{i + 1}</p>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Myplan;
