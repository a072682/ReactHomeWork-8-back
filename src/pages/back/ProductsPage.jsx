import { useEffect,  useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductsModal from "../../components/common/back/ProductsModal";
import DelModal from "../../components/common/back/DelModal";
import { getBackOriginalAllData, getBackOriginalData } from "../../slice/backProductsSlice";
import Toast from "../../components/common/Toast";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""]
  };

function ProductsPage(){



//獲取後端資料前置
const dispatch = useDispatch();

//取得後端登入狀態資料
  const loginState = useSelector((state)=>{
    return(
      state.login.isAuthenticated
    )
  });


//取得後端所有原始產品資料
    const backOriginalAllProductData = useSelector((state)=>{
      return(
        state.backProducts.backProductsAllData
      )
    });

//取得後端所有原始產品資料
    useEffect(()=>{
      dispatch(getBackOriginalAllData());
    },[dispatch]);



        
//取得後端原始產品資料
const backOriginalProductData = useSelector((state)=>{
  return(
    state.backProducts.backProductData
  )
});

//取得後端原始產品頁面資料
const backOriginalPagination = useSelector((state)=>{
  return(
    state.backProducts.backPagination
  )
});

//取得後端所有原始產品資料
useEffect(()=>{
  dispatch(getBackOriginalData(backDataState));
},[dispatch]);

      

//單一產品頁面狀態(點擊判斷用)
const[singleProductData,setSingleProductData] = useState(defaultModalState);


//單一產品頁面狀態(決定判斷用)
const[modeState,setModeState]=useState("")


//單一產品頁面函示
const handleSingleProductData = (data,item)=>{
  if(data === "newProduct"){
    setSingleProductData(defaultModalState);
    setModeState("newProduct");
  }else if(data === "edit"){
    setSingleProductData(item);
    setModeState("edit");
  }
}
//單一產品頁面函示

//產品頁面狀態(跳元件用)
const [handleProductsModal,setHandleProductsModal] = useState(null);
//產品頁面狀態(跳元件用)

//刪除頁面狀態(跳元件用)
const [handleDelModal,setHandleDelModal]= useState(null);
//刪除頁面狀態(跳元件用)



  // const [isLoading,setIsLoading] = useState(false);

  // const [isScreenLoading,setIsScreenLoading] = useState(false);

  
  //處理產品類別
        const backProductMenu = ["全部",...new Set(backOriginalAllProductData.map((item)=>{
          return(
            item.category //把有category的資料全部列出
          )
        }))];
        // console.log("categories:",categories);
        //處理產品類別

        const [selectAllProducts,setSelectAllProducts] = useState("全部");
        // const [finalAllProducts,setFinalAllProducts] = useState([]);

        const [backDataState,setBackDataState]= useState({
          page: 1, 
          category: ""
        })

        useEffect(()=>{
          console.log("後端選擇狀態:",selectAllProducts);
        },[selectAllProducts])

        const handleBackSelectData = (item)=>{
          const key = item === "全部" ? "" : item;
          setSelectAllProducts(key);
          dispatch(getBackOriginalData({
            ...backDataState,
            category:key
          }))
        }

        //處理產品類別過濾
        // useEffect(()=>{
        //   const filterProducts = backOriginalAllProductData.filter((item)=>{
        //     const newfilterData = selectAllProducts === "全部" || item.category === selectAllProducts;
        //     return (newfilterData);
        //   })
        //   setFinalAllProducts(filterProducts);
        // },[backOriginalAllProductData,selectAllProducts])

  //處理產品類別過濾
  

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
          {
             loginState ? (<h2 className="fw-bold">產品頁面</h2>):(<h2 className="fw-bold">請登入後台使用者帳號</h2>)
          }
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
                      <h4 className="mb-0">產品類別</h4>
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
                          backProductMenu.map((item)=>{
                            return(
                              <li key={item}>
                                <button onClick={()=>{handleBackSelectData(item)}} type="button" href="#" className="btn border-none py-2 d-block text-muted">
                                  {item}
                                </button>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                  
                </div>
                
              </div>
              <button onClick={()=>{handleProductsModal?.show();handleSingleProductData("newProduct")}} className="btn btn-dark">新增產品</button>
            </div>
            <div className="col-md-8">
              <div className="row">
                {/* 產品卡片 */}
                {
                  loginState ? (
                    backOriginalProductData?.map((item)=>{
                      return(
                        <div key={item.id} className="col-md-6">
                          <div className="card border-0 mb-4 position-relative position-relative">
                            <img
                              src={item.imageUrl}
                              className="card-img-top rounded-0 ProductsPageCartImgSet"
                              alt={item.title}
                            />
                            <div className="card-body p-0">
                              <h4 className="mb-0 mt-3">
                                <Link to={`/products/${item.id}`}>{item.title}</Link><span className="ms-3 badge bg-secondary">{ item.is_enabled ? ("啟用"):("非啟用")}</span>
                              </h4>
                              <p className="card-text mb-0">
                                NT${item.price}
                                <span className="text-muted ">
                                  <del>NT${item.origin_price}</del>
                                </span>
                              </p>
                              <div className="text-muted mt-3 d-flex">
                                <button onClick={()=>{handleProductsModal?.show();handleSingleProductData("edit",item)}} className="btn btn-secondary me-3">修改</button>
                                <button onClick={()=>{handleDelModal?.show();handleSingleProductData("edit",item)}} className="btn btn-dark">刪除</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  }))
                  :
                  (<h2 className="fw-bold text-center">請登入後台使用者帳號</h2>)
                }
                {/* 產品卡片 */}
                
              </div>
                <nav className="d-flex justify-content-center">
                  <ul className="pagination">
                    <li className={`page-item ${!backOriginalPagination?.has_pre && "disabled"}`}>
                      <a onClick={(event)=>{event.preventDefault(); dispatch(getBackOriginalData({...backDataState,page:backOriginalPagination?.current_page - 1}));}} className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {
                      Array.from({length: backOriginalPagination?.total_pages}).map((_,index)=>
                        {
                            return(
                              <li key={index} className={`page-item ${backOriginalPagination?.current_page === index + 1 && "active"}`}>
                                <a onClick={(event)=>{event.preventDefault(); dispatch(getBackOriginalData({...backDataState,page:index + 1}));}} className="page-link" href="#">
                                  {index + 1}
                                </a>
                              </li>)
                        })
                    }
                    <li className={`page-item ${!backOriginalPagination?.has_next && "disabled"}`}>
                      <a onClick={(event)=>{event.preventDefault(); dispatch(getBackOriginalData({...backDataState,page:backOriginalPagination?.current_page + 1}));}} className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
            </div>
          </div>
        </div>
        {/* {isScreenLoading && 
            (
            <div  className="d-flex justify-content-center align-items-center" 
                    style={{ position: "fixed", inset: 0, backgroundColor: "rgba(255,255,255,0.3)", zIndex: 999,}}
            >
                <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
            </div>
            )
        } */}
      </div>
      <ProductsModal setHandleProductsModal={setHandleProductsModal} singleProductData={singleProductData} setSingleProductData={setSingleProductData} 
      modeState={modeState} setModeState={setModeState}/>
      <DelModal singleProductData={singleProductData} setSingleProductData={setSingleProductData} 
      handleDelModal={handleDelModal} setHandleDelModal={setHandleDelModal} />

      <Toast />
    </>
  )
    
}

export default ProductsPage;

// useEffect(() => {

// return(
    //     <>
    //         <div className="container">
    //             <table className="table align-middle">
    //                 <thead>
    //                     <tr>
    //                         <th>圖片</th>
    //                         <th>商品名稱</th>
    //                         <th>價格</th>
    //                         <th></th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {products.map((product) => (
    //                         <tr key={product.id}>
    //                         <td style={{ width: "200px" }}>
    //                             <img
    //                             className="img-fluid"
    //                             src={product.imageUrl}
    //                             alt={product.title}
    //                             />
    //                         </td>
    //                         <td>{product.title}</td>
    //                         <td>
    //                             <del className="h6">原價 {product.origin_price} 元</del>
    //                             <div className="h5">特價 {product.origin_price}元</div>
    //                         </td>
    //                         <td>
    //                             <div className="btn-group btn-group-sm">
    //                             <Link
    //                                 to = {`/products/${product.id}`}
    //                                 className="btn btn-outline-secondary"
    //                             >
    //                                 查看更多
    //                             </Link>
    //                             <button disabled={isLoading} onClick={()=>{addCartItem(product.id,1)}} type="button" className="btn btn-outline-danger">
    //                                 <div>加到購物車</div>
    //                                 {
    //                                 isLoading && (<ReactLoading type={"spin"} color={"#000"} height={"1.5rem"} width={"1.5rem"}/>)
    //                                 }
    //                             </button>
    //                             </div>
    //                         </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
        
            
    //             {isScreenLoading && 
    //                 (
    //                 <div  className="d-flex justify-content-center align-items-center" 
    //                         style={{ position: "fixed", inset: 0, backgroundColor: "rgba(255,255,255,0.3)", zIndex: 999,}}
    //                 >
    //                     <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
    //                 </div>
    //                 )
    //             }
    //     </>
    // )