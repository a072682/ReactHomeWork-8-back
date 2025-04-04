import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getCartSlice, getCouponsSlice, getSelectedPaymentData, useCouponsSlice } from "../../slice/productsSlice";
import { pushMessage } from "../../slice/toastSlice";
import Toast from "../../components/common/Toast";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


export default function CheckoutPaymentPage() {


    //抓取遠端資料前置
        const dispatch = useDispatch();

    //獲取原始優惠券資料
        const coupons = useSelector((state)=>{
          return(
            state.products.CouponsData
          )
        });

    //獲取購物車資料
    const cart = useSelector((state)=>{
      return(
        state.products.CartData
      )
    });

    //獲取優惠券使用狀態
    const couponState = useSelector((state)=>{
      return(
        state.products.CouponsSuccess
      )
    });

    //獲取優惠券訊息
    const couponMessage = useSelector((state)=>{
      return(
        state.products.CouponsMessage
      )
    });


  useEffect(() => {
        dispatch(getCartSlice());
        dispatch(getCouponsSlice());
      }, []);



    //優惠券狀態
    const [couponsSelect,setCouponsSelect]=useState("");

    //
    const [couponsCode,setCouponsCode]=useState("");

    //選擇優惠券
    const handleCouponsChange = (event,key) =>{
      setCouponsSelect(event.target.value);
      setCouponsCode(key);
      console.log("位置:",event.target.value);
    }

    //使用優惠券
      const useCoupons = (mode)=>{
          dispatch(useCouponsSlice(couponsSelect));
          if(mode === "初次使用"){
            dispatch(
              pushMessage({
                text: "成功使用優惠券",
                status: "success",
              })
            );
          }else if(mode === "重複使用"){
            dispatch(
              pushMessage({
                text: "優惠券效果套用中",
                status: "success",
              })
            );
          }
          
      }



    useEffect(()=>{
      console.log("目前優惠券編號:",couponsCode);
    },[couponsCode])

    

   

    // 2️⃣ 處理選擇付款方式的變化
    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
        dispatch(getSelectedPaymentData(event.target.value));
    };
    //付款方式狀態
    const [selectedPayment, setSelectedPayment] = useState("");
    // 狀態: 存放信用卡號碼
    const [creditCardNumber, setCreditCardNumber] = useState("");

    const handleSelectedPaymentDataUp = ()=>{

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
                  <span className="text-nowrap">Lorem ipsum</span>
                </li>
                <li className="me-md-6 me-3 position-relative custom-step-line">
                  <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">Lorem ipsum</span>
                </li>
                <li>
                  <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                  <span className="text-nowrap">Lorem ipsum</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h3 className="fw-bold mb-4 pt-3">選擇付款方式</h3>
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
                    <td className="text-end border-0 px-0 pt-0 pb-4">{selectedPayment}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">Total</p>
                <p className="mb-0 h4 fw-bold">NT${Math.round(cart.final_total)}</p>
              </div>
            </div>
          </div>


          <div className="col-md-6">

          <h3>選擇付款方式</h3>

                <div className="card rounded-0">
                  <div
                    className="card-header bg-white border-0 py-3"
                    id="heading1"
                  >
                    <input  id="pay01" 
                            type="radio" 
                            name="payment" 
                            value="現金支付" 
                            checked={selectedPayment === "現金支付"} 
                            onChange={handlePaymentChange}/>
                    <label htmlFor="pay01" className="mb-0 position-relative custom-checkout-label">
                        現金支付
                    </label>
                  </div>
                </div>

                
                <div className="card rounded-0">
                  <div
                    className="card-header bg-white border-0 py-3"
                    id="heading2"
                  >
                    <input
                      id="pay02"
                      type="radio"
                      name="payment"
                      value="Apple Pay"
                      checked={selectedPayment === "Apple Pay"}
                      onChange={handlePaymentChange}
                      data-bs-toggle="collapse"
                      data-bs-target="#creditCardInputTest"
                      aria-expanded={selectedPayment === "Apple Pay"}
                      aria-controls="creditCardInputTest"
                    />
                    <label htmlFor="pay02" className="mb-0 position-relative custom-checkout-label">
                        Apple Pay
                    </label>
                  </div>
                </div>

                <Collapse in={selectedPayment === "Apple Pay"}>
                  <div id="creditCardInputTest" className="card card-body mt-2 custom-collapse">
                    <label htmlFor="creditCardNumber" className="form-label">
                      信用卡號碼
                    </label>
                    <input
                      type="text"
                      id="creditCardNumber"
                      name="creditCardNumber"
                      className="form-control"
                      value={creditCardNumber}
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                      placeholder="請輸入信用卡號"
                    />
                  </div>
                </Collapse>

                <div className="card rounded-0">
                  <div
                    className="card-header bg-white border-0 py-3"
                    id="heading3"
                  >
                    <input  id="pay03" 
                            type="radio" 
                            name="payment" 
                            value="LINE Pay" 
                            checked={selectedPayment === "LINE Pay"} 
                            onChange={handlePaymentChange}/>
                    <label htmlFor="pay03" className="mb-0 position-relative custom-checkout-label">
                        LINE Pay
                    </label>
                  </div>
                </div>
            </div>

          <div className="col-md-10">
            <Dropdown>
                <h3 className="fw-bold text-black mb-4 pt-3">選擇優惠券</h3>
                <Dropdown.Toggle id="dropdown-custom-components" className="custom-dropdown-toggle p-0 m-0">
                  <input type="text" className="py-1 px-2 m-0 " value={couponsCode} />
                </Dropdown.Toggle>
                  {
                    couponState?(
                      <>
                      <button onClick={()=>{useCoupons("重複使用")}} className="btn btn-dark ms-2" type="button">
                        使用優惠券
                      </button>
                      <div className="text-success mt-2">{couponMessage}</div>
                      </>
                    )
                    :
                    (
                      <button onClick={()=>{useCoupons("初次使用")}} className="btn btn-dark ms-2" type="button">使用優惠券</button>
                    )
                  }
                
                <Dropdown.Menu className="custom-dropdown-menu">
                    {
                      coupons?.map((item,index)=>{
                          return(
                            item.is_enabled === 1?
                            (
                              
                                  <div key={item.id} className="card rounded-0">
                                    <div
                                      className="card-header bg-white border-0 py-3"
                                      id="heading3"
                                    >
                                      <input  id={`coupons${index + 1}`} 
                                              type="radio" 
                                              name="coupons" 
                                              value={item.code} 
                                              checked={couponsSelect === item.code} 
                                              onChange={(event)=>{handleCouponsChange(event,item.title);}}/>
                                      <label htmlFor={`coupons${index + 1}`}  className="mb-0 position-relative custom-checkout-label">
                                          {item.title}
                                      </label>
                                    </div>
                                  </div>
                              
                              
                            )
                            :
                            ("")
                          )
                      })
                    }
                </Dropdown.Menu>
            </Dropdown>
            
            


              
          </div>


            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link to="/cart" className="text-dark mt-md-0 mt-3">
                <i className="fas fa-chevron-left me-2"></i> 上一步
              </Link>
              <Link
                to="/checkout-form"
                className="btn btn-dark py-3 px-7"
              >
                填寫個人訊息
              </Link>
            </div>
          </div>

          
         <Toast />
        </div>
    );
  }
  