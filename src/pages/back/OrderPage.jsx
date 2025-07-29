import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import OrderUserModal from "../../components/common/back/OrderUserModal";
import OrderProductModal from "../../components/common/back/OrderProductModal";
import { useDispatch, useSelector } from "react-redux";
import { changeBackOrderData, delBackOrderData, getBackOrderDataSlice } from "../../slice/backProductsSlice";
import Toast from "../../components/common/Toast";
import ReactPagination from "../../components/common/ReactPagination";
import { checkLogin } from "../../slice/loginSlice";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function OrderPage(){

    //抓取遠端資料前置
    const dispatch = useDispatch();

    //取得後端登入狀態資料
    const loginState = useSelector((state)=>{
        return(
        state.login.isAuthenticated
        )
    });

    useEffect(()=>{
        dispatch(checkLogin());
    },[])

    useEffect(()=>{
        if(loginState){
            console.log("登入狀態:",loginState);
        }
    },[loginState])

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

        useEffect(()=>{
            if(orderData){
                console.log("登入狀態:",loginState);
            }
        },[orderData])
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

//處理頁碼狀態
    const [currentPage, setCurrentPage] = useState(1);//頁碼狀態
    // const totalItems = allThemeData?.length;
    const itemsPerPage = 8;//上限
    const totalPages = orderData && orderData.length > 0 ? Math.ceil(orderData.length / itemsPerPage): 1;//Math.ceil無條件進位
    //總頁數

    const indexOfLastItem = currentPage * itemsPerPage;//算出當前頁面的資料顯示範圍 
    // 例如:currentPage(第幾頁) = 1，itemsPerPage = 8，那 indexOfLastItem = 1 * 8 = 8
    //「第1頁」的資料範圍會是 第0筆~第7筆（共8筆）

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //取得索引的前部分數字
    //indexOfLastItem = 8 itemsPerPage = 8 所以indexOfFirstItem = 8 - 8 = 0
    const newOrderData = orderData?.slice(indexOfFirstItem, indexOfLastItem);
    // console.log("過濾後的資料02",newProductsData);
    //因此allThemeData.slice(0, 8) 取出0~7筆資料顯示
    console.log("產品資料",newOrderData);

    // 切換頁數時執行的動作
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // console.log("切換到第", newPage, "頁");
        // 可以在這裡載入對應頁碼的資料
    };
//處理頁碼狀態

    return(
        <>
            {/* <div className="container-fluid"> */}
                <div className={`container`}>
                    <div className="mt-3">
                        <div className="d-flex align-items-center mb-12 gap-12">
                            <h3 className="mt-3 mb-12">訂單頁面</h3>
                            <button onClick={()=>{dispatch(getBackOrderDataSlice());}} type="button" className="btn btn-dark">手動刷新</button>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="order-table">
                                    
                                    <div className="w-100 d-flex justify-content-center py-12">
                                        <div scope="col" className="w-100 border-0 text-center">
                                        訂單建立時間
                                        </div>
                                        <div scope="col" className="w-100 border-0 text-center">
                                        訂購人
                                        </div>
                                        <div scope="col" className="w-100 border-0 text-center">
                                        訂單總金額
                                        </div>
                                        <div scope="col" className="w-100 border-0 text-center">
                                        付款狀態
                                        </div>
                                        <div scope="col" className="w-100 border-0 text-center">
                                        訂購商品
                                        </div>
                                        <div scope="col" className="w-100 border-0 text-center">
                                        刪除訂單
                                        </div>
                                    </div>
                                    
                                    <div className="table-body mb-24">
                                        {
                                            loginState?
                                            (
                                                orderData?.map((item)=>{
                                                    return(
                                                        <div key={item.id} className="border-bottom border-top py-12 d-flex justify-content-center align-items-center">
                                                            <div
                                                            scope="row"
                                                            className="w-100 border-0 px-0 font-weight-normal text-center"
                                                            >
                                                                <p className="mb-0 fw-bold ms-3 d-inline-block">
                                                                    {new Date(item.create_at * 1000).toLocaleDateString("zh-TW")}
                                                                </p>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <button onClick={()=>{handleOrderUserModal?.show(); setHandleOrderUserData(item.user);getOrderIn(item)}} className="btn btn-outline-dark border-0 p-0" type="button"><p className="mb-0 ms-auto">{item.user?.name}</p></button>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <p className="mb-0 ms-auto">{item.total}</p>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <p className="mb-0 ms-auto">{item.paid?("已付款"):("未付款")}</p>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <button
                                                                    onClick={()=>{handleOrderProductModal?.show();getOrderIn(item);setHandleOrderUserData(item.user);}}
                                                                    className="btn btn-outline-dark border-0 p-0"
                                                                    type="button"
                                                                >
                                                                    查看商品訂單詳情
                                                                </button>
                                                            </div>
                                                            <div className="w-100 border-0 align-middle text-center">
                                                                <button
                                                                    onClick={()=>{delOrderData(item)}}
                                                                    className="btn btn-outline-dark border-0 py-2"
                                                                    type="button"
                                                                >
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                null
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    loginState?
                                    (
                                        null
                                    )
                                    :
                                    (
                                        <div className="text-center py-24">
                                            <h2 className="m-0">請登入後台使用者帳號</h2>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <nav className="d-flex justify-content-center">
                            <ReactPagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </nav>
                    </div>
                </div>
            {/* </div> */}
            <OrderUserModal setHandleOrderUserModal={setHandleOrderUserModal} 
            handleOrderUserData={handleOrderUserData} setHandleOrderUserData={setHandleOrderUserData} handleChangeOrderData={handleChangeOrderData} orderIn={orderIn} />

            <OrderProductModal setHandleOrderProductModal={setHandleOrderProductModal} orderIn_Products={orderIn_Products} setOrderIn_Products={setOrderIn_Products} handleChangeOrderData={handleChangeOrderData} orderIn={orderIn}/>

            <Toast />
        </>
    )
}

export default OrderPage;