import axios from "axios";
import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import Header from "../common/Header";
import Maps from "../detail/Maps";
import DndContainer from "./DndContainer";
import SearchList from "./SearchList";
import TripInfo from "./TripInfo";

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

interface dbRoute {
    planId: string;
    order: number;
    title: string;
    address: string;
    lat: string;
    lng: string;
}

interface routeInfo {
    distance: number;
    duration: number;
    taxiFare: number;
    fuelPrice: number;
}

const getMapInfo = async (start: string, goal: string, waypoints: string) => {
    const option = "trafast";
    const routes = await axios({
        method: "GET",
        url: "/map-direction/v1/driving",
        params: {
            start,
            goal,
            waypoints,
            option,
        },
        headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAP_CLIENT,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAP_CLIENT_SECRET,
        },
    }).then((response) => {
        console.log("길찾기(지도API) 호출 성공!");
        const { route } = response.data;
        const result = route.trafast[0];
        return result;
    });

    return routes;
};

const Detail = () => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchList, setSearchList] = useState<apiInfo[] | undefined>([]);
    const [plan, setPlan] = useState<dbRoute[] | undefined>([]);
    const [center, setCenter] = useState<naver.maps.LatLng | undefined>(new naver.maps.LatLng(33.3591429, 126.5343436));
    const [polyPath, setPolyPath] = useState([]);
    const [travelRoute, setTravelRoute] = useState<number[][] | undefined>([]);
    const [planId, setPlanId] = useState("jeju");
    const [tripInfo, setTripInfo] = useState<routeInfo>({
        distance: 0,
        duration: 0,
        taxiFare: 0,
        fuelPrice: 0,
    });

    const searchLocation = async () => {
        const value = searchValue;

        if (value && value.replace(/\s/g, "").length) {
            await axios({
                method: "GET",
                url: "search/local.json",
                params: {
                    query: "제주 " + value,
                    display: 5,
                },
                headers: {
                    "X-Naver-Client-Id": process.env.REACT_APP_NAVER_SEARCH_CLIENT,
                    "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_SEARCH_CLIENT_SECRET,
                },
                withCredentials: true,
            }).then((res) => {
                console.log("지도 검색 API 경로 호출 성공!");
                const data = res.data;

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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchValue(value);
    };

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            searchLocation();
        }
    };

    useEffect(() => {
        if (travelRoute && travelRoute.length > 0) {
            const start = travelRoute ? `${travelRoute[0][1]},${travelRoute[0][0]}` : `${[37.3588517, 127.1052366]}`;
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
                    const { distance, duration, taxiFare, fuelPrice, tollFare } = value.summary;
                    setPolyPath(value.path);
                    const obj = { distance, duration, taxiFare, fuelPrice, tollFare };
                    setTripInfo(obj);
                });
            }
        }
    }, [travelRoute]);

    useEffect(() => {
        try {
            axios({
                method: "GET",
                url: "https://localhost:8000/plan/find",
                params: { planId },
            }).then((res) => {
                setPlan(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, [planId]);

    useEffect(() => {
        if (plan && plan.length > 0) {
            const arr: number[][] = [];
            plan.forEach((e, i: number) => {
                arr[i] = [Number(e.lat), Number(e.lng)];
            });
            setTravelRoute(arr);
        }
    }, [plan]);

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
                        <button type="button" className="button button4" onClick={() => searchLocation()}>
                            검색
                        </button>
                    </div>
                    <DndContainer plan={plan} setPlan={setPlan} />
                    <SearchList
                        searchList={searchList}
                        setSearchList={setSearchList}
                        planId={planId}
                        plan={plan}
                        setPlan={setPlan}
                    />
                </div>
                <div className="right__section">
                    <div className="map__area">
                        <Maps polyPath={polyPath} travelRoute={travelRoute} center={center} />
                    </div>
                    {tripInfo.distance !== 0 ? <TripInfo tripInfo={tripInfo} /> : null}
                    {/* <div className="search__bar">
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
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Detail;
