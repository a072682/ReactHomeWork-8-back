import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pushMessage } from "./toastSlice";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        productsAllData:[],
        frontProductData:[],
        frontPagination:{},
        frontSingleProductData:{},
        productsData:[],
        pagination:{},
        IsScreenLoading:false,
        CartData:{},
        SelectedPaymentData:"",
        CouponsData:[],
        CouponsSuccess:false,
        CouponsMessage:"",
        CheckOutState:false,

    },
    reducers: {
        getProductAllData: (state, action) => {
            state.productsAllData = action.payload; // 儲存所有產品資訊
          },
        getFrontProductData: (state, action) => {
            state.frontProductData = action.payload; // 儲存前端產品(限制)資訊
        },
        getFrontPagination: (state, action) => {
            state.frontPagination = action.payload; // 儲存前端產品(限制)頁面資訊
        },
        getFrontSingleProductData: (state, action) => {
            state.frontSingleProductData = action.payload; // 儲存前端產品單一資訊
        },
        isScreenLoadingDataUp: (state, action) => {
            state.IsScreenLoading = action.payload; // 等待判斷狀態
        },
        getCartData: (state, action) => {
            state.CartData = action.payload; 
        },
        getSelectedPaymentData: (state, action) => {
            state.SelectedPaymentData = action.payload; 
        },
        getCouponsData: (state, action) => {
            state.CouponsData = action.payload; 
        },
        getCouponsMessage: (state, action) => {
            state.CouponsMessage = action.payload;
        },
        couponsSuccessDataUp: (state, action) => {
            state.CouponsSuccess = action.payload; 
        },
        checkOutStateDataUp: (state, action) => {
            state.CheckOutState = action.payload; 
        },
    }
})

export const {getProductAllData,getFrontProductData,getFrontPagination,getFrontSingleProductData,isScreenLoadingDataUp
                ,getCartData,getCouponsData,couponsSuccessDataUp,getCouponsMessage,checkOutStateDataUp,getSelectedPaymentData} = productsSlice.actions;

//前端
//取得全部前端產品資料
    export const getOriginalAllData = createAsyncThunk(
        "products/getOriginalAllData",
        async (_,{ dispatch }) => {
            try {
                const getOriginalAllDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products/all`);
                console.log("取得所有原始產品資料成功(Slice端)",getOriginalAllDataRef.data.products);
                dispatch(getProductAllData(getOriginalAllDataRef.data.products));
            } catch (error) {
                console.log("取得所有原始產品資料失敗(Slice端)",error.response.data);
                return(error.response.data);
            }
        }
    );
//取得全部前端產品資料

//取得限制條件的前端產品資料
    export const getFrontOriginalData = createAsyncThunk(
        "products/getFrontOriginalData",
        async ({ page = 1, category = "" },{ dispatch }) => {
            dispatch(isScreenLoadingDataUp(true));
            try {
                const getFrontOriginalDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?page=${page}&category=${category}`);
                console.log("取得前端產品資料成功(Slice端)", getFrontOriginalDataRef.data.products);
                console.log("前端產品資訊Slice端:", getFrontOriginalDataRef.data.products);
                dispatch(getFrontProductData(getFrontOriginalDataRef.data.products));
                console.log("前端頁面資訊Slice端", getFrontOriginalDataRef.data.pagination);
                dispatch(getFrontPagination(getFrontOriginalDataRef.data.pagination));
            } catch (error) {
                console.log("取得前端產品資料失敗(Slice端)",error.response.data);
                return(error.response.data);
            }finally{
                dispatch(isScreenLoadingDataUp(false));
            }
        }
    );
//取得限制條件的前端產品資料


