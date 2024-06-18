import { Outlet } from "react-router-dom";
import ListUserArticle from "../articles/ListUserArticle";
import NavBar from "./NavBar";
import { useArticle } from "../articles/ArticleContext";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import FormArticle from "../articles/FormArticle";
import FormArticleEdit from "../articles/FormArticleEdit";

const ArticleLayout = () => {

    const {getUserArticle,userArticle,getImage,Edit,editId} = useArticle()

    const {token} = useAuth()
 
    useEffect(() => {
        getUserArticle(token)
    },[]);

    return(
    <>
    <NavBar/>
        {
            editId  !== null ?  <FormArticleEdit values={userArticle.length > 0 ? userArticle.find((data) => data.id === editId) : null}/> : <FormArticle/>
        }
    <ListUserArticle token={token} userArticle={userArticle} Edit={Edit} getImage={getImage}/>
    </>);
}

export default ArticleLayout