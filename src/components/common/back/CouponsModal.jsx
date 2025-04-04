import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addBackCouponsItem, putBackCouponsItem } from "../../../slice/backProductsSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CouponsModal ({setHandleCouponsModal,couponsIn,setCouponsIn,couponsDefault,couponMode}){


    //抓取遠端資料前置
    const dispatch = useDispatch();

    //元件控制
            const couponsModalRef = useRef(null);
            const [couponsModal,setCouponsModal] = useState(null);
            useEffect(()=>{
                if (couponsModalRef.current) {
                    const instance = new Modal(couponsModalRef.current,{
                        backdrop:false
                    });
                    setCouponsModal(instance);

                    // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
                    if (setHandleCouponsModal) {
                        setHandleCouponsModal(
                                {
                                    show: () => instance.show(),
                                    hide: () => instance.hide(),
                                }
                            );
                    }
                }
            },[]);

            const btnByCouponsModalModalOpen = ()=>{
                couponsModal?.show();
            }
            const btnByCouponsModalClose = ()=>{
                couponsModal?.hide();
            }
    //元件控制

    //
    const handleCouponsModalInput = (event) => {
        const { value, name, type, checked } = event.target;
    
        let newValue = value;
    
        // 檢查是否為日期輸入框
        if (name === "due_date") {
            newValue = new Date(value).getTime(); // 轉換 YYYY-MM-DD → Unix Timestamp
            console.log("選擇的日期:", value);
            console.log("轉換後的 Timestamp:", newValue);
        }else if(name === "percent") {
            let numValue = parseInt(value, 10); // 轉換為整數
            if (isNaN(numValue)) numValue = ""; // 若輸入非數字則清空
            else if (numValue < 0) numValue = 0; // 若小於 0，自動設為 0
            else if (numValue > 100) numValue = 100; // 若大於 100，自動設為 100
            newValue = numValue;
        }
    // 限制 `percent` 只能輸入 0~100
    
        setCouponsIn({
            ...couponsIn,
            [name]: type === "checkbox" ? checked : newValue
        });
    };
    //

    //新增優惠券
    const addCouponsItem = ()=>{
        dispatch(addBackCouponsItem(couponsIn));
        setCouponsIn(couponsDefault);
        btnByCouponsModalClose();
    }
    //
    

    //修改優惠券
    const putCouponsItem = ()=>{
        dispatch(putBackCouponsItem(couponsIn));
        btnByCouponsModalClose();
    }
    //

    

    //
    const handleCouponsItem = ()=>{
        if(couponMode === "new"){
            addCouponsItem();
        }else if(couponMode === "edit"){
            putCouponsItem();
        }
    }

    useEffect(()=>{
        console.log("couponsIn修改後",couponsIn);
    },[couponsIn]);





    return(
        <>
            <div ref={couponsModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title fs-4">訂購人資訊</h5>
                        <button onClick={btnByCouponsModalClose} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="row g-4">
                            <div className="col-md">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        優惠券名稱
                                    </label>
                                    <input
                                        value={couponsIn?.title}
                                        onChange={handleCouponsModalInput}
                                        name="title"
                                        id="title"
                                        type="text"
                                        className="form-control"
                                        placeholder="優惠券名稱"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">
                                        優惠比例
                                    </label>
                                    <input
                                        value={couponsIn?.percent|| ""}
                                        onChange={handleCouponsModalInput}
                                        name="percent"
                                        id="percent"
                                        type="number"
                                        className="form-control"
                                        placeholder="優惠比例"
                                        min="0" // ✅ 限制最小值為 0
                                        max="100" // ✅ 限制最大值為 100
                                        onKeyDown={(e) => {
                                            if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                                                e.preventDefault(); // ✅ 禁止輸入 "e"、"+"、"-"（避免非數字輸入）
                                            }
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">
                                        優惠到期時間
                                    </label>
                                    <input
                                        value={couponsIn.due_date 
                                            ? new Date(couponsIn.due_date).toISOString().split("T")[0] 
                                            : ""}
                                        // toISOString().split("T")[0]：只取 YYYY-MM-DD 格式，確保 input[type="date"] 可讀取。
                                        onChange={handleCouponsModalInput}
                                        name="due_date"
                                        id="due_date"
                                        type="date"
                                        className="form-control"
                                        placeholder="優惠到期時間"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">
                                        優惠券編號
                                    </label>
                                    <input
                                        value={couponsIn?.code|| ""}
                                        onChange={handleCouponsModalInput}
                                        name="code"
                                        id="code"
                                        type="text"
                                        className="form-control"
                                        placeholder="優惠券編號"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        checked={couponsIn?.is_enabled}
                                        onChange={handleCouponsModalInput}
                                        name="is_enabled"
                                        type="checkbox"
                                        className="form-check-input"
                                        id="isEnabled"
                                    />
                                    <label htmlFor="isEnabled" className="form-check-label">
                                        優惠券有效
                                    </label>
                                </div>             
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer border-top bg-light">
                        <button onClick={btnByCouponsModalClose} type="button" className="btn btn-secondary">
                        取消
                        </button>
                        <button onClick={()=>{handleCouponsItem()}} type="button" className="btn btn-dark">
                        {
                            couponMode === "new"?("新增優惠券"):("修改優惠券內容")
                        }
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CouponsModal;