//取得單一產品資料
    export const getSingleProductData = createAsyncThunk(
        "products/getSingleProductData",
        async (product_id,{ dispatch }) => {
            dispatch(isScreenLoadingDataUp(true));
            try {
            const getSingleProductDataRes = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`);
            console.log("取得單一產品資料成功",getSingleProductDataRes.data.product);
            dispatch(getFrontSingleProductData(getSingleProductDataRes.data.product));
            } catch (error) {
            console.log("取得產品失敗",error);
            }finally{
                dispatch(isScreenLoadingDataUp(false));
            }
        }
    );


//取得購物車資訊
    export const getCartSlice = createAsyncThunk(
        "products/getCartSlice",
        async(_,{ dispatch })=>{
            try{
            const getCartSliceRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
            console.log("取得購物車成功",getCartSliceRef.data.data);
            if(getCartSliceRef.data.data.total > getCartSliceRef.data.data.final_total){
                dispatch(couponsSuccessDataUp(true));
            }else if(getCartSliceRef.data.data.total === getCartSliceRef.data.data.final_total){
                dispatch(couponsSuccessDataUp(false));
            }
            dispatch(getCartData(getCartSliceRef.data.data));
            }
            catch(error){
            console.log("取得購物車失敗",error);
            }
        } 
    )
    

//加入購物車
    export const addCartItemSlice = createAsyncThunk(
        "products/addCartItemSlice",
        async({product_id,qty},{ dispatch })=>{
            dispatch(isScreenLoadingDataUp(true));
            try{
            const addCartItemSliceRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`,{
                data:{
                product_id,
                qty: Number(qty)
                }
            });
            console.log("加入購物車成功",addCartItemSliceRef.data);
            dispatch(getCartSlice());
            }catch(error){
            console.log("加入購物車失敗",error.response.data.message);
            }finally{
                dispatch(isScreenLoadingDataUp(false));
            }
        }
    )

//更新購物車
    export const updateCartItemSlice = createAsyncThunk(
        "products/updateCartItemSlice",
        async({cartItem_id,product_id,qty},{ dispatch })=>{
            dispatch(isScreenLoadingDataUp(true));
            try{
                const updateCartItemSliceRef = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`,{
                data:{
                    product_id,
                    qty:Number(qty)
                }
                });
                console.log("更新產品資訊成功",updateCartItemSliceRef.data);
                dispatch(getCartSlice());
            }catch(error){
                console.log("更新產品資訊失敗",error)
            }finally{
                dispatch(isScreenLoadingDataUp(false));
            }
        }
    )
    




//購物車產品刪除
    export const removeCartItemSlice = createAsyncThunk(
        "products/removeCartItemSlice",
        async(cartItem_id,{ dispatch })=>{
            dispatch(isScreenLoadingDataUp(true));
            try{
              const removeCartItemSliceRef = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);
              console.log("刪除產品成功",removeCartItemSliceRef.data);
              dispatch(getCartSlice());
            }catch(error){
              console.log("刪除產品失敗",error)
            }finally{
              dispatch(isScreenLoadingDataUp(false));
            }
          }
    )
    
    

//購物車產品清空
    export const removeCartSlice = createAsyncThunk(
        "products/removeCartSlice",
        async(_,{ dispatch })=>{
            dispatch(isScreenLoadingDataUp(true));
            try{
              const removeCartSliceRef = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
              console.log("清空購物車成功",removeCartSliceRef.data);
              dispatch(getCartSlice());
            }catch(error){
              console.log("清空購物車失敗",error)
            }finally{
                dispatch(isScreenLoadingDataUp(false));
            }
          }
    )


//取得優惠券

    export const getCouponsSlice = createAsyncThunk(
        "products/getCouponsSlice",
        async(_,{ dispatch })=>{
            try{
            const getCouponsSliceRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/coupons`);
            console.log("取得優惠券成功",getCouponsSliceRef.data.coupons);
            dispatch(getCouponsData(getCouponsSliceRef.data.coupons));
            }
            catch(error){
            console.log("取得購物車失敗",error);
            }
        } 
    )

//使用優惠券
    export const useCouponsSlice = createAsyncThunk(
        "products/useCouponsSlice",
        async(key,{ dispatch })=>{
            try{
            const getCouponsSliceRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/coupon`,{
                data:{
                    code:key
                }
            });
            console.log("使用優惠券成功",getCouponsSliceRef.data);
            dispatch(getCouponsMessage(getCouponsSliceRef.data.message))
            dispatch(getCartSlice());
            dispatch(couponsSuccessDataUp(true));
            }
            catch(error){
            console.log("使用優惠券失敗",error);
            dispatch(getCartSlice());
            dispatch(couponsSuccessDataUp(false));
            }
        } 
    )


//結帳
    export const checkOutSlice = createAsyncThunk(
        "products/checkOutSlice",
        async(data,{ dispatch })=>{
            try{
                console.log("結帳資訊",data);
                const checkOutSliceRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`,data);
                console.log("結帳成功",checkOutSliceRef.data);
                dispatch(checkOutStateDataUp(true));
            }catch(error){
              console.log("結帳失敗",error.response.data.message);
              dispatch(checkOutStateDataUp(false));
            }
          }
    )
    
    

//前端
    
//取得單一產品資料

export default productsSlice.reducer;