import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pushMessage } from "./toastSlice";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const backProductsSlice = createSlice({
    name: "backProducts",
    initialState: {
        backProductsAllData:[],// 儲存所有產品資訊
        backProductData:[],
        backPagination:{},
        backSingleProductData:{},
        IsLoading:false,
        BackImgFile:"",

        backOrderData:null,

        originalBackArticlesData:[],
        backArticlesPagination:{},

        originalBackCouponsData:[],//優惠券
        backCouponsPagination:{},//優惠券頁面

    },
    reducers: {
        getBackProductAllData: (state, action) => {
            state.backProductsAllData = action.payload; // 儲存所有產品資訊
          },
        getBackProductData: (state, action) => {
            state.backProductData = action.payload; // 儲存前端產品(限制)資訊
        },
        getBackPagination: (state, action) => {
            state.backPagination = action.payload; // 儲存前端產品(限制)頁面資訊
        },
        getBackSingleProductData: (state, action) => {
            state.backSingleProductData = action.payload; // 儲存前端產品單一資訊
        },
        IsLoadingDataUp: (state, action) => {
            state.IsLoading = action.payload; // 儲存前端產品單一資訊
        },
        getBackImgFile: (state, action) => {
            state.BackImgFile = action.payload; // 儲存前端產品單一資訊
        },


        setBackOrderData: (state, action) => {
            state.backOrderData = action.payload; // 獲取訂單
        },


        getOriginalBackArticlesData: (state, action) => {
            state.originalBackArticlesData = action.payload; // 獲取文章資料
        },
        getBackArticlesPagination: (state, action) => {
            state.backArticlesPagination = action.payload; // 獲取文章頁面資料
        },
        

        getOriginalBackCouponsData: (state, action) => {
            state.originalBackCouponsData = action.payload; // 獲取優惠券資料
        },
        getBackCouponsPagination: (state, action) => {
            state.backCouponsPagination = action.payload; // 獲取優惠券頁面資料
        },

    }
})

export const {getBackProductAllData,getBackProductData,getBackPagination,getBackSingleProductData,IsLoadingDataUp,getBackImgFile,setBackOrderData,getOriginalBackArticlesData,getBackArticlesPagination,getOriginalBackCouponsData,getBackCouponsPagination} = backProductsSlice.actions;

//後端

//取得全部後端產品資料

    export const getBackOriginalAllData = createAsyncThunk(
        "backProducts/getBackOriginalAllData",
        async (_,{ dispatch }) => {
            try {
                const getBackOriginalAllDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/products/all`);
                console.log("取得所有後端產品資料成功(Slice端)",Object.values(getBackOriginalAllDataRef.data.products));
                dispatch(getBackProductAllData(Object.values(getBackOriginalAllDataRef.data.products)));
            } catch (error) {
                console.log("取得所有後端產品資料失敗(Slice端)",error.response.data);
                return(error.response.data);
            }
        }
    );
//取得全部後端產品資料

//取得限制條件的後端產品資料
    export const getBackOriginalData = createAsyncThunk(
        "backProducts/getBackOriginalData",
        async ({ page = 1, category = "" },{ dispatch }) => {
            try {
                console.log("category:",category);
                const getBackOriginalDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?page=${page}&category=${category}`);
                console.log("取得後端產品資料成功(Slice端)", getBackOriginalDataRef.data.products);
                console.log("後端產品資訊Slice端:", getBackOriginalDataRef.data.products);
                dispatch(getBackProductData(getBackOriginalDataRef.data.products));
                console.log("後端頁面資訊Slice端", getBackOriginalDataRef.data.pagination);
                dispatch(getBackPagination(getBackOriginalDataRef.data.pagination));
            } catch (error) {
                console.log("取得後端產品資料失敗(Slice端)",error.response.data);
                return(error.response.data);
            }
        }
    );
//取得限制條件的後端產品資料


