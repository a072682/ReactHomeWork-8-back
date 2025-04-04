import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import "swiper/css";// 核心 CSS
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartSlice, getCouponsSlice, removeCartItemSlice, removeCartSlice, updateCartItemSlice } from "../../slice/productsSlice";
import Toast from "../../components/common/Toast";
import { pushMessage } from "../../slice/toastSlice";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function CartPage(){

    
    // const [isScreenLoading,setIsScreenLoading] = useState(false);

    //獲取遠端讀取狀態
    const isScreenLoading = useSelector((state)=>{
        return(
          state.products.IsScreenLoading
        )
    });
  
    const swiperRef = useRef(null);

    //抓取遠端資料前置
    const dispatch = useDispatch();

    //移動網頁前置
    const navigate = useNavigate();

    //獲取購物車資料
    const cart = useSelector((state)=>{
        return(
          state.products.CartData
        )
    });

    

    useEffect(() => {
      dispatch(getCartSlice());
      dispatch(getCouponsSlice());
    }, []);


    const removeCartItem = (cartItem_id)=>{
        console.log("id:",cartItem_id);
        dispatch(removeCartItemSlice(cartItem_id));
      }
    
    const removeCart = ()=>{
      console.log("購物車清除:");
      dispatch(removeCartSlice());
      dispatch(
                pushMessage({
                  text: "清除成功",
                  status: "success",
                })
              );
    }

    // const test2 = ()=>{
    //   dispatch(
    //     pushMessage({
    //       text: "測試2",
    //       status: "failed",
    //     })
    //   );
    // }
    
    const updateCartItem = async(cartItem_id,product_id,qty)=>{
      console.log("購物車更新",cartItem_id,product_id,qty)
      dispatch(updateCartItemSlice({cartItem_id,product_id,qty}));
    }

    
    return (
    
      <div className="container-fluid">
        <div className="container">
          <div className="mt-3">
            <h3 className="mt-3 mb-4">購物車</h3>
            <div className="row">
              <div className="col-md-8">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 ps-0">
                        產品名稱
                      </th>
                      <th scope="col" className="border-0">
                        產品數量
                      </th>
                      <th scope="col" className="border-0">
                        產品價格
                      </th>
                      <th scope="col" className="border-0">
                        刪除產品
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart.carts?.map((cartItem)=>{
                        return(
                          <tr key={cartItem.id} className="border-bottom border-top">
                            <th
                              scope="row"
                              className="border-0 px-0 font-weight-normal py-4"
                            >
                              <img
                                src={cartItem.product.imageUrl}
                                alt=""
                                style={{
                                  width: "72px",
                                  height: "72px",
                                  objectFit: "cover",
                                }}
                              />
                              <p className="mb-0 fw-bold ms-3 d-inline-block">
                                {cartItem.product.title}
                              </p>
                            </th>
                            <td
                              className="border-0 align-middle"
                              style={{ maxWidth: "160px" }}
                            >
                              <div className="input-group pe-5">
                                <div className="input-group-prepend">
                                  <button
                                    onClick={()=>{updateCartItem(cartItem.id,cartItem.product.id,cartItem.qty - 1)}}
                                    disabled={cartItem.qty === 0}
                                    className="btn btn-outline-dark border-0 py-2"
                                    type="button"
                                    id="button-addon1"
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  className="form-control border-0 text-center my-auto shadow-none"
                                  placeholder=""
                                  aria-label="Example text with button addon"
                                  aria-describedby="button-addon1"
                                  value={cartItem.qty}
                                />
                                <div className="input-group-append">
                                  <button
                                    onClick={()=>{updateCartItem(cartItem.id,cartItem.product.id,cartItem.qty + 1)}}
                                    className="btn btn-outline-dark border-0 py-2"
                                    type="button"
                                    id="button-addon2"
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="border-0 align-middle">
                              <p className="mb-0 ms-auto">NT${cartItem.final_total}</p>
                            </td>
                            <td className="border-0 align-middle">
                              <button
                                onClick={()=>{removeCartItem(cartItem.id);}}
                                className="btn btn-outline-dark border-0 py-2 d-block mx-auto"
                                type="button"
                                id="button-addon2"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    }
                    
                    
                  </tbody>
                  {
                    cart.carts?.length >= 1 ?
                    (
                      <tr>
                        <th></th>
                        <td></td>
                        <td></td>
                        <td>
                          <button onClick={()=>{removeCart()}} type="button" className="btn btn-dark mt-4">清除購物車</button>
                        </td>
                      </tr>  
                    )
                    :
                    ("") 
                  }
                      
                </table>
              </div>
              <div className="col-md-4">
                <div className="border p-4 mb-4">
                  <h4 className="fw-bold mb-4">訂單資訊</h4>
                  <table className="table text-muted border-bottom">
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="border-0 px-0 pt-4 font-weight-normal"
                        >
                          小計
                        </th>
                        <td className="text-end border-0 px-0 pt-4">NT${cart.total}</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                        >
                          付款方式
                        </th>
                        <td className="text-end border-0 px-0 pt-0 pb-4">
                          ApplePay
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between mt-4">
                    <p className="mb-0 h4 fw-bold">總計</p>
                    <p className="mb-0 h4 fw-bold">NT${cart.final_total}</p>
                  </div>
                  <Link to="/checkout-payment" className="btn btn-dark w-100 mt-4">
                    結帳
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-5">
              <h3 className="fw-bold">Lorem ipsum dolor sit amet</h3>
              
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                      992: { slidesPerView: 3 }, // 電腦顯示 1 張
                    }}
                    loop={true}
                    autoplay={{ delay: 2500 }}
                    className="mySwiper"
                    >
                    {
                        cart.carts?.map((item,index)=>{
                            return(
                                <SwiperSlide>
                                    
                                                <div key={index} className="card border-0 mb-4 position-relative">
                                                    <img
                                                      src={item.product.imageUrl}
                                                      className="card-img-top rounded-3 ProductDetailPageImgSet"
                                                      alt="..."
                                                    />
                                                    <a href="#" className="text-dark"></a>
                                                    <div className="card-body p-0">
                                                      <h4 className="mb-0 mt-3">
                                                        <a href="#">{item.product.title}</a>
                                                      </h4>
                                                      <p className="card-text mb-0">
                                                        NT${item.final_total}
                                                      </p>
                                                      <p className="text-muted mt-3"></p>
                                                    </div>
                                                </div>
                                            
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
          </div>
        </div>
        <button onClick={()=>{test2()}} type="button" className="btn btn-dark">測試</button>
        {isScreenLoading && 
            (
            <div  className="d-flex justify-content-center align-items-center" 
                    style={{ position: "fixed", inset: 0, backgroundColor: "rgba(255,255,255,0.3)", zIndex: 999,}}
            >
                <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
            </div>
            )
        }
        <Toast />
      </div>
      
      
    );
    


    // return(
    //     <>
    //     <div className="container">
    //         <div>
    //         {
    //             cart.carts?.length > 0 && 
    //             (
    //             <div>
    //                 <div className="text-end py-3">
    //                 <button onClick={removeCart} className="btn btn-outline-danger" type="button">
    //                     清空購物車
    //                 </button>
    //                 </div>
    
    //                 <table className="table align-middle">
    //                 <thead>
    //                     <tr>
    //                     <th></th>
    //                     <th>品名</th>
    //                     <th style={{ width: "150px" }}>數量/單位</th>
    //                     <th className="text-end">單價</th>
    //                     </tr>
    //                 </thead>
    
    //                 <tbody>
    //                     { cart.carts?.map((cartItem) => (
    //                         <tr key={cartItem.id}>
    //                         <td>
    //                             <button onClick={()=>{removeCartItem(cartItem.id)}} type="button" className="btn btn-outline-danger btn-sm">
    //                             x
    //                             </button>
    //                         </td>
    //                         <td>{cartItem.product.title}</td>
    //                         <td style={{ width: "150px" }}>
    //                             <div className="d-flex align-items-center">
    //                             <div className="btn-group me-2" role="group">
    //                                 <button
    //                                 onClick={()=>{updateCartItem(cartItem.id,cartItem.product.id,cartItem.qty - 1)}}
    //                                 disabled={cartItem.qty === 1}
    //                                 type="button"
    //                                 className="btn btn-outline-dark btn-sm"
    //                                 >
    //                                 -
    //                                 </button>
    //                                 <span
    //                                 className="btn border border-dark"
    //                                 style={{ width: "50px", cursor: "auto" }}
    //                                 >{cartItem.qty}</span>
    //                                 <button
    //                                 onClick={()=>{updateCartItem(cartItem.id,cartItem.product.id,cartItem.qty + 1)}}
    //                                 type="button"
    //                                 className="btn btn-outline-dark btn-sm"
    //                                 >
    //                                 +
    //                                 </button>
    //                             </div>
    //                             <span className="input-group-text bg-transparent border-0">
    //                                 {cartItem.product.unit}
    //                             </span>
    //                             </div>
    //                         </td>
    //                         <td className="text-end">{cartItem.product.price}</td>
    //                         </tr>
    //                     ))
    //                     }
    //                 </tbody>
    //                 <tfoot>
    //                     <tr>
    //                     <td colSpan="3" className="text-end">
    //                         總計：
    //                     </td>
    //                     <td className="text-end" style={{ width: "130px" }}>{cart.total}</td>
    //                     </tr>
    //                 </tfoot>
    //                 </table>
    //             </div>
    //             )
    //         }
    //         </div>
  
    //         <div className="my-5 row justify-content-center">
    //             <form onSubmit={onSubmit} className="col-md-6">
    //                 <div className="mb-3">
    //                 <label htmlFor="email" className="form-label">
    //                     Email
    //                 </label>
    //                 <input
    //                     {
    //                     ...register("email",{
    //                         required:"Email欄位必填",
    //                         pattern:{
    //                         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //                         message:"Email格式錯誤"
    //                         }
    //                     })
    //                     }
    //                     id="email"
    //                     type="email"
    //                     className={`form-control ${errors.email && "is-invalid"}`}
    //                     placeholder="請輸入 Email"
    //                 />
        
    //                 {errors.email && <p className="text-danger my-2">{errors.email.message}</p>}
    //                 </div>
        
    //                 <div className="mb-3">
    //                 <label htmlFor="name" className="form-label">
    //                     收件人姓名
    //                 </label>
    //                 <input
    //                     {...register("name",{
    //                     required:"姓名欄位必填"
    //                     })}
    //                     id="name"
    //                     className={`form-control ${errors.name && "is-invalid"}`}
    //                     placeholder="請輸入姓名"
    //                 />
        
    //                 {errors.name && <p className="text-danger my-2">{errors.name.message}</p>}
    //                 </div>
        
    //                 <div className="mb-3">
    //                 <label htmlFor="tel" className="form-label">
    //                     收件人電話
    //                 </label>
    //                 <input
    //                     {...register("tel",{
    //                     required:"電話欄位必填",
    //                     pattern:{
    //                         value: /^(0[2-8]\d{7}|09\d{8})$/,
    //                         message:"電話格式錯誤"
    //                     }
    //                     })}
    //                     id="tel"
    //                     type="text"
    //                     className={`form-control ${errors.tel && "is-invalid"}`}
    //                     placeholder="請輸入電話"
    //                 />
        
    //                 {errors.tel && <p className="text-danger my-2">{errors.tel.message}</p>}
    //                 </div>
        
    //                 <div className="mb-3">
    //                 <label htmlFor="address" className="form-label">
    //                     收件人地址
    //                 </label>
    //                 <input
    //                     {...register("address",{
    //                     required:"地址欄位必填"
    //                     })}
    //                     id="address"
    //                     type="text"
    //                     className={`form-control ${errors.address && "is-invalid"}`}
    //                     placeholder="請輸入地址"
    //                 />
    //                 {errors.address && <p className="text-danger my-2">{errors.address.message}</p>}
    //                 </div>
        
    //                 <div className="mb-3">
    //                 <label htmlFor="message" className="form-label">
    //                     留言
    //                 </label>
    //                 <textarea
    //                     {
    //                     ...register("message")
    //                     }
    //                     id="message"
    //                     className="form-control"
    //                     cols="30"
    //                     rows="10"
    //                 ></textarea>
    //                 </div>
    //                 <div className="text-end">
    //                 <button type="submit" className="btn btn-danger">
    //                     送出訂單
    //                 </button>
    //                 </div>
    //             </form>
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
    //     </div>
    //     </>
    // )
}
export default CartPage;