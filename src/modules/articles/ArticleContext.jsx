/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useContext } from "react"
import { HTTP } from "../../config/HTTP";

const initContext = {
    getAll:() => {},
    getImage: () => {}
}

const ArticleContext = createContext(initContext);

export const useArticle = () => {
    return useContext(ArticleContext);
}

export const ArticleProvider = ({children}) => {

    const getAll = async () => {
        const api = await axios.get((HTTP + 'article'))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })

        if(api.status == 200){
            console.log('berhasil: ',api);
        }else{
            console.log('gagal :',api);
        }
    }

    const getImage = async () => {

    }

    return(
        <>
        <ArticleContext.Provider value={{getAll,getImage}}>
            {children}
        </ArticleContext.Provider>
        </>
    );
}