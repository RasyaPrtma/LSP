/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import video from "../../assets/bg.mp4";
import layer from "../../assets/layer.jpg";
import { useArticle } from "../articles/ArticleContext";

const Home = () => {
  const {
    article,
    kategori,
    getImage,
    handleSearch,
    handleFilter,
    handleSort,
  } = useArticle();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (article.length > 0) {
      const fetchArticleImages = async () => {
        const urls = await Promise.all(
          article.map(async (val) => {
            const imageUrl = getImage(val.id);
            return imageUrl;
          })
        );
        setImageUrls(urls);
      };

      fetchArticleImages();
    }
  }, [article]);

  return (
    <>
      <section className="home">
        <video autoPlay muted loop>
          <source src={video} />
        </video>
        <div className="absolute top-[35%] bottom-[50%] left-[15vw] z-[10] flex gap-[2rem] items-center">
          <div className="text">
            <h1 className="text-[3em] font-bold text-[#F8F8F8]">
              WELCOME TO ARTICULATE
            </h1>
            <p className="text-[1em] font-medium text-[#F8F8F8]">
              Articulate Adalah Website Untuk Mengelola Artikel Sederhana Bisa
              Berupa Artikel Atau Informasi Menarik Lainnya <br />
              Sehingga Kalian Bisa Berbagi Ilmu Atau Pengetahuan Disini Ayo Coba
            </p>
          </div>
          <span className="relative layer-img w-[450px] h-[450px] rounded-lg">
            <img
              src={layer}
              className="width-[100%] h-[100%] object-cover ml-[5em] rounded-xl shadow-2xl shadow-[rgba(255,255,255,0.8)]"
            />
          </span>
        </div>
      </section>
      <section className="article">
        <header className="mt-[10rem] flex gap-[10px]">
          <div className="relative w-[30vw]">
            <input
              onKeyUp={(e) => handleSearch(e.target.value)}
              className="relative w-[100%] rounded-[20px] outline-none border-none py-[5px] pl-[10px] font-medium text-[rgba(0,0,0,.7)]"
              type="text"
            />
            <i className=" absolute top-[9px] z-[10] right-[15px] fa-solid fa-magnifying-glass"></i>
          </div>
          <select
            onChange={(e) => handleFilter(e.target.value)}
            className=" rounded-sm outline-none border-none"
          >
            <option value={""}>KATEGORI</option>
            {kategori.length > 0
              ? kategori.map((val) => (
                  <option key={val.id} value={val.name}>
                    {val.name}
                  </option>
                ))
              : null}
          </select>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className=" rounded-sm outline-none border-none text-center"
          >
            <option value={""}>SORT BY</option>
            <option value={"ASC"}>A-Z</option>
            <option value={"DESC"}>Z-A</option>
            <option value={"DATE_ASC"}>DATE ASC</option>
            <option value={"DATE_DESC"}>DATE DESC</option>
          </select>
        </header>
        <main className="flex flex-wrap justify-center gap-[3rem] px-[5rem] py-[5rem]">
          {article.length > 0
            ? article.map((val, index) => (
                <ul
                  key={val.id}
                  className="w-[500px] h-[100%] bg-[#5e5e5e] rounded-lg flex flex-col pb-[2em] items-center relative"
                >
                  <li className="">
                    <img
                      className="w-[500px] h-[300px] object-cover rounded-t-lg"
                      src={imageUrls[index]}
                      alt={"img"}
                    />
                  </li>
                  <div className="flex flex-col items-center px-[2rem] py-[20px]">
                    <li className="text-[#0c0e0ce7] uppercase font-semibold text-[1.1em] text-[#f8f8f8] w-[100%] text-center">
                      {val.title}
                    </li>
                    <li className="text-[#0c0e0ce7] font-medium text-[1.10em] text-[#f8f8f8] text-center">
                      {val.article}
                    </li>
                  </div>
                  <li className="text-[#0c0e0ce7] font-thin text-[14px] text-[#f8f8f8] absolute bottom-[15px]">
                    Uploaded At : {val.uploaded_at}
                  </li>
                </ul>
              ))
            : null}
        </main>
      </section>
    </>
  );
};

export default Home;
