
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CouponsModal from "../../components/common/back/CouponsModal";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/common/Toast";
import { delBackCouponsItem, getBackCouponsData } from "../../slice/backProductsSlice";


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
            <div className="container-fluid">
                <div className="container">
                    <div className="mt-3">
                        <div className="d-flex align-items-center">
                            <h3 className="m-0">優惠券頁面</h3>
                            <button onClick={()=>{handleCouponsModal?.show();getCouponsIn("new")}} type="button" className="btn btn-dark ms-3">新增優惠券</button>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border-0">
                                            優惠券名稱
                                            </th>
                                            <th scope="col" className="border-0 ps-0">
                                            優惠內容
                                            </th>
                                            <th scope="col" className="border-0">
                                            優惠券有效日期
                                            </th>
                                            <th scope="col" className="border-0">
                                            優惠券效力
                                            </th>
                                            <th scope="col" className="border-0">
                                            編輯優惠券
                                            </th>
                                            <th scope="col" className="border-0">
                                            刪除優惠券
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            originalCouponsData?.map((item)=>{
                                                return(
                                                    <tr key={item.id} className="border-bottom border-top">
                                                        <th
                                                        scope="row"
                                                        className="border-0 px-0 font-weight-normal py-4"
                                                        >
                                                            <p className="mb-0 ms-auto">{item.title}</p>
                                                        </th>
                                                        <td className="border-0 align-middle">
                                                            <p className="mb-0 ms-auto">優惠:{item.percent}%</p>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <p className="mb-0 fw-bold ms-3 d-inline-block">
                                                                {new Date(item.due_date).toLocaleDateString("zh-TW")}
                                                            </p>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <p className="mb-0 ms-auto">{item.is_enabled === 1?("有效"):("無效")}</p>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <button
                                                                onClick={()=>{handleCouponsModal?.show();getCouponsIn("edit",item);}}
                                                                className="btn btn-outline-dark border-0"
                                                                type="button"
                                                            >
                                                                查看優惠券細節
                                                            </button>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <button
                                                                onClick={()=>{delCouponsItem(item.id);}}
                                                                className="btn btn-outline-dark border-0 py-2"
                                                                type="button"
                                                            >
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
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
            </div>
            <CouponsModal setHandleCouponsModal={setHandleCouponsModal} couponsIn={couponsIn} setCouponsIn={setCouponsIn} 
            couponsDefault={couponsDefault} couponMode={couponMode}/>
            
        </>
    )
}

export default CouponsPage;