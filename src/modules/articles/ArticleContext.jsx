/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { HTTP } from "../../config/HTTP";

const initContext = {
    getAll:() => {},
    getImage: () => {},
    handleSearch: () => {},
    handleFilter: () => {},
    handleSort: () => {},
    article: [],
    imgSrc:null,
    kategori: []
}

const ArticleContext = createContext(initContext);

export const useArticle = () => {
    return useContext(ArticleContext);
}

export const ArticleProvider = ({children}) => {

    const [article,setArticle] = useState([]);
    const [imgSrc,setImgSrc] = useState(null); 
    const [searching,setSearching] = useState(false);
    const [kategori,setKategori] = useState([]);
    const [filtered,setFiltered] = useState(false);
    const [sort,setSort] = useState(false);

    const getAll = async () => {
        const api = await axios.get((HTTP + 'article'))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })


        if(api.status == 200){
            const {data} = api.data;
            setArticle(data);
        }else{
            console.log('gagal :',api);
        }
    }

    const getImage = async (id) => {
        const api = await axios.get((HTTP + `article/${id}/image`),{
            responseType:'arraybuffer'
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })


        const blob = new Blob([api.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setImgSrc(url)
        return url;
    }

    const search = async (name) =>{
        const api = await axios.get((HTTP + `article/search/${name}`))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response
        })

        if(api.status === 200){
            const {data} = api.data;
            setArticle(data);
        }else{
            console.log('Gagal',api)
        }
    }

    const handleSearch = (name) => {
        console.log(name);
        if(name !== ""){
            search(name)
            setSearching(true);
        }else{
            getAll()
            setSearching(false)
        }
    }

    const getKategori = async () => {
        const api = await axios.get((HTTP + "kategori"))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response
        })

        if(api.status === 200){
            const {data} = api.data;
            setKategori(data);
        }else{
            console.log('gagal',api)
        }
    }

    const filterArticle = async (kategori) => {
        const api = await axios.get((HTTP + `article/filter/${kategori}`))
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })

        if(api.status == 200){
            const {data} = api.data;
            setArticle(data);
        }
        else{
            console.log('gagal',api);
        }
    }

    const handleFilter = (kategori) => {
        console.log(kategori);
        if(kategori !== ""){
            filterArticle(kategori);
            setFiltered(true);
        }else{
            setFiltered(false);
            getAll();
        }
    }

    const sortArticle = async (name,type) => {
        const api = await axios.get((HTTP) + `article/sort/${name}/type/${type}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response
        })

        if(api.status === 200){
            const {data} = api.data;
            setArticle(data);
        }else{
            console.log('gagal',api)
        }
    }

    const handleSort = (type) => {
        if(type !== ""){
            if(type == "ASC" || type == "DESC"){
                sortArticle("title",type);
                setSort(true);
            }else if(type == "DATE_ASC"){
                sortArticle("uploaded_at","ASC");
                setSort(true)
            }else if(type == "DATE_DESC"){
                sortArticle("uploaded_at","DESC");
                setSort(true)
            }else{
                setSort(false)
                getAll()
            }
        }
    }

    useEffect(() => {
        if(!searching || !filtered || !sort){
            getAll()
        }
        getKategori()
    },[])

    return(
        <>
        <ArticleContext.Provider value={{getAll,getImage,handleSearch,handleFilter,handleSort,article,imgSrc,kategori}}>
            {children}
        </ArticleContext.Provider>
        </>
    );
}