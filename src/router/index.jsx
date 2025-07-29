import { createHashRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";
import ProductsPage from "../pages/back/ProductsPage";
import CouponsPage from "../pages/back/CouponsPage";
import OrderPage from "../pages/back/OrderPage";
import BackLayout from "../layouts/BackLayout";





const router = createHashRouter([
    {
        path: "/",
        element: <BackLayout />,
        children:[
            {
                path: "",
                element: <ProductsPage />,
            },
            {
                path: "OrderPage",
                element: <OrderPage />,
            },
            {
                path: "CouponsPage",
                element: <CouponsPage />,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    }
])

export default router;