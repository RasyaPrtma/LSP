/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { HTTP } from "../../config/HTTP";
import Cookies from "js-cookie";

const initContext = {
    doLogin: () => {},
    doRegist: () => {},
    doLogout: () => {},
    IsLogged: true,
}

const AuthContext = createContext(initContext);

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [IsLogged,setIsLogged] = useState(false);

    const doLogin = async (email,password,clear,close) => {
        const api = await axios.post((HTTP + "login"),{
            email: email,
            password:password
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response
        })

        if(api.status == 200){
            const {data} = api.data;
            Cookies.set('SESSION_TOKEN',data.token,{expires:7});
            setIsLogged(true);
            close()
            alert(api.data.message);
            clear();
            return true;
        }else{
            const {data} = api;
            alert(data.message);
            return false;
        }
    }

    const doRegist = async (name,username,email,password,clear,close) => {
        const api = await axios.post((HTTP + "register"),{
            name: name,
            username: username,
            email: email,
            password: password
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response
        })

        const {message} = api.data
        
        if(api.status == 201){
            clear();
            close();
            alert(message);
        }else{
            alert(message);
        }
    }

    const doLogout = () => {
        setIsLogged(false);
        return Cookies.remove('SESSION_TOKEN',{expires:7});
    }

    useEffect(() => {
        const token = Cookies.get("SESSION_TOKEN");
        if(token !== undefined){
            setIsLogged(true);
        }
    },[])

    return(
    <>
        <AuthContext.Provider value={{doLogin,doRegist,doLogout,IsLogged}}>
            {children}
        </AuthContext.Provider>
    </>);
}