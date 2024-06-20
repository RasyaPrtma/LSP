/* eslint-disable react-hooks/exhaustive-deps */
import ListUserArticle from "../articles/ListUserArticle";
import NavBar from "./NavBar";
import { useArticle } from "../articles/ArticleContext";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import FormArticle from "../articles/FormArticle";
import FormArticleEdit from "../articles/FormArticleEdit";

/**
 * Komponen tata letak artikel yang mengatur tampilan daftar artikel pengguna, formulir pembuatan artikel, dan formulir pengeditan artikel.
 * @returns {JSX.Element} Komponen tata letak artikel.
 */
const ArticleLayout = () => {
  const { getUserArticle, userArticle, getImage, Edit, editId } = useArticle();
  const { token } = useAuth();

  /**
   * Mengambil artikel pengguna saat komponen dimuat.
   * @returns {void}
   */
  useEffect(() => {
    getUserArticle(token);
  }, [token]);

  return (
    <>
      <NavBar />
      {editId !== null ? (
        <FormArticleEdit
          values={
            userArticle.length > 0
              ? userArticle.find((data) => data.id === editId)
              : null
          }
        />
      ) : (
        <FormArticle />
      )}
      <ListUserArticle
        token={token}
        userArticle={userArticle}
        Edit={Edit}
        getImage={getImage}
      />
    </>
  );
};

export default ArticleLayout;
