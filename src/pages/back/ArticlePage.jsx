
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ArticleModal from "../../components/common/back/ArticleModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteBackArticle, getBackArticlesData } from "../../slice/backProductsSlice";
import Toast from "../../components/common/Toast";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function ArticlePage (){
    
    //抓取遠端資料前置
    const dispatch = useDispatch();

    
    //獲取遠端文章資料
    const originalArticlesData = useSelector((state)=>{
        return(
          state.backProducts.originalBackArticlesData
        )
    });

    //獲取遠端文章頁面資料
    const articlesPagination = useSelector((state)=>{
        return(
          state.backProducts.backArticlesPagination
        )
    });

    //文章資料
        useEffect(()=>{
            dispatch(getBackArticlesData());
            console.log("初始文章資料:",originalArticlesData);
            console.log("初始文章頁面資料:",articlesPagination);
        },[])
    //文章資料

    //刪除文章api函式
    const deleteArticle = (id)=>{
        dispatch(deleteBackArticle(id));
    }
    //刪除文章api函式


    //開關
    const [handleArticleModal,setHandleArticleModal] = useState(null);
    //開關

    //
    const articleDefault = {
        title:"",
        description:"",
        image:"",
        tag:[
            ""
        ],
        create_at:"",
        author: "",
        isPublic:false,
        content:"",
    };
    const[articleIn,setArticleIn]=useState(articleDefault);
    const[articleMode,setArticleMode]=useState(null);

    const getArticleIn =(mode,item)=>{
        if(mode === "new"){
            setArticleIn(articleDefault);
            console.log("創立新文章");
            setArticleMode("new");
        }else{
            setArticleIn(item);
            console.log("修改文章");
            setArticleMode("edit");
        }
    }

    //文章資料
    useEffect(()=>{
        console.log("所有文章資料:",originalArticlesData);
        console.log("目前初始文章頁面資料:",articlesPagination);
        console.log("目前文章狀態:",articleMode);
        console.log("目前文章內容:",articleIn);
    },[originalArticlesData,articlesPagination,articleMode,articleIn]);
    //文章資料


    return(
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="mt-3">
                        <div className="d-flex align-items-center">
                            <h3 className="m-0">頁面</h3>
                            <button onClick={()=>{handleArticleModal?.show();getArticleIn("new");}} type="button" className="btn btn-dark ms-3">新增文章</button>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border-0">
                                            文章創立時間
                                            </th>
                                            <th scope="col" className="border-0 ps-0">
                                            文章標題
                                            </th>
                                            <th scope="col" className="border-0 ps-0">
                                            文章作者
                                            </th>
                                            <th scope="col" className="border-0">
                                            編輯文章
                                            </th>
                                            <th scope="col" className="border-0">
                                            文章是否公開
                                            </th>
                                            <th scope="col" className="border-0">
                                            刪除文章
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            originalArticlesData?.map((item)=>{
                                                return(
                                                    <tr key={item.id} className="border-bottom border-top">
                                                        <th
                                                        scope="row"
                                                        className="border-0 px-0 font-weight-normal py-4"
                                                        >
                                                            <p className="mb-0 fw-bold ms-3 d-inline-block">
                                                                {new Date(item.create_at).toLocaleDateString("zh-TW")}
                                                            </p>
                                                        </th>
                                                        <td className="border-0 align-middle">
                                                            <p className="mb-0 ms-auto">{item.title}</p>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <p className="mb-0 ms-auto">{item.author}</p>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <button
                                                                onClick={()=>{handleArticleModal?.show();getArticleIn("edit",item);}}
                                                                className="btn btn-outline-dark border-0"
                                                                type="button"
                                                            >
                                                                查看文章細節
                                                            </button>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <p className="mb-0 ms-auto">{item.isPublic ?("公開"):("非公開")}</p>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <button
                                                                onClick={()=>{deleteArticle(item.id);}}
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
                                <li className={`page-item ${articlesPagination?.has_pre?(""):("disabled")} `}>
                                    <a onClick={(event)=>{event.preventDefault(); dispatch(getBackArticlesData(articlesPagination.current_page - 1));}} 
                                    className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {
                                    Array.from({length: articlesPagination?.total_pages}).map((_,index)=>
                                    {
                                        return(
                                            <li key={index} className={`page-item ${articlesPagination?.current_page === index + 1 && "active"}`}>
                                            <a onClick={(event)=>{event.preventDefault(); dispatch(getBackArticlesData(index + 1));}} className="page-link" href="#">
                                                {index + 1}
                                            </a>
                                            </li>)
                                    })
                                }
                                <li className={`page-item ${articlesPagination?.has_next?(""):("disabled")} `}>
                                    <a onClick={(event)=>{event.preventDefault(); dispatch(getBackArticlesData(articlesPagination.current_page + 1));}}  
                                    className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <ArticleModal setHandleArticleModal={setHandleArticleModal} articleIn={articleIn} articleMode={articleMode} setArticleIn={setArticleIn}
            articleDefault={articleDefault}/>
            <Toast />
        </>
    )
}

export default ArticlePage;