import axios from "axios";
import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import Header from "../common/Header";
import Maps from "../detail/Maps";
import DndContainer from "./DndContainer";
import SearchList from "./SearchList";

interface apiInfo {
    address: string;
    category: string;
    description: string;
    link: string;
    mapx: number;
    mapy: number;
    roadAddress: string;
    telephone: string;
    title: string;
}

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
            console.log("길찾기(지도API) 호출 성공!");
            const { route } = response.data;
            return route.trafast[0].path;
        });

    return routes;
};

const Detail = () => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchValue(value);
    };

    const [searchList, setSearchList] = useState<apiInfo[] | undefined>([]);

    const [plan, setPlan] = useState([
        {
            title: "NAVER",
            address: "경기도 성남시 분당구 정자동 178-4",
            lat: "37.3588517",
            lng: "127.10523660",
        },
        {
            title: "이마트 분당점",
            address: "경기도 성남시 분당구 정자동 211",
            lat: "37.3588517",
            lng: "127.11978810",
        },
        {
            title: "분당고등학교",
            address: "경기도 성남시 분당구 수내1동 25",
            lat: "37.3756299",
            lng: "127.1161713",
        },
        {
            title: "코이라멘",
            address: "경기도 성남시 분당구 정자동 17-4 제나프라자",
            lat: "37.3638071",
            lng: "127.10647690",
        },
    ]);

    useEffect(() => {
        const arr: number[][] = [];
        plan.forEach((e, i: number) => {
            arr[i] = [Number(e.lat), Number(e.lng)];
        });
        setTravelRoute(arr);
    }, [plan]);

    const searchLocation = async () => {
        const value = searchValue;
        console.log(value);

        const paramConfig = {
            // withCredentials: true,
            headers: {
                "X-Naver-Client-Id": process.env.REACT_APP_NAVER_SEARCH_CLIENT,
                "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_SEARCH_CLIENT_SECRET,
            },
        };
        if (value && value.replace(/\s/g, "").length) {
            await axios.get(`search/local.json?query=${value}&display=5`, paramConfig).then((response) => {
                console.log("지도API 경로 호출 성공!");
                const data = response.data;
                console.log(data.items);

                if (data.items.length) {
                    setSearchList(data.items);
                } else {
                    setSearchList(undefined);
                }
            });
        } else {
            alert("검색 지역을 입력하세요!");
            setSearchValue("");
        }
    };

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            searchLocation();
        }
    };

    const [path, setPath] = useState([]);

    // const route: number[][] = [
    //     [37.358408, 127.1059342],
    //     [37.356808, 127.1192342],
    //     [37.369708, 127.1116342],
    //     [37.363718, 127.1065342],
    // ];

    const [travelRoute, setTravelRoute] = useState<number[][]>([[37.3588517, 127.1052366]]);

    if (travelRoute) {
        const start = travelRoute ? `${travelRoute[0][1]},${travelRoute[0][0]}` : `${[37.3588517, 127.1052366]}`;

        useEffect(() => {
            if (travelRoute.length >= 2) {
                const copy = JSON.parse(JSON.stringify(travelRoute));
                copy.splice(0, 1);
                copy.splice(-1, 1);

                const result = copy.map((item: [], i: number) => {
                    return (copy[i] = item.reverse().join(","));
                });
                const waypoints = result.join("|");
                const goal = `${travelRoute[travelRoute.length - 1][1]},${travelRoute[travelRoute.length - 1][0]}`;
                // 검색 API
                const res: Promise<any> = getMapInfo(start, goal, waypoints);

                res.then((value) => {
                    setPath(value);
                });
            }
        }, [travelRoute]);
    } else {
        console.log(travelRoute);
        console.log("travelRoute 빈 값!");
    }

    return (
        <>
            <Header />

            <div className="box__detail">
                <div className="left__section">
                    <div className="box__search">
                        <input
                            ref={searchInput}
                            className="input"
                            onChange={onChange}
                            onKeyPress={onKeyPress}
                            value={searchValue}
                            name="searchInput"
                        />
                        <button type="button" className="button button4" onClick={searchLocation}>
                            검색
                        </button>
                    </div>

                    <DndContainer plan={plan} setPlan={setPlan} />
                    <SearchList searchList={searchList} setSearchList={setSearchList} plan={plan} setPlan={setPlan} />
                </div>
                <div className="right__section">
                    <div className="map__area">
                        <Maps path={path} travelRoute={travelRoute} />
                    </div>
                    <div className="search__bar">
                        <input className="input" />
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
                        <button type="button" className="button button5">
                            button5
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