//取得後端單一產品資料
    export const getBackSingleOriginaProductData = createAsyncThunk(
        "backProducts/getBackSingleOriginaProductData",
        async (product_id,{ dispatch }) => {
            try {
            const getBackSingleOriginaProductDataRes = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`);
            console.log("取得後端單一產品資料成功",getBackSingleOriginaProductDataRes.data.product);
            dispatch(getFrontSingleProductData(getBackSingleOriginaProductDataRes.data.product));
            } catch (error) {
            console.log("取得後端單一產品失敗",error);
            }
        }
    );    
//取得單一產品資料

//新增產品
    export const createBackProductsSlice = createAsyncThunk(
        "backProducts/createBackProductsSlice",
        async(singleProductData,{ dispatch })=>{
            try{
            const createBackProductsSliceRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/product`,{
                data:{
                    ...singleProductData,
                    origin_price:Number(singleProductData.origin_price),
                    price:Number(singleProductData.price),
                    is_enabled: singleProductData.is_enabled ? (1) : (0)
                }
                })
            console.log("新增產品資訊成功",createBackProductsSliceRef.data);
            dispatch(getBackOriginalAllData());
            dispatch(getBackOriginalData({ page:1, category:"" }));
            dispatch(pushMessage({
                                    text: "新增產品完成",
                                    status: "success",
                                }))
            }catch(error){
            console.log("新增產品資訊失敗",error);
            dispatch(pushMessage({
                                    text: "新增產品失敗",
                                    status: "failed",
                                }))
            }
        }
    )


//編輯產品
export const editBackProductSlice = createAsyncThunk(
    "backProducts/editBackProductSlice",
    async(singleProductData,{ dispatch })=>{
        try{
        const editBackProductSliceRef = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${singleProductData.id}`,
            {
            data:{
                ...singleProductData,
                origin_price:Number(singleProductData.origin_price),
                price:Number(singleProductData.price),
                is_enabled: singleProductData.is_enabled ? (1):(0)
            }
            });
        console.log("更新產品資訊成功",editBackProductSliceRef.data);
        dispatch(getBackOriginalAllData());
        dispatch(getBackOriginalData({ page:1, category:"" }));
        dispatch(pushMessage({
            text: "編輯產品完成",
            status: "success",
        }))
        }catch(error){
        console.log("更新產品資訊失敗",error);
        dispatch(pushMessage({
            text: "編輯產品失敗",
            status: "failed",
        }))
        }
    }
)



//刪除產品api函式
    export const deleteBackProductSlice = createAsyncThunk(
        "backProducts/deleteBackProductSlice",
        async(singleProductData,{ dispatch })=>{
            try{
            const deleteBackProductSliceRef = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${singleProductData.id}`);
            console.log("刪除產品成功",deleteBackProductSliceRef.data);
            dispatch(getBackOriginalAllData());
            dispatch(getBackOriginalData({ page:1, category:"" }));
            dispatch(pushMessage({
                text: "刪除產品成功",
                status: "success",
            }))
            }catch(error){
            console.log("刪除產品失敗",error);
            dispatch(pushMessage({
                text: "刪除產品失敗",
                status: "failed",
            }))
            }
        }
    )


//圖片函示
    export const handleBackFileSlice = createAsyncThunk(
        "backProducts/handleBackFileSlice",
        async(formDate,{ dispatch })=>{
            try{
            const handleBackFileSliceRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/upload`,formDate);
            console.log("上傳圖片成功",handleBackFileSliceRef.data);
            dispatch(getBackImgFile(handleBackFileSliceRef.data.imageUrl));
            }catch(error){
            console.log("上傳圖片失敗",error.data);
            }
        }
    )

//獲取訂單
    export const getBackOrderDataSlice = createAsyncThunk(
        "backProducts/getBackOrderDataSlice",
        async(_,{ dispatch })=>{
            try{
                const getBackOrderDataSliceRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/orders`);
                console.log("訂單資料獲取成功",getBackOrderDataSliceRef.data.orders);
                dispatch(setBackOrderData(getBackOrderDataSliceRef.data.orders));
                dispatch(pushMessage({
                    text: "獲取訂單成功",
                    status: "success",
                }))
            }catch(error){
                console.log("訂單資料獲取失敗",error)
                dispatch(pushMessage({
                    text: "獲取訂單失敗",
                    status: "failed",
                }))
            }
        }
    )
    

