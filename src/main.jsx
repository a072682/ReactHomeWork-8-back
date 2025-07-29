import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 CSS
import 'bootstrap/dist/js/bootstrap.js'
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './assets/styles/all.scss'
import { Provider } from 'react-redux';
import { store }from './store';
import App from './App.jsx'
import "swiper/css";// 核心 CSS
import "swiper/css/navigation";// 左右箭頭
import "swiper/css/pagination"; // 分頁點


createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RouterProvider router = {router}/>
    </Provider>,
)
