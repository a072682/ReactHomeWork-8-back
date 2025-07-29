import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { checkLogin, loginUser, tokenUpData } from "../../slice/loginSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function Login({setModalInstance,}){

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //取得登入狀態
    const loginState = useSelector((state)=>{
        return(
          state.login.isAuthenticated
        )
    })
    //取得登入狀態

    //控制Login視窗
    const loginUserModalRef = useRef(null);
    //控制Login視窗

    //控制式窗開啟和關閉(內部)
    const [loginUserModal,setLoginUserModal] = useState(null);
    //控制式窗開啟和關閉(內部)

    //控制式窗開啟和關閉(外部)
    useEffect(()=>{
        if (loginUserModalRef.current) {
            //如果loginUserModalRef式窗存在
            const instance = new Modal(loginUserModalRef.current,{
                backdrop:false
            });
            setLoginUserModal(instance);

            // ✅ 確保 Modal 初始化後，將 `show()` 和 `hide()` 提供給外部
            if (setModalInstance) {
                    setModalInstance(
                        {
                            show: () => instance.show(),
                            hide: () => instance.hide(),
                        }
                    );
            }
        }
    },[]);
    //控制式窗開啟和關閉(外部)

    //處理視窗開啟
        const btnByMoadlOpen = ()=>{
            loginUserModal.show();
        }
    //處理視窗開啟
    //處理視窗關閉
        const btnByMoadlClose = ()=>{
            loginUserModal?.hide();
        }
    //處理視窗關閉

    //帳號初始狀態
    const [account,setAccount]=useState({
        username:"",
        password:""
    });
    //帳號初始狀態

    //處理帳號輸入函式
        const handleInputChange = (event)=>{
            const{ value, name }= event.target;
            setAccount({
                ...account,
                [name]:value
            })
        }
    //處理帳號輸入函式

    

    //處理登入函式
    const handleLogin = async(event)=>{
        event.preventDefault();
        try{
            const result = await dispatch(loginUser(account)).unwrap();
            console.log("登陸輸出:",result);
            if(result.token){
                console.log("登入成功(result)", result.token);
                setAccount({
                    username:"",
                    password:""
                });
                btnByMoadlClose();
                //關閉login視窗
                navigate("/backpages");
                //傳送至首頁
            }
        }catch(error){
            console.log("登入失敗(error)");
            setAccount({
                username:"",
                password:""
            });
        }
    }
    //處理登入函式

    //處理驗證登入函式
    const handleLoginCheck = async()=>{
        try{
            const result = await dispatch(checkLogin()).unwrap();
            console.log("驗證輸出:",result);
            if(result.success){
                console.log("登入驗證成功(result)");
                btnByMoadlClose();
                //關閉login視窗
            }else if(!result.success){
                console.log("登入驗證失敗(result)");
            }  
        }catch(error){
            console.log("登入驗證失敗:",error);
        }
    }
    //處理驗證登入函式

    useEffect(()=>{
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
        //從 cookie抓出hexToken的資料
        if (token) {  // ✅ 只有當 token 存在時才執行
            axios.defaults.headers.common['Authorization'] = token;
            //設定 axios 的全域預設標頭之後發出的每一個請求自動帶上 Authorization 標頭
            dispatch(tokenUpData({ token }));
            
            handleLoginCheck();
        } else {
            console.log("未找到 Token，請先登入");
        }
    },[setModalInstance]);


    useEffect(()=>{
        console.log("loginState狀態:",loginState);
    },[loginState])

    return(
        <>
            <div ref={loginUserModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-bottom">
                            <button onClick={()=>{btnByMoadlClose()}} type="button" className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                            <h1 className="mb-5">請先登入</h1>
                            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                                <div className="form-floating mb-3">
                                <input onChange={handleInputChange} value={account.username} name="username" type="email" className="form-control" id="username" placeholder="name@example.com" />
                                <label htmlFor="username">Email address</label>
                                </div>
                                <div className="form-floating">
                                <input onChange={handleInputChange} value={account.password} name="password" type="password" className="form-control" id="password" placeholder="Password" />
                                <label htmlFor="password">Password</label>
                                </div>
                                <button type="onSubmit" className="btn btn-primary">登入</button>
                            </form>
                            <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;