//修改訂單
    export const changeBackOrderData = createAsyncThunk(
        "backProducts/changeBackOrderData",
        async(newData,{ dispatch })=>{
            try{
                console.log("即將發送的訂單資料:", newData);
                const changeBackOrderDataRef = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${newData.id}`,{
                    data:{
                        ...newData,
                    }
                });
                console.log("訂單資料修改成功",changeBackOrderDataRef);
                dispatch(pushMessage({
                    text: "修改訂單成功",
                    status: "success",
                }))
                dispatch(getBackOrderDataSlice());
            }catch(error){
                console.log("訂單資料修改失敗",error.response.data.message);
                dispatch(pushMessage({
                    text: "修改訂單失敗",
                    status: "failed",
                }))
            }
        }
    )

//刪除訂單資料
    export const delBackOrderData = createAsyncThunk(
        "backProducts/delBackOrderData",
        async(item,{ dispatch })=>{
            try{
                console.log(item.id);
                const delBackOrderDataRef = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${item.id}`);
                console.log("訂單資料刪除成功",delBackOrderDataRef);
                dispatch(pushMessage({
                    text: "刪除訂單成功",
                    status: "success",
                }))
                dispatch(getBackOrderDataSlice());
            }catch(error){
                console.log("訂單資料修改失敗",error.response.data.message)
                dispatch(pushMessage({
                    text: "刪除訂單失敗",
                    status: "failed",
                }))
            }
        }
    );


//獲取文章
    export const getBackArticlesData = createAsyncThunk(
        "backProducts/getBackArticlesData",
        async(page = 1,{ dispatch })=>{
            try{
                const getBackArticlesDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/articles?page=${page}`);
                console.log("取得文章資料成功",getBackArticlesDataRef.data.articles);
                dispatch(getOriginalBackArticlesData(getBackArticlesDataRef.data.articles));
                console.log("取得文章頁面資料",getBackArticlesDataRef.data.pagination);
                dispatch(getBackArticlesPagination(getBackArticlesDataRef.data.pagination));
                
            }catch(error){
                console.log("取得文章資料失敗",error);
            }
        }
    );

//新增文章api函式
    export const postBackArticle = createAsyncThunk(
        "backProducts/postBackArticle",
        async(articleIn,{ dispatch })=>{
            try{
                const postBackArticleRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/article`,{
                    data:{
                        ...articleIn
                    }
                })
                console.log("新增文章成功",postBackArticleRef.data);
                dispatch(getBackArticlesData());
                dispatch(pushMessage({
                    text: "新增文章成功",
                    status: "success",
                }))
            }catch(error){
                console.log("新增文章失敗",error.data);
                dispatch(getBackArticlesData());
                dispatch(pushMessage({
                    text: "新增文章失敗",
                    status: "failed",
                }))
            }
        }
    )
    


