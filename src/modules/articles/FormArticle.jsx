import { useRef } from "react";
import { useArticle } from "./ArticleContext";
import { useAuth } from "../auth/AuthContext";

/**
 * Komponen untuk menambahkan artikel baru.
 */
const FormArticle = () => {
  const title = useRef();
  const article = useRef();
  const image = useRef();
  const categoris = useRef();

  const { addArticle, kategori } = useArticle();
  const { token } = useAuth();

  /**
   * Mengirimkan data artikel baru ke fungsi addArticle.
   * @param {Event} e - Event form submit.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    addArticle(
      token,
      title.current.value,
      article.current.value,
      categoris.current.value,
      image.current.files[0],
      handleClear
    );
  };

  /**
   * Mengosongkan nilai input setelah artikel ditambahkan.
   */
  const handleClear = () => {
    title.current.value = "";
    article.current.value = "";
    image.current.value = "";
    categoris.current.value = "";
  };

  return (
    <div className="bg-[#686868e7] w-[100%] h-[100vh] py-[5rem]">
      <form
        onSubmit={handleSubmit}
        className="mx-auto gap-[25px] flex flex-col justify-center items-center bg-[rgba(255,255,255,0.2)] w-[550px] h-[700px] rounded-md"
      >
        <h1 className="text-[2.5em] font-bold text-[rgba(255,255,255,0.4)]">
          Create Article
        </h1>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-[rgba(255,255,255,0.4)]">
            Title
          </label>
          <input
            ref={title}
            className="form-input"
            id="title"
            type="text"
            required
            minLength={20}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="article" className="text-[rgba(255,255,255,0.4)]">
            Article
          </label>
          <textarea
            ref={article}
            className="form-input"
            id="article"
            rows={8}
            required
            minLength={20}
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="kategori" className="text-[rgba(255,255,255,0.4)]">
            Kategori
          </label>
          <select
            ref={categoris}
            className="rounded-sm outline-none border-none form-input text-[rgba(0,0,0,0.6)]"
            required
          >
            <option value="" hidden>
              KATEGORI
            </option>

            {kategori.length > 0
              ? kategori.map((val) => (
                  <option key={val.id} value={val.name}>
                    {val.name}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="img" className="text-[rgba(255,255,255,0.4)]">
            Image
          </label>
          <input
            ref={image}
            className="form-input file"
            id="img"
            type="file"
            accept=".png,.webp,.jpeg,.jpg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[rgba(255,255,255,0.5)] px-[20px] py-[5px] text-[1.2rem] rounded-md font-semibold text-[rgba(0,0,0,0.5)]"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default FormArticle;
