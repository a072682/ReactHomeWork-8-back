import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";



function Login ({setModalInstance}){

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
    },[setModalInstance]);

     const btnByMoadlOpen = ()=>{
        loginUserModal.show();
    }
    const btnByMoadlClose = ()=>{
        loginUserModal.hide();
    }

    const [account,setAccount]=useState({
        username: "",
        password: ""
    })

    const handleInputChange = (event)=>{
        const{ value , name }= event.target;
        setAccount({
            [name]:value
        })
    }

    return(
        <>
            <div ref={loginUserModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-bottom">
                            <button onClick={() => {btnByMoadlClose()}} type="button" className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                            <h1 className="mb-5">請先登入</h1>
                            <form className="d-flex flex-column gap-3">
                                {/* onSubmit={handleLogin} */}
                                <div className="form-floating mb-3">
                                <input onChange={handleInputChange} value={account.username} name="username" type="email" className="form-control" id="username" placeholder="name@example.com" />
                                <label htmlFor="username">Email address</label>
                                </div>
                                <div className="form-floating">
                                <input onChange={handleInputChange} value={account.password} name="password" type="password" className="form-control" id="password" placeholder="Password" />
                                <label htmlFor="password">Password</label>
                                </div>
                                <button className="btn btn-primary">登入</button>
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