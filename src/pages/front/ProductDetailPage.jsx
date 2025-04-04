import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReactLoading from "react-loading"
import "swiper/css";// 核心 CSS
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from "react-redux";
import { addCartItemSlice, getSingleProductData } from "../../slice/productsSlice";
import { pushMessage } from "../../slice/toastSlice";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function ProductDetailPage(){

    // const [isLoading,setIsLoading] = useState(false);
    // const [isScreenLoading,setIsScreenLoading] = useState(false);

    //抓取遠端資料前置
    const dispatch = useDispatch();

    //移動網頁前置
    const navigate = useNavigate();

    //id宣告
    const { id: product_id } = useParams();

    //獲取遠端讀取狀態
    const isScreenLoading = useSelector((state)=>{
      return(
        state.products.IsScreenLoading
      )
    });

    //獲取原始商品資料(單一)
    const singleProductData = useSelector((state)=>{
        return(
          state.products.frontSingleProductData
        )
    });

    useEffect(() => {
      dispatch(getSingleProductData(product_id));
    }, []);

    //數量儲存狀態
    const[qtySelect,setQtySelect] = useState(1);

    useEffect(()=>{
      console.log("確認數量:",qtySelect);
    },[qtySelect]);

    //swiper專用陣列
    const singleSwiperData = Array.isArray(singleProductData.imagesUrl) 
    ? [...singleProductData.imagesUrl, ...singleProductData.imagesUrl]  // 重複數組
    : []; 
    // console.log("多重圖片",singleSwiperData);
    

    //加入購物車
    const addCartItem = (product_id,qty)=>{
        dispatch(addCartItemSlice({product_id,qty})); 
        navigate("/cart");
        dispatch(
          pushMessage({
            text: "成功加入購物車",
            status: "success",
          })
        );
    }
    
    

      return (
        <div className="container-fluid">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-7">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={singleProductData.imageUrl}
                        className="d-block w-100"
                        alt={singleProductData.title}
                      />
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="col-md-5">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                    <li className="breadcrumb-item">
                      <Link className="text-muted" to="/">
                        首頁
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link className="text-muted" to="/products">
                        產品列表
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      產品資訊
                    </li>
                  </ol>
                </nav>
                <h2 className="fw-bold h1 mb-1">{singleProductData.title}</h2>
                <p className="mb-0 text-muted text-end">
                  <del>NT${singleProductData.origin_price}</del>
                </p>
                <p className="h4 fw-bold text-end">NT${singleProductData.price}</p>
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="input-group my-3 bg-light rounded">
                      <div className="input-group-prepend">
                        <button
                          onClick={()=>{setQtySelect(qtySelect - 1)}}
                          disabled={qtySelect === 1}
                          className="btn btn-outline-dark border-0 py-2"
                          type="button"
                          id="button-addon1"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control border-0 text-center my-auto shadow-none bg-light"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        value={qtySelect}
                      />
                      <div className="input-group-append">
                        <button
                          onClick={()=>{setQtySelect(qtySelect + 1)}}
                          className="btn btn-outline-dark border-0 py-2"
                          type="button"
                          id="button-addon2"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={()=>{addCartItem(singleProductData.id,qtySelect)}}
                      type="button"
                      className="text-nowrap btn btn-dark w-100 py-2"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-4">
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                  erat, sed diam voluptua. At vero eos et accusam et
                </p>
              </div>
              <div className="col-md-3">
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor
                </p>
              </div>
            </div>
            <h3 className="fw-bold">商品圖片</h3>
            
            <div className="swiper-container mt-4 mb-5 position-relative">
                <div className="swiper-slide SwiperSlideSet mx-auto">

            

                    <Swiper
                        modules={[Autoplay,Navigation]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation={{ prevEl: ".carousel-control-prev", nextEl: ".carousel-control-next" }}
                        breakpoints={{
                          992: { slidesPerView: 3 }, // 電腦顯示 1 張
                        }}
                        loop={true}
                        autoplay={{ delay: 2500 }}
                        className="mySwiper"
                        >
                        {
                            singleSwiperData.map((item,index)=>{
                                return(
                                    <SwiperSlide>
                                        
                                                    <div key={index} className="card border-0 mb-4">
                                                        <img
                                                            src={item}
                                                            className="card-img-top rounded-3 ProductDetailPageImgSet mx-auto"
                                                            alt="..."
                                                            />
                                                    </div>
                                                
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <a className="carousel-control-prev position-absolute top-50 start-0 translate-middle-y z-100"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="prev"
                    >
                      <span className="carousel-control-prev-icon bg-black rounded-circle" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next position-absolute top-50 end-0 translate-middle-y z-100"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="next"
                    >
                      <span className="carousel-control-next-icon bg-black rounded-circle" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
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
      


    // return(
    //     <>
    //         <div className="container mt-5">
    //             <div className="row">
    //                 <div className="col-6">
    //                     <img className="img-fluid" src={product.imageUrl} alt={product.title} />
    //                 </div>
    //                 <div className="col-6">
    //                     <div className="d-flex align-items-center gap-2">
    //                         <h2>{product.title}</h2>
    //                         <span className="badge text-bg-success">{product.category}</span>
    //                     </div>
    //                     <p className="mb-3">{product.description}</p>
    //                     <p className="mb-3">{product.content}</p>
    //                     <h5 className="mb-3">NT$ {product.price}</h5>
    //                     <div className="input-group align-items-center w-75">
    //                         <select
    //                         value={qtySelect}
    //                         onChange={(e) => setQtySelect(e.target.value)}
    //                         id="qtySelect"
    //                         className="form-select"
    //                         >
    //                         {Array.from({ length: 10 }).map((_, index) => (
    //                             <option key={index} value={index + 1}>
    //                             {index + 1}
    //                             </option>
    //                         ))}
    //                         </select>
    //                         <button onClick={()=>{addCartItem(product_id,qtySelect)}} type="button" className="btn btn-primary d-flex align-items-center gap-2" disabled={isLoading}>
    //                             加入購物車
    //                             {
    //                             isLoading && (<ReactLoading type={"spin"} color={"#000"} height={"1.5rem"} width={"1.5rem"}/>)
    //                             }
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
            
    //         {isScreenLoading && 
    //             (
    //             <div  className="d-flex justify-content-center align-items-center" 
    //                     style={{ position: "fixed", inset: 0, backgroundColor: "rgba(255,255,255,0.3)", zIndex: 999,}}
    //             >
    //                 <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
    //             </div>
    //             )
    //         }
    //     </>
    // )
}

export default ProductDetailPage;