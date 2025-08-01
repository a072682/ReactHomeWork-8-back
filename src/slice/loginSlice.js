import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated: false,  // 是否登入
        user: null, 
        token: null,
        expired: null,
    },
    reducers: {
        login: (state, action) => {
          state.isAuthenticated = true;
          state.user = action.payload; // 儲存登入的使用者資訊
        },
        logout: (state) => {
          state.isAuthenticated = false;
          state.user = null;
        },
        tokenUpData:(state, {payload})=>{
          state.token = payload.token;
          state.expired = payload.expired;
        },
      },
  });

export const { login, logout, tokenUpData } = loginSlice.actions;

//登入 API 請求
//account 由jsx那邊提供
export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (account, { dispatch }) => {
        try {
            const handleLoginRef = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
            const { token, expired } = handleLoginRef.data;
            console.log("登入成功(Slice端)");
            console.log("token:",token,"expired:",expired);
            dispatch(login(account));
            dispatch(tokenUpData({token,expired}));
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            //document.cookie為設定瀏覽器中的
            axios.defaults.headers.common['Authorization'] = token;
            //設定 axios 的全域預設標頭之後發出的每一個請求自動帶上 Authorization 標頭
            console.log("已設置axios前置",token);
            return({token,expired})
        } catch (error) {
            console.log("登入失敗(Slice端)",error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

//確認登入 API 請求
export const checkLogin = createAsyncThunk(
    "login/checkLogin",
    async (_,{ dispatch }) => {
        try {
            const response = await axios.post(`${BASE_URL}/v2/api/user/check`);
            console.log("登入驗證成功(Slice端)",response.data);
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
            console.log("已提取cookie",token);
            axios.defaults.headers.common['Authorization'] = token;
            //設定 axios 的全域預設標頭之後發出的每一個請求自動帶上 Authorization 標頭
            console.log("已設置axios前置");
            dispatch(login());
            return(response.data);
        } catch (error) {
            console.log("登入驗證失敗(Slice端)",error.response.data);
            dispatch(logout());
            return(error.response.data);
        }
    }
);

//登出
export const logoutUser = createAsyncThunk(
    "login/logoutUser",
    async (_, { dispatch }) => {
        try {
            const handleLogoutRef = await axios.post(`${BASE_URL}/v2/logout`);
            console.log("登出成功(Slice端)");
            dispatch(logout());
            return("outCheck");
        } catch (error) {
            console.log("登出失敗(Slice端)");
        }
    }
);


export default loginSlice.reducer;