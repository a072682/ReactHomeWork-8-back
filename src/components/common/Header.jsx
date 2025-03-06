import { Link, NavLink } from "react-router-dom";
import { useState } from "react";


const routes = [
    { path: "/products", name: "Product" },
    { path: "/order", name: "Order" },
    { path: "/login", name: "Login",type: "button" },
    { path: "/cart", name: "購物車", icon: "fas fa-shopping-cart"},
  ];

export default function Header() {
  
  const [modalInstance, setModalInstance] = useState(null);

    return (
      <>
        <div className="container d-flex flex-column">
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
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                {
                  routes.map((item,index)=>{
                    return(
                      item.type === "button" ? 
                      (
                        <button key={index} onClick={()=>{modalInstance?.show()}} className="nav-item nav-link me-4">
                            Login<span className="sr-only">Login</span>
                        </button>
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
        
      </>
    )
  }
  