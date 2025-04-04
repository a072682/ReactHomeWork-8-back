import { useDispatch, useSelector } from "react-redux";
import { getFrontOriginalData, getOriginalAllData } from "../../slice/productsSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductsFrontPage() {


    const dispatch = useDispatch();

    //獲取遠端讀取狀態
    const isScreenLoading = useSelector((state)=>{
      return(
        state.products.IsScreenLoading
      )
    });


    //獲取原始所有商品資料
    const originalGetAllProductData = useSelector((state)=>{
      return(
        state.products.productsAllData
      )
    });

    //獲取原始商品資料(帶限制)
    const originalProductData = useSelector((state)=>{
        return(
          state.products.frontProductData
        )
    });

    //獲取原始商品頁面資料
    const originalgetPagination = useSelector((state)=>{
      return(
        state.products.frontPagination
      )
    });
    
    //產品列表用矩陣
    const productItemMenu = ["全部",...new Set(originalGetAllProductData?.map((item)=>{
      return(
        item.category
      )
    }))];

    //選項的狀態
    const [selectProductItem,setSelectProductItem] = useState("");
      

    const [frontDataState,setFrontDataState]= useState({
      page: 1, 
      category: ""
    })
    const handleSelectProductItem = (item) => {
      console.log("確認item內容:", item);
  
      // 如果 item 是 "全部"，則將 category 設為空字符串 ""
      const categoryValue = item === "全部" ? "" : item;
  
      // 更新 selectProductItem 狀態
      setSelectProductItem(categoryValue);
  
      // 傳遞給 getFrontOriginalData，更新 category 的值
      dispatch(getFrontOriginalData({ ...frontDataState, category: categoryValue }));
    }

    useEffect(()=>{
      dispatch(getOriginalAllData());
      dispatch(getFrontOriginalData({ frontDataState }));
    },[]);

    useEffect(()=>{
      console.log("原始產品資料更新內容:",originalProductData);
    },[originalProductData])

    useEffect(()=>{
      console.log("原始產品頁面更新內容:",originalgetPagination);
    },[originalgetPagination])
    

    return (
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
          <h2 className="fw-bold">產品頁面</h2>
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
                      <h4 className="mb-0">產品列表</h4>
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
                        {
                          productItemMenu?.map((item,index)=>{
                            return(
                              <li key={index}>
                                <a onClick={(event)=>{event.preventDefault();handleSelectProductItem(item);
                                  }} href="#" className="py-2 d-block text-muted">
                                  {item}
                                </a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                
                    {
                        originalProductData?.map((item,index)=>{
                            return(
                              <div key={index} className="col-md-6">
                                <div className="card border-0 mb-4 position-relative">
                                    <img
                                        src={item.imageUrl}
                                        className="card-img-top rounded-0 ProductsFrontPageImgSet"
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
                                        <Link to={`/products/${item.id}`}>{item.title}</Link>
                                    </h4>
                                    <p className="card-text mb-0">
                                        NT${item.price}
                                        <span className="text-muted ">
                                        <del>NT${item.origin_price}</del>
                                        </span>
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
                  <li className={`page-item ${originalgetPagination?.has_pre?(""):("disabled") }`}>
                    <a  onClick={(event)=>{event.preventDefault();dispatch(getFrontOriginalData({ ...frontDataState, page:originalgetPagination.current_page - 1,category:selectProductItem }));}} 
                        className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>

                    {
                      
                        Array.from({length: originalgetPagination?.total_pages}).map((_,index)=>
                          {
                              return(
                                <li key={index} className={`page-item ${originalgetPagination?.current_page === index + 1 && "active"}`}>
                                  <a onClick={(event)=>{event.preventDefault(); dispatch(getFrontOriginalData({ ...frontDataState,page:index + 1,category:selectProductItem }));}} className="page-link" href="#">
                                    {index + 1}
                                  </a>
                                </li>)
                          })
                      
                    }

                  
                  <li className={`page-item ${originalgetPagination?.has_next?(""):("disabled") }`}>
                    <a onClick={(event)=>{event.preventDefault();dispatch(getFrontOriginalData({ ...frontDataState, page:originalgetPagination.current_page + 1,category:selectProductItem }));}}  className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
              
            </div>
          </div>
        </div>
        {isScreenLoading && 
            (
            <div  className="d-flex justify-content-center align-items-center" 
                    style={{ position: "fixed", inset: 0, backgroundColor: "rgba(255,255,255,0.3)", zIndex: 999,}}
            >
                <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
            </div>
            )
        }
      </div>
    );
  }
  