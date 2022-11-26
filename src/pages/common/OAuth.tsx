// const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao"; // front 인가 코드 인증
// const REDIRECT_URI = "http://localhost:8080/oauth/callback/kakao"; // back 인가 코드 인증

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
