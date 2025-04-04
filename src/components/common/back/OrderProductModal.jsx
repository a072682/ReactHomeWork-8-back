import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function OrderProductModal({setHandleOrderProductModal,orderIn_Products,setOrderIn_Products,handleChangeOrderData,orderIn}){


//元件控制
    const orderProductModalRef = useRef(null);
    const [orderProductModal,setOrderProductModal] = useState(null);
    useEffect(()=>{
        if (orderProductModalRef.current) {
            const instance = new Modal(orderProductModalRef.current,{
                backdrop:false
            });
            setOrderProductModal(instance);

            // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
            if (setHandleOrderProductModal) {
                setHandleOrderProductModal(
                        {
                            show: () => instance.show(),
                            hide: () => instance.hide(),
                        }
                    );
            }
        }
    },[]);

    const btnByOrderProductModalOpen = ()=>{
        orderProductModal?.show();
    }
    const btnByOrderProductModalClose = ()=>{
        orderProductModal?.hide();
    }
//元件控制

    //
    const handleQty = (id, newQty) => {
        setOrderIn_Products(prevState =>
            prevState.map(item =>item.id === id ? 
                    (
                        { ...item, 
                            qty: newQty, 
                            total: item.product.price * newQty,
                            final_total:item.product.price * newQty,
                        } // 更新 total
                    )
                    :(item)
            )
        );
    };

    


    return(
        <>
            <div ref={orderProductModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title fs-4">訂單訂購商品資訊</h5>
                        <button onClick={btnByOrderProductModalClose} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-2">
                        <table className="table text-center align-middle">
                            <tbody>
                                {
                                    orderIn_Products?.map((item, index)=>{
                                        return(
                                            <tr key={item.id}  className="border-bottom border-top">
                                                <th
                                                    scope="row"
                                                    className="border-0 px-3 font-weight-normal py-4 w-25"
                                                >
                                                    <div className="d-flex justify-content-start align-items-center">
                                                        <img
                                                            src={item.product?.imageUrl}
                                                            alt=""
                                                            style={{
                                                                width: "72px",
                                                                height: "72px",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                        <p className="mb-0 fw-bold ms-3">aa</p>
                                                    </div>
                                                </th>
                                                <td className="border-0 align-middle w-25">
                                                    <div className="input-group d-flex justify-content-center">
                                                        <button onClick={() => handleQty(item.id, Math.max(1, item.qty - 1))}
                                                        className="btn btn-outline-dark border-0 py-2">
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="form-control border-0 text-center my-auto shadow-none"
                                                            style={{ maxWidth: "50px" }}
                                                            value={item.qty}
                                                            readOnly
                                                        />
                                                        <button onClick={() => handleQty(item.id, item.qty + 1)}
                                                        className="btn btn-outline-dark border-0 py-2">
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="border-0 align-middle w-25">
                                                    <p className="mb-0">NT${item.total}</p>
                                                </td>
                                                <td className="border-0 align-middle w-25">
                                                    <button className="btn btn-outline-dark border-0 py-2">
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

                    <div className="modal-footer border-top bg-light">
                        <button onClick={btnByOrderProductModalClose} type="button" className="btn btn-secondary">
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
export default OrderProductModal;