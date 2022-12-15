import axios from "axios";
import { useEffect } from "react";
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

const SearchList = ({ searchList, setSearchList, planId, plan, setPlan }: any) => {
    const onAddPath = async (title: string, address: string, latLng: naver.maps.LatLng) => {
        const planResult = JSON.parse(JSON.stringify(plan));
        console.log("planResult.length");
        const order = planResult[planResult.length - 1].order + 1;
        console.log(order);
        planResult.push({ planId, order, title, address, lat: latLng.y, lng: latLng.x });
        setPlan(planResult);
        const response = await axios({
            method: "POST",
            url: "https://localhost:8000/plan/add",
            params: {
                planId,
                order,
                address,
                title,
                lat: latLng.y,
                lng: latLng.x,
            },
        });
        console.log(response);

        setSearchList([]);
    };

    return (
        <>
            {Array.isArray(searchList) && searchList.length === 0 ? null : (
                <h3 className="list__title">검색결과 나오는 곳</h3>
            )}
            <ul className="list__route">
                {searchList ? (
                    searchList.map((item: apiInfo, index: number) => {
                        const { address, category, mapx, mapy } = item;
                        const title = item.title.replace(/<b>|<\/b>|&amp;/g, "");

                        const latLng = naver.maps.TransCoord.fromTM128ToLatLng(new naver.maps.Point(mapx, mapy));

                        console.log(latLng);

                        return (
                            <li className="list__item" key={index}>
                                <div className="box__flex">
                                    <div className="icon__number">{index + 1}</div>
                                    <div
                                        className="box__desc"
                                        onClick={() => {
                                            console.log("클릭!!");
                                        }}
                                    >
                                        <h3 className="text__title">{title.replace(/<b>|<\/b>|&amp;/g, "")}</h3>
                                        <p className="text__address">{address}</p>
                                        <p className="text">카테고리 : {category.split(/>/g)[1]}</p>
                                        <p>위도(lat):{latLng.y}</p>
                                        <p>경도(lng):{latLng.x}</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="button button3"
                                        onClick={() => {
                                            {
                                                onAddPath(title, address, latLng);
                                            }
                                        }}
                                    >
                                        추가
                                    </button>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <div>결과가 없습니다</div>
                )}
            </ul>
        </>
    );
};

export default SearchList;
