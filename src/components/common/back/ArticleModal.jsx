import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { handleBackFileSlice, postBackArticle, putBackArticle } from "../../../slice/backProductsSlice";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function ArticleModal ({setHandleArticleModal,setArticleIn,articleIn,articleMode,articleDefault,getArticlesData}){

    //抓取遠端資料前置
    const dispatch = useDispatch();

    

    //
        const articleModalRef = useRef(null);
        const [articleModal,setArticleModal] = useState(null);
        useEffect(()=>{
            if (articleModalRef.current) {
                const instance = new Modal(articleModalRef.current,{
                    backdrop:false
                });
                setArticleModal(instance);

                // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
                if (setHandleArticleModal) {
                        setHandleArticleModal(
                            {
                                show: () => instance.show(),
                                hide: () => instance.hide(),
                            }
                        );
                }
            }
        },[]);

        const btnByArticleModalOpen = ()=>{
            articleModal?.show();
        }
        const btnByArticleModalClose = ()=>{
            articleModal?.hide();
        }
    //

    const handleArticleModalInputChange = (event)=>{
        const { name, value, type, checked } = event.target;
        setArticleIn({
            ...articleIn,
            [name]:type === "checkbox" ? (checked) : (value),
            content:"測試用",
            create_at: Date.now(),
        })
    }

    const articleImgItemAdd = ()=>{
        const newImg = [...articleIn.tag,""];
        setArticleIn({
            ...articleIn,
            tag:newImg
        })
    }
    const articleImgItemRemove =()=>{
        const newImg = [...articleIn.tag];
        newImg.pop();
        setArticleIn({
            ...articleIn,
            tag:newImg
        })
    }

    const articleMainImageChange=(event,index)=>{
        const {value} = event.target;
        const newImages = [...articleIn.tag];
        newImages[index] = value;
        setArticleIn({
            ...articleIn,
            tag:newImages
        })

    }

    //新增文章api函式
    const postArticle = ()=>{
        dispatch(postBackArticle(articleIn));
        btnByArticleModalClose();
    }
    //新增文章api函式

    //編輯文章api函式
    const putArticle = ()=>{
        dispatch(putBackArticle(articleIn));
        btnByArticleModalClose();
    }
    //編輯文章api函式

    
    //
    const handleArticleItem = ()=>{
        if(articleMode === "new"){
            postArticle();
            
        }else if(articleMode === "edit"){
            putArticle();
            
        }
    }
    

    // 圖片函示
    const handleFileChange = async(event)=>{
        const file = event.target.files[0];
        const formDate = new FormData();
        formDate.append("file-to-upload",file)
        try{
            const handleFileChangeRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/upload`,formDate);
            console.log("上傳圖片成功",handleFileChangeRef.data.imageUrl);
            setArticleIn({
                ...articleIn,
                image:handleFileChangeRef.data.imageUrl
            })
        }catch(error){
            console.log("上傳圖片失敗",error);
        }
      }




    return(
        <>
            <div ref={articleModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title fs-4">新增產品</h5>
                        <button onClick={btnByArticleModalClose} type="button" className="btn-close" aria-label="Close"></button>
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
                                value={articleIn?.image}
                                onChange={handleArticleModalInputChange}
                                name="image"
                                type="text"
                                id="primary-image"
                                className="form-control"
                                placeholder="請輸入圖片連結"
                                />
                            </div>
                            <img
                                src={articleIn?.image}
                                alt={articleIn?.title}
                                className="img-fluid"
                            />
                            </div>

                            {/* 副圖 */}
                            <div className="border border-2 border-dashed rounded-3 p-3">
                            {
                                articleIn.tag?.map((image, index) => (
                                    <div key={index} className="mb-2">
                                    <label
                                        htmlFor={`imagesUrl-${index + 1}`}
                                        className="form-label"
                                    >
                                        副圖 {index + 1}
                                    </label>
                                    <input
                                        value={image}
                                        onChange={(event)=>{articleMainImageChange(event,index)}}
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
                                    articleIn.tag?.length < 5 && articleIn.tag[articleIn.tag?.length - 1]!=="" &&
                                    <button onClick={articleImgItemAdd} className="btn btn-outline-primary btn-sm w-100">新增圖片</button>
                                }
                                {
                                    articleIn.tag?.length > 1 &&
                                    <button onClick={articleImgItemRemove} className="btn btn-outline-danger btn-sm w-100">取消圖片</button>
                                }
                            </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                文章標題
                            </label>
                            <input
                                value={articleIn?.title}
                                onChange={handleArticleModalInputChange}
                                name="title"
                                id="title"
                                type="text"
                                className="form-control"
                                placeholder="請輸入標題"
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="author" className="form-label">
                                文章作者
                            </label>
                            <input
                                value={articleIn?.author}
                                onChange={handleArticleModalInputChange}
                                name="author"
                                id="author"
                                type="text"
                                className="form-control"
                                placeholder="請輸入作者"
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                文章描述
                            </label>
                            <textarea
                                value={articleIn?.description}
                                onChange={handleArticleModalInputChange}
                                name="description"
                                id="description"
                                className="form-control"
                                rows={4}
                                placeholder="請輸入文章描述"
                            ></textarea>
                            </div>

                            <div className="form-check">
                            <input
                                checked={articleIn?.isPublic}
                                onChange={handleArticleModalInputChange}
                                name="isPublic"
                                type="checkbox"
                                className="form-check-input"
                                id="isPublic"
                            />
                            <label className="form-check-label" htmlFor="isPublic">
                                是否公開
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="modal-footer border-top bg-light">
                        <button onClick={btnByArticleModalClose} type="button" className="btn btn-secondary">
                        取消
                        </button>
                        <button onClick={()=>{handleArticleItem();}} type="button" className="btn btn-primary">
                        確認
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticleModal;