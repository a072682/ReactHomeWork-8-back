import { useEffect,  useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductsModal from "../../components/common/back/ProductsModal";
import DelModal from "../../components/common/back/DelModal";
import { getBackOriginalAllData, getBackOriginalData } from "../../slice/backProductsSlice";
import Toast from "../../components/common/Toast";
import ReactPagination from "../../components/common/ReactPagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './_ProductsPage.scss';



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
  const backAllProductsData = useSelector((state)=>{
    return(
      state.backProducts.backProductsAllData
    )
  });
  useEffect(()=>{
    dispatch(getBackOriginalAllData());
  },[])

//取得後端所有原始產品資料

//處理item資料
    //儲存item資料
    const[backProductsItemData,setBackProductsItemData]=useState(null);
    //儲存item資料

    useEffect(()=>{
      handleProductsItemsData(backAllProductsData);
      console.log("item資料寫入");
    },[backAllProductsData]);

    useEffect(()=>{
      console.log("item資料",backProductsItemData);
    },[backProductsItemData]);

    //處理item資料
    const handleProductsItemsData = (input) => {
        const results = [
            {
                id: "all",
                category: "所有產品"
            },
            ...input.filter(
                (item, index, self) =>
                    index === self.findIndex((t) => t.category === item.category)
                //會回傳第一個 id 相同的物件索引
                //如果目前的索引就是第一個出現的那個，就保留；不是的話就過濾掉
            )
        ];
        setBackProductsItemData(results);
    };
    //處理item資料
//處理item資料

//處理過濾後產品資料

    //儲存item資料
    const[backProductsData,setBackProductsData]=useState(null);
    //儲存item資料

    useEffect(()=>{
        handleProductsData(backAllProductsData,"所有產品");
    },[backAllProductsData])

    //點擊item時觸發
    const handleProductsData = (input,key)=>{
        input?.filter((item)=>{
            if(key === "所有產品"){
                // return true; 
                // 保留所有項目
                setBackProductsData(input);
            }else if (key === "收藏"){
                const filtered = input.filter((item) => favoriteIds.includes(item.id));
                //從源頭陣列中找出包括favoriteIds陣列的資料並放入filtered陣列中
                setBackProductsData(filtered);
            }else{
                //return item.category === key; 
                // 篩選符合的類別
                const filtered = input.filter((item) => item.category === key);
                setBackProductsData(filtered);
            }
        })
    }

    //處理案件函式+寫入產品資料
    const handleItemBtnClick = (key)=>{
        handleProductsData(backAllProductsData,key);
    }
    //處理案件函式+寫入產品資料

    useEffect(()=>{
        console.log("過濾後的資料:",backProductsData);
    },[backProductsData])

//處理過濾後產品資料
      

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

//處理頁碼狀態
    const [currentPage, setCurrentPage] = useState(1);//頁碼狀態
    // const totalItems = allThemeData?.length;
    const itemsPerPage = 8;//上限
    const totalPages = backProductsData && backProductsData.length > 0 ? Math.ceil(backProductsData.length / itemsPerPage): 1;//Math.ceil無條件進位
    //總頁數

    const indexOfLastItem = currentPage * itemsPerPage;//算出當前頁面的資料顯示範圍 
    // 例如:currentPage(第幾頁) = 1，itemsPerPage = 8，那 indexOfLastItem = 1 * 8 = 8
    //「第1頁」的資料範圍會是 第0筆~第7筆（共8筆）

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //取得索引的前部分數字
    //indexOfLastItem = 8 itemsPerPage = 8 所以indexOfFirstItem = 8 - 8 = 0
    const newBackProductsData = backProductsData?.slice(indexOfFirstItem, indexOfLastItem);
    // console.log("過濾後的資料02",newProductsData);
    //因此allThemeData.slice(0, 8) 取出0~7筆資料顯示
    console.log("產品資料",newBackProductsData);

    // 切換頁數時執行的動作
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // console.log("切換到第", newPage, "頁");
        // 可以在這裡載入對應頁碼的資料
    };
//處理頁碼狀態


  return(
    <>
      <div className="container-fluid">
        {/* 上方圖片區 */}
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
        {/* 上方圖片區 */}

        {/* 下方內容區 */}
        <div className="container mt-md-5 mt-3 mb-7">
          <div className="row">
            <div className="col-md-4">

                {/* 左側item區 */}
                {
                  loginState ?
                  (
                    <>
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
                          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              <div className="card-body py-0">
                                  <ul className="list-unstyled">
                                      {
                                        backProductsItemData?.map((item)=>{
                                          return(
                                            <li key={item.id}>
                                              <button onClick={()=>{handleItemBtnClick(item.category)}} type="button" href="#" className="btn border-none py-2 d-block text-muted">
                                                {item.category}
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
                      <button onClick={()=>{handleProductsModal?.show();handleSingleProductData("newProduct")}} className="btn btn-dark mb-12">新增產品</button>
                    </>
                    
                  )
                  :
                  (
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
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="card-body py-0">
                                <ul className="list-unstyled">
                                </ul>
                            </div>
                        </div>  
                      </div>
                    </div>
                  )
                }
                
                {/* 左側item區 */}
            </div>
            <div className="col-md-8 d-none d-lg-block">
              <div className="row">
                {/* 產品卡片 */}
                {/* 右側產品區 */}
                  {
                    loginState ? (
                        newBackProductsData?.map((item)=>{
                            return(
                              <div key={item.id} className="col-md-6">
                                <div className="card border-0 mb-12 position-relative">
                                  <img
                                    src={item.imageUrl}
                                    className="card-img-top ProductsPageCartImgSet"
                                    alt={item.title}
                                    style={{borderRadius:"12px",}}
                                  />
                                  <div className="card-body p-0 d-flex flex-column gap-6 mt-12">
                                    <h4 className="mb-0 ">
                                      {item.title}
                                      <span className="ms-12 badge bg-secondary">{ item.is_enabled ? ("啟用"):("非啟用")}</span>
                                    </h4>
                                    <p className="card-text mb-0">
                                      NT${item.price}
                                      <span className="text-muted ms-12">
                                        <del>NT${item.origin_price}</del>
                                      </span>
                                    </p>
                                    <div className="text-muted mt-3 d-flex gap-12">
                                      <button onClick={()=>{handleProductsModal?.show();handleSingleProductData("edit",item)}} className="btn btn-secondary me-3">修改</button>
                                      <button onClick={()=>{handleDelModal?.show();handleSingleProductData("edit",item)}} className="btn btn-dark">刪除</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                        })
                    )
                    :
                    (
                      <h2 className="fw-bold text-center p-24">請登入後台使用者帳號</h2>
                    )
                  }
                {/* 右側產品區 */}
                {/* 產品卡片 */}
                
              </div>
              {
                loginState ? 
                (
                  <ReactPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )
                :
                (
                  null
                )
              }
              
            </div>
            <div className="col-12 d-block d-lg-none">
              <div className="swiper-box">
              {
                loginState ? (
                  backProductsData && backProductsData.length > 0 && (
                      <Swiper
                          spaceBetween={24}
                          loop={true}
                          modules={[Navigation]}
                          navigation={{
                              prevEl: ".swiper-products-prev",
                              nextEl: ".swiper-products-next",
                          }}
                          breakpoints={{
                              0: {
                              slidesPerView: 1, // 0px以上（手機）顯示1張
                              },
                              768: {
                              slidesPerView: 1, // 992px以上（桌機）顯示3張
                              },
                          }}
                      >

                          {
                              backProductsData?.map((item, index) => (   
                                  <SwiperSlide key={item.id}>
                                      <div className="card border-0 mb-12 position-relative">
                                        <img
                                          src={item.imageUrl}
                                          className="card-img-top ProductsPageCartImgSet"
                                          alt={item.title}
                                          style={{borderRadius:"12px",}}
                                        />
                                        <div className="card-body p-0 d-flex flex-column gap-6 mt-12">
                                          <h4 className="mb-0 ">
                                            {item.title}
                                            <span className="ms-12 badge bg-secondary">{ item.is_enabled ? ("啟用"):("非啟用")}</span>
                                          </h4>
                                          <p className="card-text mb-0">
                                            NT${item.price}
                                            <span className="text-muted ms-12">
                                              <del>NT${item.origin_price}</del>
                                            </span>
                                          </p>
                                          <div className="text-muted mt-3 d-flex gap-12">
                                            <button onClick={()=>{handleProductsModal?.show();handleSingleProductData("edit",item)}} className="btn btn-secondary me-3">修改</button>
                                            <button onClick={()=>{handleDelModal?.show();handleSingleProductData("edit",item)}} className="btn btn-dark">刪除</button>
                                          </div>
                                        </div>
                                      </div>
                                  </SwiperSlide>
                              ))
                          }
                          <button
                              className="swiper-products-prev"
                              type="button"
                          >
                              <span class="material-symbols-outlined swiper-control-prev-icon">
                                  arrow_back_ios_new
                              </span>
                          </button>
                          <button
                              className="swiper-products-next"
                              type="button"
                          >
                              <span class="material-symbols-outlined swiper-control-prev-icon">
                                  arrow_forward_ios
                              </span>
                          </button>
                      </Swiper>
                  )
                )
                :
                (
                  null
                )
              }
          </div>
            </div>
          </div>
        </div>
        {/* 下方內容區 */}
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
