import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkOutSlice, getCartSlice, getSelectedPaymentData } from "../../slice/productsSlice";
import Toast from "../../components/common/Toast";
import { pushMessage } from "../../slice/toastSlice";




const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutFormPage() {

    //網頁移動前置
    const navigate = useNavigate();

    //抓取遠端資料前置
    const dispatch = useDispatch();

    //獲取購物車資料
    const cart = useSelector((state)=>{
      return(
        state.products.CartData
      )
    });

    //獲取結帳狀態
    const CheckOutState = useSelector((state)=>{
      return(
        state.products.CheckOutState
      )
    });

    //獲取付款資料狀態
    const selectedPaymentData = useSelector((state)=>{
      return(
        state.products.SelectedPaymentData
      )
    });

    useEffect(()=>{
        dispatch(getCartSlice());
        console.log("初始結帳狀態:",CheckOutState);
        console.log("初始付款資料狀態:",selectedPaymentData);
    },[])

    useEffect(()=>{
      
      console.log("更新結帳狀態:",CheckOutState);
      
    },[CheckOutState])




    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm();
    
    const onSubmit = handleSubmit((data)=>{
      console.log(data);
      const { message, ...user} = data;
      const userInfo = {
        data:{
          user,
          message
        }
      }
      checkOut(userInfo);
    })
    
    const checkOut = async(data)=>{
        try{
              await dispatch(checkOutSlice(data));
              dispatch(
                pushMessage({
                  text: "結帳成功",
                  status: "success",
                })
              );
              reset();
              navigate("/checkout-success");
            }catch(error){
                console.log("結帳失敗", error);
                dispatch(
                      pushMessage({
                        text: "結帳失敗",
                        status: "failed",
                      })
                    );
                reset();
            }
      }
    



    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <nav className="navbar navbar-expand-lg navbar-light px-0">
              <a className="navbar-brand" href="./index.html">
                Navbar
              </a>
              <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                <li className="me-md-6 me-3 position-relative custom-step-line">
                  <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">購物車</span>
                </li>
                <li className="me-md-6 me-3 position-relative custom-step-line">
                  <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">確認訂單</span>
                </li>
                <li>
                  <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">填寫結帳資訊</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h3 className="fw-bold mb-4 pt-3">填寫結帳資訊</h3>
          </div>
        </div>
        <div className="row flex-row-reverse justify-content-center pb-5">
          <div className="col-md-4">
            <div className="border p-4 mb-4">
                {
                    cart.carts?.map((item,index)=>{
                        return(
                            <div key={index} className="d-flex">
                                <img
                                src={item.product.imageUrl}
                                alt=""
                                className="me-2 ImgSet"
                                style={{ width: "48px", height: "48px", objectFit: "cover" }}
                                />
                                <div className="w-100">
                                <div className="d-flex justify-content-between">
                                    <p className="mb-0 fw-bold">{item.product.title}</p>
                                    <p className="mb-0">NT${item.final_total}</p>
                                </div>
                                <p className="mb-0 fw-bold">數量:{item.qty}</p>
                                </div>
                            </div>
                        )
                    })
                }

              <table className="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-4 font-weight-normal"
                    >
                      Subtotal
                    </th>
                    <td className="text-end border-0 px-0 pt-4">NT${cart.final_total}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                    >
                      Payment
                    </th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">{selectedPaymentData}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">Total</p>
                <p className="mb-0 h4 fw-bold">NT${cart.final_total}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                  <p>Contact information</p>
                  <div className="mb-0">

                    <label for="ContactMail" className="text-muted mb-0">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id="ContactMail"
                      aria-describedby="emailHelp"
                      placeholder="example@gmail.com"
                        {...register("email", {
                          required: "電子郵件為必填欄位",
                          pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "電子郵件格式錯誤",
                          },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}

                  </div>
                  <p className="mt-4">Shipping address</p>

                  <div className="mb-2">

                    <label for="ContactAddress" className="text-muted mb-0">
                      Address
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      id="ContactAddress"
                      placeholder=""
                      {...register("address", { 
                        required: "地址為必填欄位" })}
                    />
                    {errors.address && (
                        <div className="invalid-feedback">{errors.address.message}</div>
                    )}

                  </div>

                  <div className="mb-2">

                    <label for="ContactName" className="text-muted mb-0">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      id="ContactName"
                      placeholder="Carmen A. Rose"
                      {...register("name", { 
                        required: "姓名為必填欄位" })}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">{errors.name.message}</div>
                    )}

                  </div>
                  <div className="mb-2">

                    <label for="ContactPhone" className="text-muted mb-0">
                      Phone
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                      id="ContactPhone"
                      placeholder="Password"
                        {...register("tel", {
                        required: "電話為必填欄位",
                        pattern: {
                            value: /^(0[2-8]\d{7}|09\d{8})$/,
                            message: "電話格式錯誤",
                        },
                      })}
                    />
                    {errors.tel && (
                        <div className="invalid-feedback">{errors.tel.message}</div>
                    )}


                  </div>
                  <div className="mb-2">

                    <label for="ContactMessage" className="text-muted mb-0">
                      Message
                    </label>
                    <textarea
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      rows="3"
                      id="ContactMessage"
                      placeholder="message ... "
                      {...register("message", { required: "訊息為必填欄位" })}
                    ></textarea>
                    {errors.message && (
                        <div className="invalid-feedback">{errors.message.message}</div>
                    )}

                  </div>
                  <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                    <Link to="/cart" className="text-dark mt-md-0 mt-3">
                      <i className="fas fa-chevron-left me-2"></i> 上一步
                    </Link>
                    <button type="submit" className="btn btn-dark text-white py-3 px-7">
                      付款
                    </button>
                  </div>
            </form>
            
          </div>
        </div>
        <Toast />
      </div>
    );
  }
  