import { createSlice } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 600 * 1000;

export const tokenSlice = createSlice({
    name: "authToken",
    initialState: {
        accessToken: null,
        authenticated: false,
        expireTime: null,
    },
    reducers: {
        SET_TOKEN: (state, action) => {
            state.accessToken = action.payload;
            state.authenticated = true;
            state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
        },
        DELETE_TOKEN: (state) => {
            state.accessToken = null;
            state.authenticated = false;
            state.expireTime = null;
        },
    },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
