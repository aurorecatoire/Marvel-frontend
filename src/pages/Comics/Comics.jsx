import "./Comics.Css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import NumberPages from "../../assets/NumberPages"; //fonction qui donne le champ du nombre de pages à afficher
import { GoHeartFill } from "react-icons/go";
import addFave from "../../assets/AddFave";
import removeFave from "../../assets/RemoveFave";
import war from "../../assets/img/Comics/othercomic.jpg";
import avengers from "../../assets/img/Comics/avenger.jpg";

const Comics = ({ comicsFave, setComicsFave }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [numberPage, setNumberPage] = useState([]);
  const limit = 100;

  useEffect(() => {
    console.log("Favoris :", comicsFave);
  }, [comicsFave]);

  const loadPage = async (page) => {
    //Fonction indiquant la page à charger
    const skip = (page - 1) * limit;
    try {
      const result = await axios.get(
        `https://site--marvel-backend--pkglxxvkdlsq.code.run/comics?limit=${limit}&skip=${skip}&title=${search}`
      );
      setData(result.data);
      setNumberPage(NumberPages(page, result.data.count));
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    //recharger à chaque fois que la page change
    loadPage(page);
  }, [page, search]);

  const filteredComics =
    data?.results?.filter((comic) => {
      //Tri des comics en fonction de la recherche de l'utilisateur.
      if (!comic.title) return false;
      const titleLower = comic.title.toLowerCase();
      const searchWords = search.trim().toLowerCase().split(" ");
      return searchWords.every((word) => titleLower.includes(word));
    }) || [];

  return (
    <main className="comics_main">
      {isLoading ? (
        <div className="Loading">
          <p>Superheroes on standby… Evil forces approaching…</p>
        </div>
      ) : (
        <>
          <img alt="Avengers comic" src={avengers} className="comics_side" />
          <div className="All_comics_container">
            <h1>The Marvel Chronicles</h1>
            <div className="searchSection"> 
              <FaSearch className="searchIcon" /> 
              <input /* barre de recherche*/
                type="text"
                placeholder="Find your comic"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              /> 
            </div>
            <div className="comics_container">
              {filteredComics.map((comic) => {
                const picture_info = /* url de l'image*/
                  comic.thumbnail.path + "." + comic.thumbnail.extension;
                const isFave = comicsFave.includes(comic._id);
                return (
                  <article key={comic._id} className="comicArticle">
                    <img
                      alt={comic.title}
                      src={picture_info}
                      className="comic_picture"
                    />
                    <h2>{comic.title}</h2>
                    <p>{comic.description}</p>
                    <GoHeartFill
                      className={isFave ? "favorite" : "notFavorite"}
                      onClick={() => { 
                        {
                          comicsFave.includes(comic._id)
                            ? removeFave({  //Si on enleve le comics des favoris
                                array: comicsFave,
                                element: comic._id,
                                setArray: setComicsFave,
                              })
                            : addFave({ //Ajout du comics en favoris
                                array: comicsFave,
                                element: comic._id,
                                setArray: setComicsFave,
                              });
                        }
                      }}
                    />
                  </article>
                );
              })}
            </div>
            <div className="pagination_bottom">
              <button
                className={page > 1 ? "previousButton" : "hide"}
                onClick={() => setPage(page - 1)}
              >
                &lt;
              </button>

              {numberPage.map((p) => (
                <button
                  key={p}
                  className={p === page ? "onPage" : "offPage"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}

              <button
                className={page < 15 ? "afterButton" : "hide"}
                onClick={() => setPage(page + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
          <img alt="Secret war comic" src={war} className="comics_side" />
        </>
      )}
    </main>
  );
};

export default Comics;
