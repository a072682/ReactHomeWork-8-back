import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import axios from "axios";
import { createBackProductsSlice, editBackProductSlice, getBackOriginalData, handleBackFileSlice } from "../../../slice/backProductsSlice";
import { pushMessage } from "../../../slice/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function ProductsModal ({setHandleProductsModal,singleProductData,setSingleProductData,modeState,setModeState}){

    //獲取遠端資料前置
    const dispatch = useDispatch();


    //元件控制
        const productsModalRef = useRef(null);
        const [productsModal,setProductsModal] = useState(null);
        useEffect(()=>{
            if (productsModalRef.current) {
                const instance = new Modal(productsModalRef.current,{
                    backdrop:false
                });
                setProductsModal(instance);

                // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
                if (setHandleProductsModal) {
                        setHandleProductsModal(
                            {
                                show: () => instance.show(),
                                hide: () => instance.hide(),
                            }
                        );
                }
            }
        },[]);

        const btnByProductsModalOpen = ()=>{
            productsModal?.show();
        }
        const btnByProductsModalClose = ()=>{
            productsModal?.hide();
        }
    //元件控制
    const handleProductsModalInputChange = (event)=>{
        const { name, value, type, checked } = event.target;
        setSingleProductData({
            ...singleProductData,
            [name]:type === "checkbox" ? (checked) : (value)
        })
    }

    const imgItemAdd = ()=>{
        const newImg = [...singleProductData.imagesUrl,""];
        setSingleProductData({
            ...singleProductData,
            imagesUrl:newImg
        })
    }
    const imgItemRemove =()=>{
        const newImg = [...singleProductData.imagesUrl];
        newImg.pop();
        setSingleProductData({
            ...singleProductData,
            imagesUrl:newImg
        })
    }

    const handleImageChange=(event,index)=>{
        const {value} = event.target;
        const newImages = [...singleProductData.imagesUrl];
        newImages[index] = value;
        setSingleProductData({
            ...singleProductData,
            imagesUrl:newImages
        })

    }

    

    //新增產品函式
    const handleCreateProduct = async()=>{
        const apiCall = modeState === "newProduct" ? (createProduct):(editProduct)
        try{
        apiCall();
        dispatch(getBackOriginalData());
        btnByProductsModalClose();
        }catch(error){

        }
    }
    //新增產品函式

    //新增產品api函式
    const createProduct = ()=>{
        dispatch(createBackProductsSlice(singleProductData));
    }
    //新增產品api函式

    //編輯產品api函式
    const editProduct = ()=>{
        dispatch(editBackProductSlice(singleProductData));
    }
    //編輯產品api函式

    //取得遠端圖片資訊
    const backImgFileData = useSelector((state)=>{
        return(
            state.backProducts.BackImgFile
        )
    });

    //圖片函示
    const handleFileChange = async(event)=>{
        const file = event.target.files[0];
        const formDate = new FormData();
        formDate.append("file-to-upload",file)
        dispatch(handleBackFileSlice(formDate));
        setSingleProductData({
            ...singleProductData,
            imageUrl:backImgFileData
        })
    }

    useEffect(()=>{
        console.log("圖片資訊更新:",backImgFileData);
    },[backImgFileData]);


    return(
        <>
            <div ref={productsModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title fs-4">新增產品</h5>
                        <button onClick={btnByProductsModalClose} type="button" className="btn-close" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-4">
                        <div className="row g-4">
                        <div className="col-md-4">
                            <div className="mb-5">
                                <label htmlFor="fileInput" className="form-label"> 圖片上傳 </label>
                                <input
                                    onChange={handleFileChange}
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className="form-control"
                                    id="fileInput"
                                />
                            </div>
                            <div className="mb-4">
                            <label htmlFor="primary-image" className="form-label">
                                主圖
                            </label>
                            <div className="input-group">
                                <input
                                value={singleProductData?.imageUrl}
                                onChange={handleProductsModalInputChange}
                                name="imageUrl"
                                type="text"
                                id="primary-image"
                                className="form-control"
                                placeholder="請輸入圖片連結"
                                />
                            </div>
                            <img
                                src={singleProductData.imageUrl}
                                alt={singleProductData.title}
                                className="img-fluid"
                            />
                            </div>

                            {/* 副圖 */}
                            <div className="border border-2 border-dashed rounded-3 p-3">
                            {
                                singleProductData.imagesUrl?.map((image, index) => (
                                    <div key={index} className="mb-2">
                                    <label
                                        htmlFor={`imagesUrl-${index + 1}`}
                                        className="form-label"
                                    >
                                        副圖 {index + 1}
                                    </label>
                                    <input
                                        value={image}
                                        onChange={(event)=>{handleImageChange(event,index)}}
                                        id={`imagesUrl-${index + 1}`}
                                        type="text"
                                        placeholder={`圖片網址 ${index + 1}`}
                                        className="form-control mb-2"
                                    />
                                    {image && (
                                        <img
                                        src={image}
                                        alt={`副圖 ${index + 1}`}
                                        className="img-fluid mb-2"
                                        />
                                    )}
                                    </div>
                            ))}
                            <div className="btn-group w-100">
                                {
                                    singleProductData.imagesUrl?.length < 5 && singleProductData.imagesUrl[singleProductData.imagesUrl?.length - 1]!=="" &&
                                    <button onClick={imgItemAdd} className="btn btn-outline-primary btn-sm w-100">新增圖片</button>
                                }
                                {
                                    singleProductData.imagesUrl?.length > 1 &&
                                    <button onClick={imgItemRemove} className="btn btn-outline-danger btn-sm w-100">取消圖片</button>
                                }
                            </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                標題
                            </label>
                            <input
                                value={singleProductData?.title}
                                onChange={handleProductsModalInputChange}
                                name="title"
                                id="title"
                                type="text"
                                className="form-control"
                                placeholder="請輸入標題"
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                分類
                            </label>
                            <input
                                value={singleProductData?.category}
                                onChange={handleProductsModalInputChange}
                                name="category"
                                id="category"
                                type="text"
                                className="form-control"
                                placeholder="請輸入分類"
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="unit" className="form-label">
                                單位
                            </label>
                            <input
                                value={singleProductData?.unit}
                                onChange={handleProductsModalInputChange}
                                name="unit"
                                id="unit"
                                type="text"
                                className="form-control"
                                placeholder="請輸入單位"
                            />
                            </div>

                            <div className="row g-3 mb-3">
                            <div className="col-6">
                                <label htmlFor="origin_price" className="form-label">
                                原價
                                </label>
                                <input
                                value={singleProductData?.origin_price}
                                onChange={handleProductsModalInputChange}
                                name="origin_price"
                                id="origin_price"
                                type="number"
                                className="form-control"
                                placeholder="請輸入原價"
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="price" className="form-label">
                                售價
                                </label>
                                <input
                                value={singleProductData?.price}
                                onChange={handleProductsModalInputChange}
                                name="price"
                                id="price"
                                type="number"
                                className="form-control"
                                placeholder="請輸入售價"
                                />
                            </div>
                            </div>

                            <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                產品描述
                            </label>
                            <textarea
                                value={singleProductData?.description}
                                onChange={handleProductsModalInputChange}
                                name="description"
                                id="description"
                                className="form-control"
                                rows={4}
                                placeholder="請輸入產品描述"
                            ></textarea>
                            </div>

                            <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                                說明內容
                            </label>
                            <textarea
                                value={singleProductData?.content}
                                onChange={handleProductsModalInputChange}
                                name="content"
                                id="content"
                                className="form-control"
                                rows={4}
                                placeholder="請輸入說明內容"
                            ></textarea>
                            </div>

                            <div className="form-check">
                            <input
                                checked={singleProductData?.is_enabled}
                                onChange={handleProductsModalInputChange}
                                name="is_enabled"
                                type="checkbox"
                                className="form-check-input"
                                id="isEnabled"
                            />
                            <label className="form-check-label" htmlFor="isEnabled">
                                是否啟用
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="modal-footer border-top bg-light">
                        <button onClick={btnByProductsModalClose} type="button" className="btn btn-secondary">
                        取消
                        </button>
                        <button onClick={handleCreateProduct} type="button" className="btn btn-primary">
                        確認
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsModal;