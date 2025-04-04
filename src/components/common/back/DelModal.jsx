import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { Modal } from "bootstrap";
import { deleteBackProductSlice, getBackOriginalData } from "../../../slice/backProductsSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelModal({setHandleDelModal,handleDelModal,singleProductData,setSingleProductData}){

    const dispatch = useDispatch();

    const delModalRef = useRef(null);
    const [delModal,setDelModal] = useState(null);
    useEffect(()=>{
        if (delModalRef.current) {
            const instance = new Modal(delModalRef.current,{
                backdrop:false
            });
            setDelModal(instance);

            // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
            if (setHandleDelModal) {
                    setHandleDelModal(
                        {
                            show: () => instance.show(),
                            hide: () => instance.hide(),
                        }
                    );
            }
        }
    },[]);

     const btnByDelModalOpen = ()=>{
        delModal?.show();
    }
    const btnByDelModalClose = ()=>{
        delModal?.hide();
    }

    //刪除產品函式
    const handleDeleteProduct = async()=>{
        try{
        deleteProduct();
        dispatch(getBackOriginalData());
        btnByDelModalClose();
        }catch(error){
        
        }
    }
    //刪除產品函式

    //刪除產品api函式
    const deleteProduct = ()=>{
        dispatch(deleteBackProductSlice(singleProductData));
    }
    

    return(
        <>
            <div ref={delModalRef}
                className="modal fade"
                id="delProductModal"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">刪除產品</h1>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        你是否要刪除 
                        <span className="text-danger fw-bold">{singleProductData.title}</span>
                    </div>
                    <div className="modal-footer">
                        <button
                        onClick={btnByDelModalClose}
                        type="button"
                        className="btn btn-secondary"
                        >
                        取消
                        </button>
                        <button onClick={()=>{handleDeleteProduct(); console.log(singleProductData);}} type="button" className="btn btn-danger">
                        刪除
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DelModal;