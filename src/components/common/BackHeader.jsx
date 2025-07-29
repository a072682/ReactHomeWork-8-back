import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../slice/loginSlice";

const backHeaderItem = [
  { path: "/backpages/ProductsPage", name: "Product" },
  { path: "/backpages/OrderPage", name: "Order" },
  { path: "/backpages/CouponsPage", name: "Coupons" },
  { path: "/backpages/login", name: "Login", type: "button" },
];

export default function BackHeader() {
  const dispatch = useDispatch();
  //使用中央函式前置

  const [modalInstance, setModalInstance] = useState(null);
  //處理是否開啟Model視窗

  //取得登陸狀態
  const loginState = useSelector((state) => {
    return state.login.isAuthenticated;
  });
  //取得登陸狀態

  //隨時更新登陸狀態
  useEffect(() => {
    console.log("loginState狀態:", loginState);
  }, [loginState]);
  //隨時更新登陸狀態

  const [isCollapsed, setIsCollapsed] = useState(true);
  //控制Navbar是否收合

  const toggleNavbar = () => {
    setIsCollapsed((prev) => !prev);
  };
  //切換收合狀態

  return (
    <>
      <div
        className="container d-flex flex-column"
        style={{
          position: "sticky",
          top: "0",
          zIndex: "100",
          backgroundColor: "#ffffff",
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/backpages/ProductsPage">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNavAltMarkup"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${
              isCollapsed ? "" : "show"
            }`}
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              {backHeaderItem.map((item, index) => {
                return item.type === "button" ? (
                  loginState ? (
                    // ✅ 登入狀態 → 顯示登出按鈕
                    <button
                      key={index}
                      onClick={() => {
                        dispatch(logoutUser());
                        setIsCollapsed(true); // 收合Navbar
                      }}
                      className="nav-item nav-link me-4"
                    >
                      登出<span className="sr-only">登出</span>
                    </button>
                  ) : (
                    // ❌ 未登入 → 顯示登入按鈕
                    <button
                      key={index}
                      onClick={() => {
                        modalInstance?.show();
                        setIsCollapsed(true); // 收合Navbar
                      }}
                      className="nav-item nav-link me-4"
                    >
                      登入<span className="sr-only">登入</span>
                    </button>
                  )
                ) : (
                  // 其他導覽項目
                  <NavLink
                    key={index}
                    className="nav-item nav-link me-4"
                    to={item.path}
                    onClick={() => setIsCollapsed(true)} // 收合Navbar
                  >
                    {item.icon ? (
                      <i className={item.icon}></i>
                    ) : (
                      <>
                        {item.name} <span className="sr-only">{item.name}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
      <Login setModalInstance={setModalInstance} />
    </>
  );
}
