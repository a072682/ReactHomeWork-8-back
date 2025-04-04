import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import productsReducer from "./slice/productsSlice";
import backProductsReducer from "./slice/backProductsSlice";
import toastReducer from "./slice/toastSlice";

export const store = configureStore({
    reducer: { // 必要加入 reducer
        login: loginReducer,
        products:productsReducer,
        backProducts:backProductsReducer,
        toast:toastReducer,
    },
  });

export default configureStore;