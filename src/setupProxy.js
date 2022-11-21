const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
        })
    );
    // 네이버 지역 검색 API
    app.use(
        "/search",
        createProxyMiddleware({
            target: "https://openapi.naver.com/v1",
            changeOrigin: true,
        })
    );

    // 네이버 지도 API
    app.use(
        createProxyMiddleware(["/map-direction", "/map-direction-15"], {
            target: "https://naveropenapi.apigw.ntruss.com",
            changeOrigin: true,
        })
    );
};
