import { useMemo } from "react";
import Slider, { Settings } from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type SlideItems = {
    item: string;
    name: string;
};

interface sliderProps {
    /** 슬라이더 아이템 요소 */
    // children: React.ReactNode;
    /** 커스텀 클래스 */
    className?: string;
    /** 자동재생 (속도 설정시 number 타입으로) */
    autoplay?: boolean | number;
    /** 슬라이더 속도 */
    speed?: number;
    /** 반복 여부 */
    loop?: boolean;
    items: SlideItems[];
}

function SliderPlan({ className, autoplay = true, speed = 300, loop = true, items }: sliderProps) {
    const arr = items;
    const settings = useMemo<Settings>(
        () => ({
            dots: true,
            infinite: loop,
            speed: speed,
            slidesToShow: 5,
            slidesToScroll: 5,
            autoplay: Boolean(autoplay),
            autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
        }),
        [autoplay, loop, speed]
    );
    return (
        <>
            <Slider {...settings} className={className}>
                {arr.map((item: SlideItems, idx: number) => {
                    return (
                        <div key={idx}>
                            <div className="box__slide">
                                <Link to={"/detail/" + 1}>
                                    <span className="text__num">{idx + 1}</span>
                                    <img src={item.item} alt={item.name} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
}

export default SliderPlan;
