import { Link, NavLink } from "react-router-dom";

export default function Footer() {
    return (
      <>
        <div className="bg-dark py-5">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
              <Link className="text-white h4" to="/">
                <img src="/assets/images/logo.png" className='bg-black rounded-3 test-img' alt="logo" />
              </Link >
              <ul className="d-flex list-unstyled mb-0 h4">
                <li>
                  <Link to="/" className="text-white mx-3">
                    <i className="fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-white mx-3">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-white ms-3">
                    <i className="fab fa-line"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
              <div className="mb-md-0 mb-1">
                <p className="mb-0">(04)9408-1688</p>
                <p className="mb-0">come_and_buy@comebuy.com</p>
              </div>
              <p className="mb-0">© Come_and_Buy © 2021, In Here. All Rights Reserved. 隱私權政策</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  