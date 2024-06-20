/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useArticle } from "./ArticleContext";

/**
 * Komponen untuk menampilkan daftar artikel pengguna.
 * @param {Object} token - Token autentikasi pengguna.
 * @param {Array} userArticle - Array berisi artikel-artikel yang dimiliki pengguna.
 * @param {Function} getImage - Fungsi untuk mengambil gambar artikel berdasarkan ID.
 * @param {Function} Edit - Fungsi untuk mengedit artikel.
 */
const ListUserArticle = ({ token, userArticle, getImage, Edit }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const { deleteArticle } = useArticle();

  useEffect(() => {
    if (userArticle.length > 0) {
      const fetchArticleImages = async () => {
        const urls = await Promise.all(
          userArticle.map(async (val) => {
            const imageUrl = await getImage(val.id); // Memperbarui untuk menunggu pengambilan URL gambar.
            return imageUrl;
          })
        );
        setImageUrls(urls);
      };

      fetchArticleImages();
    }
  }, [userArticle]);

  /**
   * Menghapus artikel berdasarkan ID setelah konfirmasi.
   * @param {string} id - ID artikel yang akan dihapus.
   */
  const handleDelete = (id) => {
    const ask = window.confirm("Yakin?");
    if (ask) {
      deleteArticle(token, id);
    }
  };

  return (
    <>
      <main className="bg-[#272727] flex flex-wrap justify-center gap-[3rem] px-[5rem] py-[5rem]">
        {userArticle.length > 0
          ? userArticle.map((val, index) => (
              <ul
                key={val.id}
                className="w-[500px] h-[auto] bg-[#5e5e5e] rounded-lg flex flex-col flex-wrap justify-center items-center gap-[10px] pb-[3rem]"
              >
                <li className="">
                  <img
                    className="w-[500px] h-[300px] object-cover rounded-t-lg"
                    src={imageUrls[index]}
                    alt={"img"}
                  />
                </li>
                <li className="text-[#0c0e0ce7] uppercase font-semibold text-[1.1em] text-[#f8f8f8] w-[100%] text-center">
                  {val.title}
                </li>
                <li className="text-[#0c0e0ce7] font-medium text-[1.10em] text-[#f8f8f8] text-center">
                  {val.article}
                </li>
                <li className="text-[#0c0e0ce7] font-thin text-[14px] text-[#f8f8f8]">
                  Uploaded At : {val.uploaded_at}
                </li>
                <div className="flex gap-[20px] mt-[10px]">
                  <button
                    className="bg-[#27af27] text-[#f8f8f8] w-[80px] py-[5px] rounded-md"
                    onClick={() => Edit(val.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#e23131] text-[#f8f8f8] w-[80px] py-[5px] rounded-md"
                    onClick={() => handleDelete(val.id)}
                  >
                    Delete
                  </button>
                </div>
              </ul>
            ))
          : null}
      </main>
    </>
  );
};

export default ListUserArticle;
