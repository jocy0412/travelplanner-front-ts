import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import Header from "../common/Header";
import axios from "axios";
const Myplan = () => {
    return (
        <>
            <Header />
            <div className="box__detail">
                <div className="container">
                    <ul className="list__plan">
                        <li className="list__item">
                            <div className="item__plan">
                                <h2 className="text__title">여행계획1</h2>
                                <p className="text__desc">설명설명설명</p>
                            </div>
                        </li>
                        <li className="list__item">
                            <div className="item__plan">
                                <h2 className="text__title">여행계획1</h2>
                                <p className="text__desc">설명설명설명</p>
                            </div>
                        </li>
                        <li className="list__item">
                            <div className="item__plan">
                                <h2 className="text__title">여행계획1</h2>
                                <p className="text__desc">설명설명설명</p>
                            </div>
                        </li>
                        <li className="list__item">
                            <div className="item__plan">
                                <h2 className="text__title">여행계획1</h2>
                                <p className="text__desc">설명설명설명</p>
                            </div>
                        </li>
                        <li className="list__item">
                            <div className="item__plan">
                                <h2 className="text__title">여행계획1</h2>
                                <p className="text__desc">설명설명설명</p>
                            </div>
                        </li>
                        <li className="list__item">
                            <div className="item__plan">
                                <h2 className="text__title">여행계획1</h2>
                                <p className="text__desc">설명설명설명</p>
                            </div>
                        </li>
                        <li className="list__item">
                            <div className="item__plan">
                                <h2 className="text__title">여행계획1</h2>
                                <p className="text__desc">설명설명설명</p>
                            </div>
                        </li>
                        <li className="list__item">
                            <div className="item__plan">
                                <h2 className="text__title">여행계획1</h2>
                                <p className="text__desc">설명설명설명</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Myplan;
