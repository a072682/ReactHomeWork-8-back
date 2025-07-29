import { Link, NavLink } from "react-router-dom";

export default function Footer() {
    return (
      <>
        <div className="footer">
                <div className="bg-dark py-36">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
                            <Link to="/" className='text-white fs-24 d-flex justify-content-center align-items-center' style={{width:"48px",height:"48px"}}>
                                <img src={`${import.meta.env.BASE_URL}assets/images/logo.png`} alt="" style={{maxWidth:"100%",height:"auto"}}/>
                            </Link>
                            <ul className="d-flex list-unstyled mb-0 fs-24 gap-24">
                                <li><a href="#" className="text-white "><i className="fab fa-facebook"></i></a></li>
                                <li><a href="#" className="text-white "><i className="fab fa-instagram"></i></a></li>
                                <li><a href="#" className="text-white "><i className="fab fa-line"></i></a></li>
                            </ul>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
                            <div className="mb-md-0 mb-1">
                                <p className="mb-0">02-3456-7890</p>
                                <p className="mb-0">service@mail.com</p>
                            </div>
                            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
      </>
    );
  }
  