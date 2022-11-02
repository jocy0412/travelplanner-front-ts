import axios from "axios";
import { useState } from "react";
import Header from "../common/Header";
import Maps from "../detail/Maps";

const Detail = () => {
    const travelRoute: number[][] = [
        [37.358408, 127.1059342],
        [37.356808, 127.1192342],
        [37.369708, 127.1116342],
        [37.363708, 127.1065342],
    ];

    const copy = JSON.parse(JSON.stringify(travelRoute));
    copy.splice(0, 1);
    copy.splice(-1, 1);

    const result = copy.map((item: [], i: number) => {
        return (copy[i] = item.reverse().join(","));
    });
    const waypoints = result.join("|");

    const start = `${travelRoute[0][1]},${travelRoute[0][0]}`;
    const goal = `${travelRoute[travelRoute.length - 1][1]},${travelRoute[travelRoute.length - 1][0]}`;

    const [path, setPath] = useState([]);

    function getMapInfomation() {
        const option = "trafast";
        const config = {
            // withCredentials: true,
            headers: {
                "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAP_CLIENT,
                "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAP_CLIENT_SECRET,
            },
        };
        // 검색 - 지역 API는 위도 경도가 반대로 되어있음
        axios
            .get(
                `/map-direction-15/v1/driving?start=${start}&goal=${goal}&waypoints=${waypoints}&option=${option}`,
                config
            )
            .then((response) => {
                const { route } = response.data;
                console.log(route.trafast[0].path);
                setPath(route.trafast[0].path);
            });
    }

    return (
        <>
            <Header />
            <div className="section">
                <div className="box__detail">
                    <div className="left__section">
                        <ul>
                            <li>
                                <h3>여행지</h3>
                                <p>서울시 영등포구 영등포구 영등포구</p>
                            </li>
                            <li>
                                <h3>여행지</h3>
                                <p>서울시 영등포구 영등포구 영등포구</p>
                            </li>
                            <li>
                                <h3>여행지</h3>
                                <p>서울시 영등포구 영등포구 영등포구</p>
                            </li>
                            <li>
                                <h3>여행지</h3>
                                <p>서울시 영등포구 영등포구 영등포구</p>
                            </li>
                        </ul>
                    </div>
                    <div className="right__section">
                        <div className="map__area">
                            <Maps path={path} travelRoute={travelRoute} />
                        </div>
                        <div className="list__result">
                            <div className="search__bar">
                                <input className="input" />

                                <button className="button" onClick={() => getMapInfomation()}>
                                    지도 API
                                </button>
                                <button type="button" className="button">
                                    button
                                </button>
                                <button type="button" className="button button1">
                                    button1
                                </button>
                                <button type="button" className="button button2">
                                    button2
                                </button>
                                <button type="button" className="button button3">
                                    button3
                                </button>
                                <button type="button" className="button button4">
                                    button4
                                </button>
                            </div>
                            <ul className="list__result">
                                <li className="list__item">123123</li>
                                <li className="list__item">123123</li>
                                <li className="list__item">123123</li>
                                <li className="list__item">123123</li>
                                <li className="list__item">123123</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
