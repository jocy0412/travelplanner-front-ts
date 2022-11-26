import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Detail from "./pages/detail/Detail";
import Login from "./pages/login/Login";
import Sign from "./pages/sign/Sign";
import Button from "./pages/common/Button";
import OAuth2RedirectHandler from "./pages/common/OAuth2RedirectHandler";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/oauth/callback/kakao" element={<OAuth2RedirectHandler />} />
                <Route path="/login" element={<Login />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/signup" element={<Sign />} />
                <Route
                    path="/buttton"
                    element={
                        <div>
                            <Button children="Default Button"></Button>
                            <Button children="Green Button" background="pink" color="green"></Button>
                            <Button children="Blue Button" primary></Button>
                        </div>
                    }
                />
                <Route path={"*"} element={<div>404 없는 페이지</div>} />
            </Routes>
        </div>
    );
}

export default App;