//編輯文章api函式
    export const putBackArticle = createAsyncThunk(
        "backProducts/putBackArticle",
        async(articleIn,{ dispatch })=>{
            try{
                const putBackArticleRef = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/article/${articleIn.id}`,
                    {
                    data:{
                        ...articleIn
                    }
                    });
                console.log("更新文章成功",putBackArticleRef.data);
                dispatch(getBackArticlesData());
                dispatch(pushMessage({
                    text: "更新文章成功",
                    status: "success",
                }));
            }catch(error){
                console.log("更新文章失敗",error.response.data.message);
                dispatch(getBackArticlesData());
                dispatch(pushMessage({
                    text: "更新文章失敗",
                    status: "failed",
                }))
            }
        }
    )


//刪除文章api函式
    export const deleteBackArticle = createAsyncThunk(
        "backProducts/deleteBackArticle",
        async(id,{ dispatch })=>{
            try{
                const deleteBackArticleRef = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/article/${id}`);
                console.log("刪除文章成功",deleteBackArticleRef.data);
                dispatch(getBackArticlesData());
                        dispatch(pushMessage({
                            text: "刪除文章成功",
                            status: "success",
                        }));
            }catch(error){
                console.log("刪除文章失敗",error);
                dispatch(getBackArticlesData());
                dispatch(pushMessage({
                    text: "刪除文章失敗",
                    status: "failed",
                }))
            }
        }
    )



//取得優惠券
    export const getBackCouponsData = createAsyncThunk(
        "backProducts/getBackCouponsData",
        async(page = 1,{ dispatch })=>{
            try{
                const getBackCouponsDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${page}`);
                console.log("取得優惠券資料成功",getBackCouponsDataRef.data.coupons);
                dispatch(getOriginalBackCouponsData(getBackCouponsDataRef.data.coupons));
                console.log("取得優惠券頁面資料",getBackCouponsDataRef.data.pagination);
                dispatch(getBackCouponsPagination(getBackCouponsDataRef.data.pagination));
            }catch(error){
                console.log("取得優惠券資料失敗",error);
            }
        }
    );


//新增優惠券
    export const addBackCouponsItem = createAsyncThunk(
        "backProducts/addBackCouponsItem",
        async(couponsIn,{ dispatch })=>{
            try{
                const addCouponsItemRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`,{
                    data:{
                        ...couponsIn,
                        is_enabled: couponsIn.is_enabled ? (1) : (0)
                    }
                });
                console.log("優惠券新增成功",addCouponsItemRef);
                dispatch(getBackCouponsData());
                dispatch(pushMessage({
                    text: "新增優惠券成功",
                    status: "success",
                }));
            }catch(error){
                console.log("優惠券新增失敗:",error.response.data.message);
                dispatch(getBackCouponsData());
                dispatch(pushMessage({
                    text: "新增優惠券失敗",
                    status: "failed",
                }));
            }
        }
    );
//


//修改優惠券
    export const putBackCouponsItem = createAsyncThunk(
        "backProducts/putBackCouponsItem",
        async(couponsIn,{ dispatch })=>{
            try{
                const putBackCouponsItemRef = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${couponsIn.id}`,{
                    data:{
                        ...couponsIn,
                        is_enabled: couponsIn.is_enabled ? (1) : (0)
                    }
                });
                console.log("優惠券修改成功",putBackCouponsItemRef);
                dispatch(getBackCouponsData());
                dispatch(pushMessage({
                    text: "優惠券修改成功",
                    status: "success",
                }));
            }catch(error){
                console.log("優惠券新增失敗:",error.response.data.message);
                dispatch(getBackCouponsData());
                dispatch(pushMessage({
                    text: "優惠券修改失敗",
                    status: "failed",
                }));
            }
        }
    );

   


//刪除優惠券
    export const delBackCouponsItem = createAsyncThunk(
        "backProducts/delBackCouponsItem",
        async(id,{ dispatch })=>{
            try{
                const delBackCouponsItemRef = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`);
                console.log("優惠券刪除成功",delBackCouponsItemRef);
                dispatch(getBackCouponsData());
                dispatch(pushMessage({
                    text: "優惠券刪除成功",
                    status: "success",
                }));
            }catch(error){
                console.log("優惠券刪除失敗:",error.response.data.message);
                dispatch(getBackCouponsData());
                dispatch(pushMessage({
                    text: "優惠券刪除失敗",
                    status: "failed",
                }));
            }
        }
    );
//後端

export default backProductsSlice.reducer;