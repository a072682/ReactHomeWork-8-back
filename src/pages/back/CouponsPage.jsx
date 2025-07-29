
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CouponsModal from "../../components/common/back/CouponsModal";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/common/Toast";
import { delBackCouponsItem, getBackCouponsData } from "../../slice/backProductsSlice";
import { checkLogin } from "../../slice/loginSlice";
import './_CouponsPage.scss';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


const couponsDefault = {
    is_enabled: false,
    percent: "",
    title:"",
    due_date:"",
    code:"",
};

function CouponsPage (){

    //抓取遠端資料前置
    const dispatch = useDispatch();

    //取得後端登入狀態資料
    const loginState = useSelector((state)=>{
        return(
        state.login.isAuthenticated
        )
    });

    useEffect(()=>{
        dispatch(checkLogin());
    },[])

    useEffect(()=>{
        if(loginState){
            console.log("登入狀態:",loginState);
        }
    },[loginState])

    //獲取遠端優惠券資料
    const originalCouponsData = useSelector((state)=>{
        return(
          state.backProducts.originalBackCouponsData
        )
    });

    //獲取遠端優惠券頁面資料
    const couponsPagination = useSelector((state)=>{
        return(
          state.backProducts.backCouponsPagination
        )
    });

    //訂單資料
        useEffect(()=>{
            dispatch(getBackCouponsData());
            console.log("初始優惠券資料:",originalCouponsData);
            console.log("初始優惠券頁面資料:",originalCouponsData);
        },[])
    //訂單資料


    const[handleCouponsModal,setHandleCouponsModal]=useState(null); 
    
    //判斷優惠券狀態(更新或建立)
    const[couponMode,setCouponMode]=useState(null);


    //刪除優惠券
    const delCouponsItem = (id)=>{
        dispatch(delBackCouponsItem(id));
    }
    //

    const[couponsIn,setCouponsIn]=useState(couponsDefault);

    useEffect(()=>{
        console.log("優惠券狀態:",couponMode);
        console.log("優惠券(目前)狀態:",couponsIn);
    },[couponMode,couponsIn])



    
    

    const getCouponsIn =(mode,item)=>{
        if(mode === "new"){
            setCouponsIn(couponsDefault);
            console.log("創立新優惠券");
            setCouponMode("new");
        }else{
            setCouponsIn(item);
            console.log("修改優惠券");
            setCouponMode("edit");
        }
    }

    

    // const createCouponsData =

    

    return(
        <>
            {/* <div className="container-fluid"> */}
                <div className="container">
                    <div className="mt-3">
                        <div className="d-flex align-items-center mb-12 gap-12">
                            <h3 className="m-0">優惠券頁面</h3>
                            {
                                loginState?
                                (
                                    <button onClick={()=>{handleCouponsModal?.show();getCouponsIn("new")}} type="button" className="btn btn-dark ms-3">新增優惠券</button>
                                )
                                :
                                (
                                    null
                                )
                            }
                            
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="coupons-table w-100">
                                    
                                    <div className="w-100 d-flex justify-content-between">
                                        <div scope="col" className="w-100 name border-0 text-center">
                                        名稱
                                        </div>
                                        <div scope="col" className="w-100 content border-0 text-center">
                                        內容
                                        </div>
                                        <div scope="col" className="w-100 time border-0 text-center">
                                        有效日期
                                        </div>
                                        <div scope="col" className="w-100 efficient border-0 text-center">
                                        效力
                                        </div>
                                        <div scope="col" className="w-100 edit border-0 text-center">
                                        編輯
                                        </div>
                                        <div scope="col" className="w-100 del border-0 text-center">
                                        刪除
                                        </div>
                                    </div>
                                    
                                    <div>
                                        {
                                            loginState ?
                                            (
                                                originalCouponsData?.map((item)=>{
                                                    return(
                                                        <div key={item.id} className="border-bottom border-top py-12 d-flex justify-content-center align-items-center">
                                                            <div
                                                            scope="row"
                                                            className="w-100 border-0 px-0 font-weight-normal py-4 text-center"
                                                            >
                                                                <p className="mb-0 ">{item.title}</p>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <p className="mb-0 ms-auto">優惠: {item.percent}%</p>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <p className="mb-0 fw-bold ms-3 d-inline-block">
                                                                    {new Date(item.due_date).toLocaleDateString("zh-TW")}
                                                                </p>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <p className="mb-0 ms-auto ">{item.is_enabled === 1?("有效"):("無效")}</p>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <button
                                                                    onClick={()=>{handleCouponsModal?.show();getCouponsIn("edit",item);}}
                                                                    className="btn btn-outline-dark border-0 p-0"
                                                                    type="button"
                                                                >
                                                                    查看細節
                                                                </button>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle px-0 text-center">
                                                                <button
                                                                    onClick={()=>{delCouponsItem(item.id);}}
                                                                    className="btn btn-outline-dark border-0 py-2"
                                                                    type="button"
                                                                >
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                null
                                            )
                                            
                                        }
                                    </div>
                                </div>
                                {
                                    loginState?
                                    (
                                        null
                                    )
                                    :
                                    (
                                        <div className="text-center py-24">
                                            <h2 className="m-0">請登入後台使用者帳號</h2>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <nav className="d-flex justify-content-center">
                            <ul className="pagination">
                                <li className={`page-item ${couponsPagination?.has_pre?(""):("disabled")} `}>
                                    <a onClick={(event)=>{event.preventDefault(); dispatch(getBackCouponsData(couponsPagination.current_page - 1));}} className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {
                                    Array.from({length: couponsPagination?.total_pages}).map((_,index)=>
                                    {
                                        return(
                                            <li key={index} className={`page-item ${couponsPagination?.current_page === index + 1 && "active"}`}>
                                                <a onClick={(event)=>{event.preventDefault(); dispatch(getBackCouponsData(index + 1));}} className="page-link" href="#">
                                                    {index + 1}
                                                </a>
                                            </li>)
                                    })
                                }
                                <li className={`page-item ${couponsPagination?.has_next?(""):("disabled")} `}>
                                    <a onClick={(event)=>{event.preventDefault(); dispatch(getBackCouponsData(couponsPagination.current_page + 1));;}} className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <Toast />
            {/* </div> */}
            <CouponsModal setHandleCouponsModal={setHandleCouponsModal} couponsIn={couponsIn} setCouponsIn={setCouponsIn} 
            couponsDefault={couponsDefault} couponMode={couponMode}/>
            
        </>
    )
}

export default CouponsPage;