import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import BackHeader from "../components/common/BackHeader";




function BackLayout(){
    return(
        <>
            <BackHeader />
            <Outlet />
            <Footer />
        </>
    )
}

export default BackLayout;