/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { HTTP } from "../../config/HTTP";
import Cookies from "js-cookie";

/**
 * Konteks awal untuk otentikasi.
 * @typedef {Object} AuthContextType
 * @property {Function} doLogin - Fungsi untuk melakukan proses login.
 * @property {Function} doRegist - Fungsi untuk melakukan proses registrasi.
 * @property {Function} doLogout - Fungsi untuk melakukan proses logout.
 * @property {boolean} IsLogged - Status apakah pengguna sudah login atau belum.
 * @property {string|null} token - Token autentikasi pengguna.
 */

const initContext = {
  doLogin: () => {},
  doRegist: () => {},
  doLogout: () => {},
  IsLogged: true,
  token: null,
  nameUser: "",
};

/**
 * Konteks otentikasi untuk digunakan di dalam komponen.
 * @type {React.Context<AuthContextType>}
 */
const AuthContext = createContext(initContext);

/**
 * Hook untuk mengakses konteks otentikasi.
 * @returns {AuthContextType} Konteks otentikasi.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * Provider untuk konteks otentikasi.
 * @param {Object} props - Properti komponen provider.
 * @param {React.ReactNode} props.children - Komponen-komponen yang terbungkus dalam provider.
 * @returns {JSX.Element} Provider konteks otentikasi.
 */
export const AuthProvider = ({ children }) => {
  const [IsLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [nameUser, setNameUser] = useState("");

  /**
   * Melakukan proses login pengguna.
   * @param {string} email - Email pengguna untuk login.
   * @param {string} password - Kata sandi pengguna untuk login.
   * @param {Function} clear - Fungsi untuk membersihkan input setelah login berhasil.
   * @param {Function} close - Fungsi untuk menutup modal setelah login berhasil.
   * @returns {Promise<boolean>} Promise yang menunjukkan apakah login berhasil atau tidak.
   */
  const doLogin = async (email, password, clear, close) => {
    try {
      const api = await axios.post(`${HTTP}login`, {
        email: email,
        password: password,
      });

      if (api.status === 200) {
        const { data } = api.data;
        Cookies.set("SESSION_TOKEN", data.token, { expires: 7 });
        Cookies.set("SESSION_USER", data.username);
        setToken(data.token);
        setNameUser(data.username);
        setIsLogged(true);
        close();
        alert(api.data.message);
        clear();
        return true;
      } else {
        const { data } = api;
        alert(data.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login gagal. Silakan coba lagi.");
      return false;
    }
  };

  /**
   * Melakukan proses registrasi pengguna.
   * @param {string} name - Nama lengkap pengguna untuk registrasi.
   * @param {string} username - Username pengguna untuk registrasi.
   * @param {string} email - Email pengguna untuk registrasi.
   * @param {string} password - Kata sandi pengguna untuk registrasi.
   * @param {Function} clear - Fungsi untuk membersihkan input setelah registrasi berhasil.
   * @param {Function} close - Fungsi untuk menutup modal setelah registrasi berhasil.
   */
  const doRegist = async (name, username, email, password, clear, close) => {
    try {
      const api = await axios.post(`${HTTP}register`, {
        name: name,
        username: username,
        email: email,
        password: password,
      });

      const { message } = api.data;

      if (api.status === 201) {
        clear();
        close();
        alert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registrasi gagal. Silakan coba lagi.");
    }
  };

  /**
   * Melakukan proses logout pengguna.
   * @returns {void}
   */
  const doLogout = () => {
    setIsLogged(false);
    setToken(null);
    Cookies.remove("SESSION_USER");
    return Cookies.remove("SESSION_TOKEN", { expires: 7 });
  };

  /**
   * Efek samping untuk memeriksa token pada Cookies saat komponen dimuat.
   */
  useEffect(() => {
    const tok = Cookies.get("SESSION_TOKEN");
    const username = Cookies.get("SESSION_USER");
    if (tok !== undefined) {
      setToken(token);
      setIsLogged(true);
      setNameUser(username);
    }
  }, [IsLogged]);

  return (
    <AuthContext.Provider
      value={{ doLogin, doRegist, doLogout, IsLogged, token, nameUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
