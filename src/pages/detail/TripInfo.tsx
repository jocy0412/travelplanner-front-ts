const TripInfo = ({ tripInfo }: any) => {
    return (
        <>
            <ul className="list__info">
                {tripInfo.distance !== 0 ? (
                    <li className="list__item">전체 거리: {tripInfo.distance / 1000}km</li>
                ) : null}
                {tripInfo.duration !== 0 ? (
                    <li className="list__item">전체 이동 시간: {Math.floor(tripInfo.duration / 60 / 1000)}분</li>
                ) : null}
                {tripInfo.taxiFare !== 0 ? <li className="list__item">택시비: {tripInfo.taxiFare}원</li> : null}
                {tripInfo.fuelPrice !== 0 ? <li className="list__item">유류비: {tripInfo.fuelPrice}원</li> : null}
            </ul>
        </>
    );
};

export default TripInfo;
