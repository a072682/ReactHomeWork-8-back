import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth, logoutUser } from "../../slice/loginSlice";

const backroutes = [
    { path: "/backpages/ProductsPage", name: "Product"},
    { path: "/backpages/OrderPage", name: "Order" },
    { path: "/backpages/CouponsPage", name: "Coupons" },
    { path: "/backpages/ArticlePage", name: "Article" },
    { path: "/backpages/login", name: "Login",type: "button" },
    { path: "/", name: "FrontPage" },
  ];

const frontroutes = [
  { path: "/", name: "HomePage"},
  { path: "/products", name: "ProductsPage" },
  { path: "/cart", name: "購物車", icon: "fas fa-shopping-cart"},
];

export default function BackHeader() {
  const dispatch = useDispatch();
  const [modalInstance, setModalInstance] = useState(null);
  const [test,setTest] = useState("off");

  
  useEffect(() => {
      dispatch(initializeAuth());  // ✅ 進入應用時，初始化登入狀態
  }, [dispatch]);

  const loginState = useSelector((state)=>{
    return(
      state.login.isAuthenticated
    )
  });

  useEffect(()=>{
      console.log("loginState狀態:",loginState);
  },[loginState]);


    return (
      <>
        <div className="container d-flex flex-column">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/backpages/ProductsPage">
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                {
                  backroutes.map((item,index)=>{
                    return(
                      item.type === "button" ? 
                      ( 
                          loginState ? ( // ✅ 這樣才能根據 loginState 來切換
                            <button key={index} onClick={()=>{dispatch(logoutUser());}} className="nav-item nav-link me-4">
                              登出<span className="sr-only">登出</span>
                            </button>
                          ) : (
                            <button key={index} onClick={() => { modalInstance?.show(); setTest("on");}} className="nav-item nav-link me-4">
                              登入<span className="sr-only">登入</span>
                            </button>
                          )
                          
                      ) : (
                        <NavLink key={index} className="nav-item nav-link me-4" to={item.path}>
                            {item.icon ? <i className={item.icon}></i> : <>{item.name} <span className="sr-only">{item.name}</span></>}
                        </NavLink>
                      )
                    )
                  })
                }
              </div>
            </div>
          </nav>
        </div>  
        <Login setModalInstance={setModalInstance} test={test} setTest={setTest}/>
      </>
    )
  }
  