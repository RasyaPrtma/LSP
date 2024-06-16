/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useState } from "react"
import { HTTP } from "../../config/HTTP";

const initContext = {
    doLogin: () => {},
    doRegist: () => {},
    IsLogged: true,
}

const AuthContext = createContext(initContext);

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [IsLogged,setIsLogged] = useState(false);

    const doLogin = async (email,password,clear) => {
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
            const date = new Date();
            date.setTime(date.getTime() + (1*24*60*60*1000));
            document.cookie = `SESSION_TOKEN=${data.token};expires=${date.toUTCString()}`;
            alert(api.data.message);
            clear();
            return true;
        }else{
            const {data} = api;
            alert(data.message);
            return false;
        }
    }

    const doRegist = async (name,username,email,password) => {
        const data = await axios.post((HTTP + "register"),{
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
    }

    return(
    <>
        <AuthContext.Provider value={{doLogin,doRegist,IsLogged}}>
            {children}
        </AuthContext.Provider>
    </>);
}