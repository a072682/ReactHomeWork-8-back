import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function FrontArticleSinglePage(){

    const { id } = useParams();

    const[articleSingleData,setArticleSingleData] = useState({});
    
    const getArticleSingleData = async () => {
        try {
        const getArticleSingleDataRes = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/article/${id}`);
        console.log("取得文章成功",getArticleSingleDataRes.data.article);
        setArticleSingleData(getArticleSingleDataRes.data.article);
        } catch (error) {
        console.log("取得文章失敗",error);
        }
    };

useEffect(()=>{
    getArticleSingleData();
},[])
       

    return(
        <>
            <div className="container-fluid">
                <div className="container mt-md-5 mt-3 mb-7">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                            
                                {
                                    
                                        <div className="card border-0 mb-4 position-relative position-relative">
                                            <h3 className="mb-0 mt-5">
                                                {articleSingleData.title}
                                            </h3>
                                            <img
                                                src={articleSingleData.image}
                                                className="card-img-top rounded-3 img-set mt-5"
                                                alt={articleSingleData.title}
                                            />
                                            <div className="card-body p-0">
                                                <p className="card-text mt-5 mb-0">
                                                    {articleSingleData.description}
                                                </p>
                                                <p className="text-muted mt-3"></p>
                                            </div>
                                            {
                                                articleSingleData.tag?.map((item)=>(
                                                    <img
                                                        src={item}
                                                        className="card-img-top rounded-3 img-set mt-5"
                                                        alt={item}
                                                    />
                                                ))
                                            }
                                        </div>
                                    
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrontArticleSinglePage;