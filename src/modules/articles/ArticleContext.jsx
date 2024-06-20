/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { HTTP } from "../../config/HTTP";
const initContext = {
  getAll: () => {},
  getImage: () => {},
  handleSearch: () => {},
  handleFilter: () => {},
  handleSort: () => {},
  getUserArticle: () => {},
  addArticle: () => {},
  Edit: () => {},
  getKategoriById: () => {},
  updateArticle: () => {},
  deleteArticle: () => {},
  article: [],
  imgSrc: null,
  kategori: [],
  userArticle: [],
  editId: null,
  kategoriById: [],
};

const ArticleContext = createContext(initContext);

export const useArticle = () => {
  return useContext(ArticleContext);
};

export const ArticleProvider = ({ children }) => {
  const [article, setArticle] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [searching, setSearching] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [sort, setSort] = useState(false);
  const [userArticle, setUserArticle] = useState([]);
  const [editId, setEditId] = useState(null);
  const [kategoriById, setKategoriById] = useState([]);

  /**
   * Fungsi untuk mengambil semua artikel dari API dan memperbarui state `article`.
   * @returns {Promise<void>}
   */
  const getAll = async () => {
    const api = await axios
      .get(HTTP + "article")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status == 200) {
      const { data } = api.data;
      setArticle(data);
    } else {
      console.log("gagal :", api);
    }
  };

  /**
   * Fungsi untuk mengambil gambar artikel dari API berdasarkan ID.
   * @param {number} id ID artikel untuk mengambil gambar.
   * @returns {Promise<string>} URL gambar artikel.
   */
  const getImage = async (id) => {
    const api = await axios
      .get(HTTP + `article/${id}/image`, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    const blob = new Blob([api.data], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    setImgSrc(url);
    return url;
  };

  /**
   * Fungsi untuk mencari artikel berdasarkan nama dari API dan memperbarui state `article`.
   * @param {string} name Nama artikel untuk pencarian.
   * @returns {Promise<void>}
   */
  const search = async (name) => {
    const api = await axios
      .get(HTTP + `article/search/${name}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status === 200) {
      const { data } = api.data;
      setArticle(data);
    } else {
      console.log("Gagal", api);
    }
  };

  /**
   * Fungsi untuk menangani pencarian artikel berdasarkan nama.
   * @param {string} name Nama artikel untuk pencarian.
   * @returns {void}
   */
  const handleSearch = (name) => {
    console.log(name);
    if (name !== "") {
      search(name);
      setSearching(true);
    } else {
      getAll();
      setSearching(false);
    }
  };

  /**
   * Fungsi untuk mengambil daftar kategori dari API dan memperbarui state `kategori`.
   * @returns {Promise<void>}
   */
  const getKategori = async () => {
    const api = await axios
      .get(HTTP + "kategori")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status === 200) {
      const { data } = api.data;
      setKategori(data);
    } else {
      console.log("gagal", api);
    }
  };

  /**
   * Fungsi untuk memfilter artikel berdasarkan kategori dari API dan memperbarui state `article`.
   * @param {string} kategori Nama kategori untuk filtering artikel.
   * @returns {Promise<void>}
   */
  const filterArticle = async (kategori) => {
    const api = await axios
      .get(HTTP + `article/filter/${kategori}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status == 200) {
      const { data } = api.data;
      setArticle(data);
    } else {
      console.log("gagal", api);
    }
  };

  /**
   * Fungsi untuk menangani filter artikel berdasarkan kategori.
   * @param {string} kategori Nama kategori untuk filtering artikel.
   * @returns {void}
   */
  const handleFilter = (kategori) => {
    console.log(kategori);
    if (kategori !== "") {
      filterArticle(kategori);
      setFiltered(true);
    } else {
      getAll();
      setFiltered(false);
    }
  };

  /**
   * Fungsi untuk mengurutkan artikel berdasarkan jenis urutan dari API dan memperbarui state `article`.
   * @param {string} name Nama kolom untuk pengurutan.
   * @param {string} type Jenis urutan (ASC, DESC) untuk pengurutan.
   * @returns {Promise<void>}
   */
  const sortArticle = async (name, type) => {
    const api = await axios
      .get(HTTP + `article/sort/${name}/type/${type}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status === 200) {
      const { data } = api.data;
      setArticle(data);
    } else {
      console.log("gagal", api);
    }
  };

  /**
   * Fungsi untuk menangani pengurutan artikel berdasarkan jenis urutan.
   * @param {string} type Jenis urutan untuk mengurutkan artikel.
   * @returns {void}
   */
  const handleSort = (type) => {
    if (type !== "") {
      if (type == "ASC" || type == "DESC") {
        sortArticle("title", type);
        setSort(true);
      } else if (type == "DATE_ASC") {
        sortArticle("uploaded_at", "ASC");
        setSort(true);
      } else if (type == "DATE_DESC") {
        sortArticle("uploaded_at", "DESC");
        setSort(true);
      } else {
        setSort(false);
        getAll();
      }
    }
  };

  /**
   * Fungsi untuk mengambil artikel pengguna dari API berdasarkan token autentikasi dan memperbarui state `userArticle`.
   * @param {string} token Token autentikasi untuk mengakses API.
   * @returns {Promise<void>}
   */
  const getUserArticle = async (token) => {
    const api = await axios
      .get(HTTP + `article/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status == 200) {
      const { data } = api.data;
      setUserArticle(data);
    } else {
      console.log("gagal", api);
    }
  };

  /**
   * Fungsi untuk menambahkan artikel baru menggunakan data yang diberikan dan memperbarui daftar artikel.
   * @param {string} token Token autentikasi.
   * @param {string} title Judul artikel baru.
   * @param {string} article Konten artikel baru.
   * @param {string} kategori Kategori artikel baru.
   * @param {File} file Gambar untuk artikel baru.
   * @param {function} clear Fungsi untuk membersihkan input setelah menambahkan artikel.
   * @returns {Promise<void>}
   */
  const addArticle = async (token, title, article, kategori, file, clear) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("article", article);
    formData.append("kategori", kategori);
    formData.append("file", file);

    const api = await axios
      .post(HTTP + "article", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status === 201) {
      const { data } = api;
      alert(data.message);
      clear();
      getAll();
      getUserArticle(token);
    } else {
      const { data } = api;
      console.log("Error", data);
    }
  };

  /**
   * Fungsi untuk mengatur ID artikel yang sedang diedit.
   * @param {number} id ID artikel yang akan diedit.
   * @returns {void}
   */
  const Edit = async (id) => {
    setEditId(id);
  };

  /**
   * Fungsi untuk mengambil data kategori artikel dari API berdasarkan ID dan memperbarui state `kategoriById`.
   * @param {number} id ID kategori untuk pengambilan data.
   * @returns {Promise<void>}
   */
  const getKategoriById = async (id) => {
    const api = await axios
      .get(HTTP + `kategori/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status === 200) {
      const { data } = api.data;
      console.log(data);
      setKategoriById(data);
    } else {
      console.log("gagal", api);
    }
  };

  /**
   * Fungsi untuk memperbarui artikel yang ada berdasarkan data yang diberikan.
   * @param {string} token Token autentikasi.
   * @param {number} id ID artikel yang akan diperbarui.
   * @param {string} title Judul artikel yang akan diperbarui.
   * @param {string} article Konten artikel yang akan diperbarui.
   * @param {File} image Gambar artikel yang akan diperbarui.
   * @param {string} kategori Kategori artikel yang akan diperbarui.
   * @param {function}
   * clear Fungsi untuk membersihkan input setelah memperbarui artikel.
   * @returns {Promise<void>}
   */
  const updateArticle = async (
    token,
    id,
    title,
    article,
    image,
    kategori,
    clear
  ) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("article", article);
    formData.append("image", image);
    formData.append("kategori", kategori);

    const api = await axios
      .put(HTTP + `article/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status === 200) {
      const { data } = api;
      alert(data.message);
      clear();
      getUserArticle(token);
      getAll();
    } else {
      console.log("Error", api);
    }
  };

  /**
   * Fungsi untuk menghapus artikel berdasarkan ID artikel.
   * @param {string} token Token autentikasi.
   * @param {number} id ID artikel yang akan dihapus.
   * @returns {Promise<void>}
   */
  const deleteArticle = async (token, id) => {
    const api = await axios
      .delete(HTTP + `article/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    if (api.status === 200) {
      const { data } = api;
      alert(data.message);
      getUserArticle(token);
      getAll();
      getUserArticle(token);
    } else {
      console.log("Error", api);
    }
  };

  useEffect(() => {
    if (!searching && !filtered && !sort) {
      getAll();
    }
    getKategori();
  }, []);

  return (
    <>
      <ArticleContext.Provider
        value={{
          getAll,
          getImage,
          handleSearch,
          handleFilter,
          handleSort,
          getUserArticle,
          addArticle,
          Edit,
          getKategoriById,
          updateArticle,
          deleteArticle,
          article,
          imgSrc,
          kategori,
          userArticle,
          editId,
          kategoriById,
        }}
      >
        {children}
      </ArticleContext.Provider>
    </>
  );
};
