import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function FrontArticlePage(){


    //文章資料
    const [originalArticlesData,setOriginalArticlesData]=useState([]);
    const [articlesPaginationData,setArticlesPaginationData]=useState({});
    const getArticlesData = async(page = 1)=>{
        try{
            const getArticlesDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/articles?page=${page}`);
            console.log("取得文章資料成功",getArticlesDataRef.data.articles);
            setOriginalArticlesData(getArticlesDataRef.data.articles);
            console.log("取得文章頁面成功",getArticlesDataRef.data.pagination);
            setArticlesPaginationData(getArticlesDataRef.data.pagination);
        }catch(error){
            console.log("取得文章資料失敗",error);
        }
    }
    useEffect(()=>{
        getArticlesData();
    },[])
    //

    //處理過後的文章資料
    //選項狀態
    const [articlesSelectData,setArticlesSelectData]=useState("最新文章");
    const [finalArticlesData,setFinalArticlesData]=useState([]);



    // 用於處理選項點擊
    const test = (item) => {
      setArticlesSelectData(item);
      console.log(item);
    };

    // 更新顯示的文章
    useEffect(() => {
      const newArticlesData = originalArticlesData.filter((item)=>{
        const newArticlesSelectData = articlesSelectData === "最新文章";
        return(newArticlesSelectData);
      })
      setFinalArticlesData(newArticlesData);
    }, [originalArticlesData, articlesSelectData]);


    return(
        <>
            <div className="container-fluid">
                    <div
                      className="position-relative d-flex align-items-center justify-content-center"
                      style={{ minHeight: "400px" }}
                    >
                      <div
                        className="position-absolute"
                        style={{
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundImage:
                            "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
                          backgroundPosition: "center center",
                          opacity: 0.1,
                        }}
                      ></div>
                      <h2 className="fw-bold">商品文章</h2>
                    </div>
                    <div className="container mt-md-5 mt-3 mb-7">
                      <div className="row">
                        <div className="col-md-4">
                          <div
                            className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
                            id="accordionExample"
                          >
                            <div className="card border-0">
                              <div
                                className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                                id="headingOne"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                              >
                                <div className="d-flex justify-content-between align-items-center pe-1">
                                  <h4 className="mb-0">文章列表</h4>
                                  <i className="fas fa-chevron-down"></i>
                                </div>
                              </div>
                              <div
                                id="collapseOne"
                                className="collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="card-body py-0">
                                  <ul className="list-unstyled">
                                        <li>
                                            <a onClick={(event)=>{event.preventDefault();test(event.target.innerText);}} href="#" className="py-2 d-block text-muted">
                                                最新文章
                                            </a>
                                        </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="row">
                            
                                {
                                    finalArticlesData?.map((item,index)=>{
                                        return(
                                          <div key={index} className="col-md-6">
                                            <div className="card border-0 mb-4 position-relative position-relative">
                                                <img
                                                    src={item.image}
                                                    className="card-img-top rounded-0 img-set"
                                                    alt={item.title}
                                                />
                                                <a href="#" className="text-dark">
                                                <i
                                                    className="far fa-heart position-absolute"
                                                    style={{ right: "16px", top: "16px" }}
                                                ></i>
                                                </a>
                                                <div className="card-body p-0">
                                                <h4 className="mb-0 mt-3">
                                                    <Link to={`/FrontArticlePage/${item.id}`} className="text-decoration-none">{item.title}</Link>
                                                </h4>
                                                <p className="card-text mb-0">
                                                    {item.description}
                                                </p>
                                                <p className="text-muted mt-3"></p>
                                                </div>
                                            </div>
                                          </div>
                                        )
                                    })
                                }
                          </div>
                          <nav className="d-flex justify-content-center">
                            <ul className="pagination">
                              <li className={`page-item ${articlesPaginationData?.has_pre?(""):("disabled") }`}>
                                <a  onClick={(event)=>{event.preventDefault();getArticlesData(articlesPaginationData?.current_page - 1);}} 
                                    className="page-link" href="#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                              </li>
            
                                {
                                  
                                    Array.from({length: articlesPaginationData?.total_pages}).map((_,index)=>
                                      {
                                          return(
                                            <li key={index} className={`page-item ${articlesPaginationData?.current_page === index + 1 && "active"}`}>
                                              <a onClick={(event)=>{event.preventDefault(); getArticlesData(index + 1);}} className="page-link" href="#">
                                                {index + 1}
                                              </a>
                                            </li>)
                                      })
                                  
                                }
            
                              
                              <li className={`page-item ${articlesPaginationData?.has_next?(""):("disabled") }`}>
                                <a onClick={(event)=>{event.preventDefault();getArticlesData(articlesPaginationData?.current_page + 1);}}  className="page-link" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
        </>
    )
}

export default FrontArticlePage;