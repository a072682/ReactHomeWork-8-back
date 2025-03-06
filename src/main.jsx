import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 CSS
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './assets/styles/all.scss'
import 'bootstrap/dist/js/bootstrap.js'

// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
