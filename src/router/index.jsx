import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import NotFound from "../pages/NotFound";
import CheckoutFormPage from "../pages/CheckoutFormPage";
import CheckoutPaymentPage from "../pages/CheckoutPaymentPage";
import CheckoutSuccessPage from "../pages/CheckoutSuccessPage";


const router = createHashRouter([
    {
        path: "/",
        element: <FrontLayout />,
        children:[
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },
            {
                path: "products/:id",
                element: <ProductDetailPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "checkout-form",
                element: <CheckoutFormPage />,
            },
            {
                path: "checkout-payment",
                element: <CheckoutPaymentPage />,
            },
            {
                path: "checkout-success",
                element: <CheckoutSuccessPage />,
            },

        ]
    },
    {
        path: "*",
        element: <NotFound />,
    }
])

export default router;