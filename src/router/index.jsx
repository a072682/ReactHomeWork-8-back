import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import HomePage from "../pages/front/HomePage";
import ProductDetailPage from "../pages/front/ProductDetailPage";
import CartPage from "../pages/front/CartPage";
import CheckoutFormPage from "../pages/front/CheckoutFormPage";
import CheckoutPaymentPage from "../pages/front/CheckoutPaymentPage";
import CheckoutSuccessPage from "../pages/front/CheckoutSuccessPage";
import NotFound from "../pages/NotFound";
import ProductsFrontPage from "../pages/front/ProductsFrontPage";
import ProductsPage from "../pages/back/ProductsPage";
import CouponsPage from "../pages/back/CouponsPage";
import ArticlePage from "../pages/back/ArticlePage";
import OrderPage from "../pages/back/OrderPage";
import BackLayout from "../layouts/BackLayout";
import FrontArticlePage from "../pages/front/FrontArticlePage";
import FrontArticleSinglePage from "../pages/front/FrontArticleSinglePage";




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
                element: <ProductsFrontPage />,
            },
            {
                path: "products/:id",
                element: <ProductDetailPage />,
            },
            {
                path: "FrontArticlePage",
                element: <FrontArticlePage />,
            },
            {
                path: "FrontArticlePage/:id",
                element: <FrontArticleSinglePage />,
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
        path: "/backpages",
        element: <BackLayout />,
        children:[
            {
                path: "",
                element: <ProductsPage />,
            },
            {
                path: "ProductsPage",
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
            {
                path: "ArticlePage",
                element: <ArticlePage />,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    }
])

export default router;