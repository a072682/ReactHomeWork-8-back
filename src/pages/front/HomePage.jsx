import axios from 'axios';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from "react-redux";
import { getOriginalAllData } from '../../slice/productsSlice';
import { Link } from 'react-router-dom';



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;



export default function HomePage() {

    //提取中央資料前置作業
    const dispatch = useDispatch();
    //提取中央資料前置作業

    //提取中央產品資料
    const originalAProductAllData = useSelector((state)=>{
      return(
        state.products.productsAllData
      )
    });

    //文章資料
    const [originalArticlesData,setOriginalArticlesData]=useState([]);
    const getArticlesData = async()=>{
        try{
            const getArticlesDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/articles`);
            console.log("取得文章資料成功",getArticlesDataRef.data.articles);
            setOriginalArticlesData(getArticlesDataRef.data.articles);
            
        }catch(error){
            console.log("取得文章資料失敗",error);
        }
    }
    useEffect(()=>{
        getArticlesData();
        dispatch(getOriginalAllData());
        console.log("產品資料:",originalAProductAllData);
    },[])
    //


    return (
      <div className="container-fluid">
        {/* <div
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
            zIndex: -1,
          }}
        ></div> */}
        <div className="HomePageMain1BgSet container d-flex flex-column position-relative">
          <div className="row justify-content-center my-auto">
            <div className="col text-center">
                <Swiper
                modules={[Navigation, Pagination, Autoplay]}// 註冊 Swiper 模組
                // Autoplay
                // navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
                //啟用左右箭頭
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                    992: { slidesPerView: 2 }, // 電腦顯示 1 張
                  }}
                pagination={{ clickable: true }}
                // 啟用分頁點（可點擊）
                autoplay={{ delay: 2500 }}
                // 自動播放，每 2 秒切換
                loop={true} // 循環播放
                // centeredSlides={true}
                className="mySwiper rounded-3"
                >
                {
                    originalArticlesData?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link className='text-decoration-none' to={`/FrontArticlePage/${item.id}`}>
                              <img src={item.image} alt={item.title} className="HomePageMain1ImgSet rounded-3" />
                            </Link>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
                {/* <button className="custom-prev position-absolute top-50 start-0 translate-middle-y HomePageMain1NavigationSet">⬅️</button>
                <button className="custom-next position-absolute top-50 end-0 translate-middle-y HomePageMain1NavigationSet">➡️</button> */}
            </div>
          </div>
        </div>
        <div className="main2 container">
          <div className="row mt-5">
            <div className="col-12 ">
              <div className='row'>
                <h3>最新商品</h3>
                {
                  originalAProductAllData?.slice(9, 12).map((item)=>(
                    <div className='col-12 col-md-4'>
                      <div className="card border-0 mb-4">
                        <Link to={`/products/${item.id}`}>
                          <img
                            src={item.imageUrl}
                            className="card-img-top rounded-0 HomePageMain2ImgSet"
                            alt={item.title}
                          />
                        </Link>
                        <div className="card-body text-center">
                          <Link to={`/products/${item.id}`} className='text-decoration-none'><h4>{item.title}</h4></Link>
                          <div className="d-flex justify-content-between">
                            <p className="card-text text-muted mb-0">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
                <Link to="/products"><button className=' border-0 d-block mx-auto btn btn-dark'>查看更多商品</button></Link>
              </div>
            </div>
            
          </div>
        </div>
        <div className="main3 bg-dark mt-7 text-white">
          <div className="container">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row justify-content-center py-3">
                    <div className="col-md-6 text-center">
                      <h3>關於我們</h3>
                        <img src="/assets/images/logo.png" className='bg-black rounded-3' alt="logo" />
                      <p className="mt-5 mb-3 fs-5">
                        Come & Buy 是一家專注於設計和製造高品質收藏品和玩具的公司。我們的產品融合了創新、精緻的工藝與藝術品的設計理念，為全球的收藏家和愛好者提供了多樣化的選擇。無論是動漫、電影、遊戲或是藝術人物，我們的產品均以高度的細節和精確度，呈現出每個角色的獨特魅力。
                      </p>
                      <p>
                        <small>Come_and_Buy © 2021, In Here. All Rights Reserved. 隱私權政策</small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row justify-content-center py-7">
                    <div className="col-md-6 text-center">
                      <h3>Lorem ipsum.</h3>
                      <p className="my-5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat.”
                      </p>
                      <p>
                        <small>—Lorem ipsum dolor sit amet.—</small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row justify-content-center py-7">
                    <div className="col-md-6 text-center">
                      <h3>Lorem ipsum.</h3>
                      <p className="my-5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat.”
                      </p>
                      <p>
                        <small>—Lorem ipsum dolor sit amet.—</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div className="main4 container my-3">
        <h3 className='mb-3'>最新文章</h3>
        <Link className='text-decoration-none' to={`/FrontArticlePage/${originalArticlesData[1]?.id}`}>
          <div className="row">
              <div className="col-md-6">
                  <img
                    src={originalArticlesData[1]?.image}
                    alt={originalArticlesData[1]?.title}
                    className="img-fluid rounded-3"
                  />
              </div>
              <div className="col-md-6 m-auto text-center">
                  <h4 className="mt-4">{originalArticlesData[1]?.title}</h4>
                  <p className="text-muted">
                    {originalArticlesData[1]?.description}
                  </p>
              </div>
          </div>
        </Link>
          
          <Link className='text-decoration-none' to={`/FrontArticlePage/${originalArticlesData[2]?.id}`}>
              <div className="row flex-row-reverse justify-content-between mt-4">
                  <div className="col-md-6">
                    <img
                      src={originalArticlesData[2]?.image}
                      alt={originalArticlesData[2]?.title}
                      className="img-fluid rounded-3"
                    />
                  </div>
                  <div className="col-md-6 m-auto text-center">
                    <h4 className="mt-4">{originalArticlesData[2]?.title}</h4>
                    <p className="text-muted">
                      {originalArticlesData[2]?.description}
                    </p>
                  </div>
              </div>
          </Link>
          <div className='row'>
            <div className='col'>
              <Link to="FrontArticlePage"><button className=' border-0 d-block mx-auto mt-5 btn btn-dark'>查看更多文章</button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  