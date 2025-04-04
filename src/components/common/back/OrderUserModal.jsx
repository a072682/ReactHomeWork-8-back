import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function OrderUserModal ({setHandleOrderUserModal,handleOrderUserData,setHandleOrderUserData,handleChangeOrderData,orderIn}){
    //元件控制
            const orderUserModalRef = useRef(null);
            const [orderUserModal,setOrderUserModal] = useState(null);
            useEffect(()=>{
                if (orderUserModalRef.current) {
                    const instance = new Modal(orderUserModalRef.current,{
                        backdrop:false
                    });
                    setOrderUserModal(instance);

                    // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
                    if (setHandleOrderUserModal) {
                        setHandleOrderUserModal(
                                {
                                    show: () => instance.show(),
                                    hide: () => instance.hide(),
                                }
                            );
                    }
                }
            },[]);

            const btnByOrderUserModalOpen = ()=>{
                orderUserModal?.show();
            }
            const btnByOrderUserModalClose = ()=>{
                orderUserModal?.hide();
            }
    //元件控制

    const handleOrderUserDataInput = (event)=>{
        const { value,name } = event.target;
        setHandleOrderUserData({
            ...handleOrderUserData,
            [name]:value
        })
    }

    useEffect(()=>{
        console.log("user修改後",handleOrderUserData);
    },[handleOrderUserData]);


    return(
        <>
            <div ref={orderUserModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title fs-4">訂購人資訊</h5>
                        <button onClick={btnByOrderUserModalClose} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="row g-4">
                            <div className="col-md">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        訂購人姓名
                                    </label>
                                    <input
                                        value={handleOrderUserData?.name|| ""}
                                        onChange={handleOrderUserDataInput}
                                        name="name"
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="訂購人姓名"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tel" className="form-label">
                                        訂購人電話
                                    </label>
                                    <input
                                        value={handleOrderUserData?.tel|| ""}
                                        onChange={handleOrderUserDataInput}
                                        name="tel"
                                        id="tel"
                                        type="text"
                                        className="form-control"
                                        placeholder="訂購人電話"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        訂購人Email
                                    </label>
                                    <input
                                        value={handleOrderUserData?.email|| ""}
                                        onChange={handleOrderUserDataInput}
                                        name="email"
                                        id="email"
                                        type="text"
                                        className="form-control"
                                        placeholder="訂購人Email"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        訂購人收件地址
                                    </label>
                                    <input
                                        value={handleOrderUserData?.address|| ""}
                                        onChange={handleOrderUserDataInput}
                                        name="address"
                                        id="address"
                                        type="text"
                                        className="form-control"
                                        placeholder="訂購人收件地址"
                                    />
                                </div>                 
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer border-top bg-light">
                        <button onClick={btnByOrderUserModalClose} type="button" className="btn btn-secondary">
                        取消
                        </button>
                        <button  onClick={()=>{handleChangeOrderData()}} type="button" className="btn btn-dark">
                        修改訂單
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderUserModal;