import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import OrderUserModal from "../../components/common/back/OrderUserModal";
import OrderProductModal from "../../components/common/back/OrderProductModal";
import { useDispatch, useSelector } from "react-redux";
import { changeBackOrderData, delBackOrderData, getBackOrderDataSlice } from "../../slice/backProductsSlice";
import Toast from "../../components/common/Toast";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function OrderPage(){

    //抓取遠端資料前置
    const dispatch = useDispatch();

    //獲取遠端訂單資料
    const orderData = useSelector((state)=>{
        return(
          state.backProducts.backOrderData
        )
    });

    //訂單資料
        useEffect(()=>{
            dispatch(getBackOrderDataSlice());
            console.log("初始訂單資料:",orderData);
        },[])
    //訂單資料

    //訂購人頁面開關
        const[handleOrderUserModal,setHandleOrderUserModal] = useState(null);
    //訂購人頁面開關

    //訂購產品頁面開關
        const [handleOrderProductModal,setHandleOrderProductModal] = useState(null);
    //訂購產品頁面開關

    //訂購人頁面資料
        const[handleOrderUserData,setHandleOrderUserData] = useState({});
    //訂購人頁面資料

    //修改訂單
        //單一訂單全部資料
            const[orderIn,setOrderIn]=useState({});
        //單一訂單全部資料
        //單一訂單產品資料
            const[orderIn_Products,setOrderIn_Products]=useState([]);
        //單一訂單產品資料

        //處理後的訂單資料

            const getOrderIn =(item)=>{
                console.log("抓到的id",item.id);
                setOrderIn(item);
                setOrderIn_Products(Object.values(item.products));
                console.log("抓到的產品資訊",Object.values(item.products));
            }

            const handleNewChangeOrderData = () =>{
                const total = orderIn_Products.reduce((sum, product) => {
                    return (
                        sum + product.final_total
                    )
                  }, 0);
                //將orderIn_Products矩陣內的final_total抓出來加總
                const newOrderData = {
                    ...orderIn,
                    products:[...orderIn_Products],
                    user:{...handleOrderUserData},
                    total:total,
                };
                console.log("回報資料:",newOrderData)
                return(newOrderData);
            }
            
            const handleChangeOrderData = async()=>{
                handleNewChangeOrderData();
                const newData = handleNewChangeOrderData();

                await dispatch(changeBackOrderData(newData));

                handleOrderUserModal?.hide();
                handleOrderProductModal?.hide();
            }
        //處理後的訂單資料

        //
        useEffect(()=>{
            console.log("所有產品資訊狀態:",orderData);
            console.log("單一產品資訊狀態:",orderIn);
            console.log("產品資訊狀態:",orderIn_Products);
            console.log("訂購人資訊狀態:",handleOrderUserData);
        },[orderData,orderIn,orderIn_Products,handleOrderUserData]);
        //

        //刪除訂單資料
            const delOrderData = (item)=>{
                dispatch(delBackOrderData(item));
            }
        //刪除訂單資料

    return(
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="mt-3">
                        <h3 className="mt-3 mb-4">訂單頁面</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border-0">
                                            訂單建立時間
                                            </th>
                                            <th scope="col" className="border-0 ps-0">
                                            訂購人
                                            </th>
                                            <th scope="col" className="border-0">
                                            訂單總金額
                                            </th>
                                            <th scope="col" className="border-0">
                                            付款狀態
                                            </th>
                                            <th scope="col" className="border-0 ps-4">
                                            訂購商品
                                            </th>
                                            <th scope="col" className="border-0">
                                            刪除訂單
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderData?.map((item)=>{
                                                return(
                                                    <tr key={item.id} className="border-bottom border-top">
                                                        <th
                                                        scope="row"
                                                        className="border-0 px-0 font-weight-normal py-4"
                                                        >
                                                            <p className="mb-0 fw-bold ms-3 d-inline-block">
                                                                {new Date(item.create_at * 1000).toLocaleDateString("zh-TW")}
                                                            </p>
                                                        </th>
                                                        <td className="border-0 align-middle">
                                                            <button onClick={()=>{handleOrderUserModal?.show(); setHandleOrderUserData(item.user);getOrderIn(item)}} className="btn btn-outline-dark border-0 py-2" type="button"><p className="mb-0 ms-auto">{item.user?.name}</p></button>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <p className="mb-0 ms-auto">{item.total}</p>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <p className="mb-0 ms-auto">{item.paid?("已付款"):("未付款")}</p>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <button
                                                                onClick={()=>{handleOrderProductModal?.show();getOrderIn(item);setHandleOrderUserData(item.user);}}
                                                                className="btn btn-outline-dark border-0"
                                                                type="button"
                                                            >
                                                                查看商品訂單詳情
                                                            </button>
                                                        </td>
                                                        <td className="border-0 align-middle">
                                                            <button
                                                                onClick={()=>{delOrderData(item)}}
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
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {
                                    // Array.from({length: pagination?.total_pages}).map((_,index)=>
                                    // {
                                    //     return(
                                    //         <li key={index} className={`page-item ${pagination?.current_page === index + 1 && "active"}`}>
                                    //         <a onClick={(event)=>{event.preventDefault(); dispatch(getOriginalData(index + 1));}} className="page-link" href="#">
                                    //             {index + 1}
                                    //         </a>
                                    //         </li>)
                                    // })
                                }
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <OrderUserModal setHandleOrderUserModal={setHandleOrderUserModal} 
            handleOrderUserData={handleOrderUserData} setHandleOrderUserData={setHandleOrderUserData} handleChangeOrderData={handleChangeOrderData} orderIn={orderIn} />

            <OrderProductModal setHandleOrderProductModal={setHandleOrderProductModal} orderIn_Products={orderIn_Products} setOrderIn_Products={setOrderIn_Products} handleChangeOrderData={handleChangeOrderData} orderIn={orderIn}/>

            <Toast />
        </>
    )
}

export default OrderPage;