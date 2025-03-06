import { useEffect,  useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsPage(){

// const [products, setProducts] = useState([]);

const [allProducts, setAllProducts] = useState([]);

const [allProducts2, setAllProducts2] = useState([]);

const [finalAllProducts,setFinalAllProducts] = useState([]);

const [selectAllProducts,setSelectAllProducts] = useState("全部");

const addCartItem = async(product_id,qty)=>{
    setIsLoading(true);
    try{
      const addCartItemRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`,{
        data:{
          product_id,
          qty: Number(qty)
        }
      });
      console.log("加入購物車成功",addCartItemRef.data);
    //   getCart();
    }catch(error){
      console.log("加入購物車失敗",error.data)
    }finally{
      setIsLoading(false);
    }
  }

  const [isLoading,setIsLoading] = useState(false);

  const [isScreenLoading,setIsScreenLoading] = useState(false);

  useEffect(() => {
    // const getProducts = async () => {
    //   setIsScreenLoading(true);
    //   try {
    //     const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
    //     setProducts(res.data.products);
    //     console.log("取得產品資料成功",res.data.products);
    //   } catch (error) {
    //     alert("取得產品失敗");
    //   }finally{
    //     setIsScreenLoading(false);
    //   }
    // };
    // getProducts();
    // getCart();
    
    //(方法1)
    const getAllProducts = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products/all`);
        console.log("取得產品資料成功",res.data.products);
        setAllProducts(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
      }finally{
        setIsScreenLoading(false);
      }
    };
    getAllProducts();
    //(方法1)

    //(方法2)
    const getAllProducts2 = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?category=${selectAllProducts === "全部"?(""):(selectAllProducts)}`);
        console.log("測試方法2成功",res.data);
        // setAllProducts(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
      }finally{
        setIsScreenLoading(false);
      }
    };
    getAllProducts2();
    //(方法2)
  }, []);

  //處理產品類別
  const categories = ["全部",...new Set(allProducts.map((item)=>{return(item.category)}))];
  // console.log("categories:",categories);
  //處理產品類別

  //處理產品類別過濾
  useEffect(()=>{
    const filterProducts = allProducts.filter((item)=>{
      const newfilterData = selectAllProducts === "全部" || item.category === selectAllProducts;
      return (newfilterData);
    })
    setFinalAllProducts(filterProducts);
  },[allProducts,selectAllProducts])
  //處理產品類別過濾

  const [wishList,setWishList] = useState(()=>{
    const initWishList = localStorage.getItem("wishList") ? JSON.parse(localStorage.getItem("wishList")) : {};
    return initWishList
  })

  const toggleWishListItem = (product_id) =>{
    const newWishList = {
      ...wishList,
      [product_id]: !wishList[product_id]
    }
    localStorage.setItem("wishList",JSON.stringify(newWishList));

    setWishList(newWishList);
  }
  

  return(
    <>
      <div className="container-fluid">
        <div
          className="position-relative d-flex align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <div
            className="position-absolute"
            style={{
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
              backgroundPosition: "center center",
              opacity: 0.1,
            }}
          ></div>
          <h2 className="fw-bold">Lorem ipsum.</h2>
        </div>
        <div className="container mt-md-5 mt-3 mb-7">
          <div className="row">
            <div className="col-md-4">
              <div
                className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
                id="accordionExample"
              >
                <div className="card border-0">
                  <div
                    className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                    id="headingOne"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  >
                    <div className="d-flex justify-content-between align-items-center pe-1">
                      <h4 className="mb-0">產品類別</h4>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="card-body py-0">
                      <ul className="list-unstyled">
                        {
                          categories.map((item)=>{
                            return(
                              <li key={item}>
                                <button onClick={()=>{setSelectAllProducts(item)}} type="button" href="#" className="btn border-none py-2 d-block text-muted">
                                  {item}
                                </button>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card border-0">
                  <div
                    className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                    id="headingTwo"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                  >
                    <div className="d-flex justify-content-between align-items-center pe-1">
                      <h4 className="mb-0">Lorem ipsum</h4>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="card-body py-0">
                      <ul className="list-unstyled">
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card border-0">
                  <div
                    className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                    id="headingThree"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                  >
                    <div className="d-flex justify-content-between align-items-center pe-1">
                      <h4 className="mb-0">Lorem ipsum</h4>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="card-body py-0">
                      <ul className="list-unstyled">
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                        <li>
                          <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                {
                  finalAllProducts?.map((item)=>{
                    return(
                      <div key={item.id} className="col-md-6">
                        <div className="card border-0 mb-4 position-relative position-relative">
                          <img
                            src={item.imageUrl}
                            className="card-img-top rounded-0"
                            alt={item.title}
                          />
                          <a href="#" className="text-dark">
                            <i
                              className="far fa-heart position-absolute"
                              style={{ right: "16px", top: "16px" }}
                            ></i>
                          </a>
                          <div className="card-body p-0">
                            <h4 className="mb-0 mt-3">
                              <Link to={`/products/${item.id}`}>{item.title}</Link>
                            </h4>
                            <p className="card-text mb-0">
                              NT${item.price}
                              <span className="text-muted ">
                                <del>NT${item.origin_price}</del>
                              </span>
                            </p>
                            <p className="text-muted mt-3"></p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                
                
              </div>
              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {isScreenLoading && 
            (
            <div  className="d-flex justify-content-center align-items-center" 
                    style={{ position: "fixed", inset: 0, backgroundColor: "rgba(255,255,255,0.3)", zIndex: 999,}}
            >
                <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
            </div>
            )
        }
      </div>
    </>
  )
    // return(
    //     <>
    //         <div className="container">
    //             <table className="table align-middle">
    //                 <thead>
    //                     <tr>
    //                         <th>圖片</th>
    //                         <th>商品名稱</th>
    //                         <th>價格</th>
    //                         <th></th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {products.map((product) => (
    //                         <tr key={product.id}>
    //                         <td style={{ width: "200px" }}>
    //                             <img
    //                             className="img-fluid"
    //                             src={product.imageUrl}
    //                             alt={product.title}
    //                             />
    //                         </td>
    //                         <td>{product.title}</td>
    //                         <td>
    //                             <del className="h6">原價 {product.origin_price} 元</del>
    //                             <div className="h5">特價 {product.origin_price}元</div>
    //                         </td>
    //                         <td>
    //                             <div className="btn-group btn-group-sm">
    //                             <Link
    //                                 to = {`/products/${product.id}`}
    //                                 className="btn btn-outline-secondary"
    //                             >
    //                                 查看更多
    //                             </Link>
    //                             <button disabled={isLoading} onClick={()=>{addCartItem(product.id,1)}} type="button" className="btn btn-outline-danger">
    //                                 <div>加到購物車</div>
    //                                 {
    //                                 isLoading && (<ReactLoading type={"spin"} color={"#000"} height={"1.5rem"} width={"1.5rem"}/>)
    //                                 }
    //                             </button>
    //                             </div>
    //                         </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
        
            
    //             {isScreenLoading && 
    //                 (
    //                 <div  className="d-flex justify-content-center align-items-center" 
    //                         style={{ position: "fixed", inset: 0, backgroundColor: "rgba(255,255,255,0.3)", zIndex: 999,}}
    //                 >
    //                     <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
    //                 </div>
    //                 )
    //             }
    //     </>
    // )
}

export default ProductsPage;