import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";



function FrontLayout(){
    return(
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default FrontLayout;