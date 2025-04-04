import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { checkLogin, loginUser, tokenUpData } from "../../slice/loginSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function Login({setModalInstance,test,setTest}){

    const loginState = useSelector((state)=>{
        return(
          state.login.isAuthenticated
        )
      })

    const loginUserModalRef = useRef(null);
    const [loginUserModal,setLoginUserModal] = useState(null);
    useEffect(()=>{
        if (loginUserModalRef.current) {
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

     const btnByMoadlOpen = ()=>{
        loginUserModal.show();
    }
    const btnByMoadlClose = ()=>{
        loginUserModal?.hide();
    }

    const [account,setAccount]=useState({
        username:"",
        password:""
    });

    const handleInputChange = (event)=>{
        const{ value, name }= event.target;
        setAccount({
            ...account,
            [name]:value
        })
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async(event)=>{
        event.preventDefault();
        console.log(account);
        try{
            const result = await dispatch(loginUser(account)).unwrap();
            if(result.token){
                console.log("登入成功(result)", result.token);
                btnByMoadlClose();
                setTest("off");
                navigate("/");
            }
            else if(!result.success){
                console.log("登入失敗(result)");
            }
        }catch(error){
            console.log("登入失敗(error)");
        }
    }

    const handleLoginCheck = async()=>{
        try{
            const result = await dispatch(checkLogin()).unwrap();
            if(result.success){
                console.log("登入驗證成功(result)", result.success);
                btnByMoadlClose();
                if(test === "off"){
                    console.log("登入驗證成功 test-off");
                }else{
                    setTest("off");
                }
            }else if(!result.success){
                console.log("登入驗證失敗(result)");
            }  
        }catch(error){
            console.log("登入驗證失敗:",error);
        }
    }

    useEffect(()=>{
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
        if (token) {  // ✅ 只有當 token 存在時才執行
            axios.defaults.headers.common['Authorization'] = token;
            dispatch(tokenUpData({ token }));
            
            handleLoginCheck();
        } else {
            console.log("未找到 Token，請先登入");
        }
    },[setModalInstance]);

    useEffect(()=>{
        if(test === "on"){
            console.log("on");
        }
        if(test=== "off"){
            console.log("off");
        }
    },[test])

    useEffect(()=>{
        console.log("loginState狀態:",loginState);
    },[loginState])

    return(
        <>
            <div ref={loginUserModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-bottom">
                            <button onClick={()=>{setTest("off"),btnByMoadlClose()}} type="button" className="btn-close" aria-label="Close"></button>
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