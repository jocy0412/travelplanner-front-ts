import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../common/Header";
import Maps from "../detail/Maps";

const getMapInfo = async (start: string, goal: string, waypoints: string) => {
    const paramOption = "trafast";
    const paramConfig = {
        // withCredentials: true,
        headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAP_CLIENT,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAP_CLIENT_SECRET,
        },
    };

    const routes = await axios
        .get(
            `/map-direction/v1/driving?start=${start}&goal=${goal}&waypoints=${waypoints}&option=${paramOption}`,
            paramConfig
        )
        .then((response) => {
            console.log("지도API 경로 호출 성공!");
            const { route } = response.data;
            return route.trafast[0].path;
        });

    return routes;
};

const Detail = () => {
    const route: number[][] = [
        [37.358408, 127.1059342],
        [37.356808, 127.1192342],
        [37.369708, 127.1116342],
        [37.363718, 127.1065342],
    ];
    const [travelRoute, setTravelRoute] = useState<number[][]>(route);

    const [path, setPath] = useState([]);

    const copy = JSON.parse(JSON.stringify(travelRoute));
    copy.splice(0, 1);
    copy.splice(-1, 1);

    const result = copy.map((item: [], i: number) => {
        return (copy[i] = item.reverse().join(","));
    });
    const waypoints = result.join("|");

    const start = `${travelRoute[0][1]},${travelRoute[0][0]}`;
    const goal = `${travelRoute[travelRoute.length - 1][1]},${travelRoute[travelRoute.length - 1][0]}`;

    useEffect(() => {
        const res: Promise<any> = getMapInfo(start, goal, waypoints);

        res.then((value) => {
            setPath(value);
        });

        // console.log("Detail 컴포넌트 useEffect 실행완료!");
        console.log("리로드 되었거나 travelRoute 값 변경!");
    }, [travelRoute]);

    const appendData = () => {
        const copy = [...travelRoute];
        copy.push([37.368708, 127.1061342]);
        setTravelRoute(copy);
    };

    return (
        <>
            <Header />

            <div className="box__detail">
                <div className="left__section">
                    <div className="box__search">
                        <input className="input" />
                        <button type="button" className="button button4">
                            검색
                        </button>
                    </div>
                    <ul className="list__route">
                        <li className="list__item">
                            <h3 className="text__title">여행지</h3>
                            <p className="text__address">서울시 영등포구 영등포구 영등포구</p>
                        </li>
                        <li className="list__item">
                            <h3 className="text__title">여행지</h3>
                            <p className="text__address">서울시 영등포구 영등포구 영등포구</p>
                        </li>
                        <li className="list__item">
                            <h3 className="text__title">여행지</h3>
                            <p className="text__address">서울시 영등포구 영등포구 영등포구</p>
                        </li>
                    </ul>
                </div>
                <div className="right__section">
                    <div className="map__area">
                        <Maps path={path} travelRoute={travelRoute} />
                    </div>
                    <div className="list__result">
                        <ul className="list__result">
                            <li className="list__item">123123</li>
                            <li className="list__item">123123</li>
                            <li className="list__item">123123</li>
                            <li className="list__item">123123</li>
                            <li className="list__item">123123</li>
                        </ul>
                        <div className="search__bar">
                            <input className="input" />

                            {/* <button className="button" onClick={() => getMapInfo()}>
                                지도 API
                            </button> */}
                            <button type="button" className="button" onClick={() => appendData()}>
                                데이터 추가
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
