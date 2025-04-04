import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth, logoutUser } from "../../slice/loginSlice";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";

//後台陣列
  const backroutes = 
    [
      { path: "/", name: "Product"},
      { path: "/order", name: "Order" },
      { path: "/coupons", name: "Coupons" },
      { path: "/article", name: "Article" },
      { path: "/login", name: "Login",type: "button" },
      { path: "/cart", name: "購物車", icon: "fas fa-shopping-cart"},
    ];
//後台陣列

//前台陣列
const frontroutes = 
  [
    { path: "/", name: "HomePage"},
    { path: "/products", name: "ProductsPage" },
    { path: "/FrontArticlePage", name: "ArticlePage" },
    { path: "/cart", name: "購物車", icon: "fas fa-shopping-cart"},
    { path: "/backpages", name: "ControlPage"},
  ];
//前台陣列

export default function Header() {

  //中央控制參數提取前提宣告
    const dispatch = useDispatch();
  //中央控制參數提取前提宣告

  const[showOffcanvas,setShowOffcanvas] = useState(true);
  //開啟側邊狀態
  const handleShowMode = () => {
    setShowOffcanvas(!showOffcanvas);
  }
  

  
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

  const [expanded, setExpanded] = useState(false); // ⬅️ 管理 Navbar 狀態

    return (
      <>

        <Navbar expanded={expanded} expand="lg" bg="dark" variant="dark" className="fixed-top">
          <Container>
            <Link to="/">
              <img src="/assets/images/logo.png" className='bg-black rounded-3 test-img' alt="logo" />
            </Link>
            
            {/* 🔹 點擊時手動切換 expanded 狀態 */}
            <Navbar.Toggle 
              aria-controls="basic-navbar-nav" 
              onClick={() => setExpanded(!expanded)}
            />
            
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {
                  frontroutes?.map((item)=>(
                        item.icon?
                          (
                            <NavLink key={item.name} to={item.path} className="nav-item nav-link me-4" onClick={() => setExpanded(false)}><i className={item.icon}></i></NavLink>
                          )
                          :
                          (
                            <NavLink key={item.name} to={item.path} className="nav-item nav-link me-4" onClick={() => setExpanded(false)}>{item.name}</NavLink>
                          )
                  ))
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        {/* <div className="container d-flex flex-column">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/">
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
            <div  className={`collapse navbar-collapse justify-content-end`}
                  id="navbarNavAltMarkup"
            >
                <div className="navbar-nav">
                  {
                    frontroutes.map((item,index)=>{
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
        </div>   */}
        <Login setModalInstance={setModalInstance} test={test} setTest={setTest}/>
      </>
    )
  }
  