import React, { useEffect, useRef } from "react";

interface Objectprops {
    [key: number]: number[];
}

interface Mapsprops {
    polyPath: Objectprops; // path의 위도, 경도값은 반대로 들어가 있음
    travelRoute: number[][] | undefined;
    center: naver.maps.LatLng | undefined;
}

const Maps = ({ polyPath, travelRoute, center }: Mapsprops) => {
    const mapElement = useRef(null);

    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;

        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const centerLocation = center;

        const mapOptions: naver.maps.MapOptions = {
            center: centerLocation,
            zoom: 11,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };

        const map = new naver.maps.Map(mapElement.current, mapOptions);

        const markers: naver.maps.Marker[] = [];

        if (travelRoute) {
            for (let i = 0; i < travelRoute.length; i++) {
                const icon = {
                    url: "https://localhost:3000/sp_pins_spot_v3.png",
                    size: new naver.maps.Size(24, 37),
                    anchor: new naver.maps.Point(12, 37),
                    origin: new naver.maps.Point(i * 29, 0),
                };

                const markerLat = travelRoute[i][0];
                const markerLng = travelRoute[i][1];

                const otherMarkers = new naver.maps.Marker({
                    position: new naver.maps.LatLng(markerLat, markerLng),
                    map,
                    icon,
                });

                markers.push(otherMarkers);
            }
        }

        const polyPaths: naver.maps.LatLng[] = [];

        for (const key in polyPath) {
            const otherLine = new naver.maps.LatLng(polyPath[key][1], polyPath[key][0]);
            polyPaths.push(otherLine);
        }

        if (travelRoute && travelRoute.length === 1) {
            console.log("travelRoute 1개면 PolyLine 지우기");
            polyPaths.length = 0;
        }

        if (travelRoute && travelRoute.length === 0) {
            console.log("travelRoute 1개면 PolyLine 지우기");
        }

        new naver.maps.Polyline({
            map,
            path: polyPaths,
            strokeColor: "#f00",
            strokeOpacity: 0.7,
            strokeWeight: 5,
        });
    }, [travelRoute, polyPath]);

    const mapStyle = {
        width: "100%",
        height: "100%",
        margin: "0px",
    };

    return (
        <>
            <div ref={mapElement} style={mapStyle}></div>
        </>
    );
};

export default Maps;
