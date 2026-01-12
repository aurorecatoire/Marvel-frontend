import "./Characters.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import NumberPages from "../../assets/NumberPages"; // nombre de page à afficher 
import { GoHeartFill } from "react-icons/go";
import addFave from "../../assets/AddFave";
import removeFave from "../../assets/RemoveFave";
import blackWidow from "../../assets/img/Characters/black_widow.webp";
import captainAmerica from "../../assets/img/Characters/captain_america.jpg";
const Characters = ({ charactersFave, setCharactersFave }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [numberPage, setNumberPage] = useState([]);
  const limit = 100;

  useEffect(() => {
    console.log("Favoris :", charactersFave);
  }, [charactersFave]);

  const loadPage = async (page) => {
    const skip = (page - 1) * limit;

    try {
      const result = await axios.get(
        `https://site--marvel-backend--pkglxxvkdlsq.code.run/characters?limit=${limit}&skip=${skip}&name=${search}`
      );
      setData(result.data);
      setNumberPage(NumberPages(page, result.data.count));
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Recharger à chaque fois que la page change ou la recherche change
    loadPage(page);
  }, [page, search]);

  const filteredCharacters = //Fonction qui filtre les personnages en fonction de la recherche
    data?.results?.filter((character) => {
      if (!character.name) return false;
      const nameLower = character.name.toLowerCase();
      const searchWords = search.trim().toLowerCase().split(" ");
      return searchWords.every((word) => nameLower.includes(word));
    }) || [];

  return (
    <main className="characters_main">
      {isLoading ? (
        <div className="Loading">
          <p>Superheroes on standby… Evil forces approaching…</p>
        </div>
      ) : (
        <>
          <img alt="black Widow" src={blackWidow} className="characters_side" />
          <div className="All_characters_container">
            <h1>Beyond the Mask</h1>
            <div className="searchSection">
              <FaSearch className="searchIcon" /> {/* Barre de recherche */}
              <input
                type="text"
                placeholder="Find your character"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="characters_container">
              {filteredCharacters.map((character) => {
                //Affichage des personnages
                const picture_info =
                  character.thumbnail.path +
                  "." +
                  character.thumbnail.extension;
                const isFave = charactersFave.includes(character._id);
                return (
                  <article key={character._id} className="characterArticle">
                    <img
                      onClick={() =>
                        navigate(`/character/${character._id}`, {
                          // Quand on clique sur le titre ou la description, on arrive sur la page des comics où le personnage apparait 
                          state: {
                            comics: character.comics,
                            picture_url: picture_info,
                            character: character.name,
                          },
                        })
                      }
                      alt={character.name}
                      src={picture_info}
                      className="character_picture"
                    />
                    <GoHeartFill
                      className={isFave ? "favorite" : "notFavorite"}
                      onClick={() => {
                        charactersFave.includes(character._id)
                          ? removeFave({
                              array: charactersFave,
                              element: character._id,
                              setArray: setCharactersFave,
                            })
                          : addFave({
                              array: charactersFave,
                              element: character._id,
                              setArray: setCharactersFave,
                            });
                      }}
                    />
                    <h2
                      onClick={() =>
                        navigate(`/character/${character._id}`, {
                          // Quand on clique sur le titre ou la description, on arrive sur la page des comics où le personnage apparait
                          state: {
                            comics: character.comics,
                            picture_url: picture_info,
                            character: character.name,
                          },
                        })
                      }
                    >
                      {character.name}
                    </h2>
                    <p
                      onClick={() =>
                        navigate(`/character/${character._id}`, {
                          state: {
                            comics: character.comics,
                            picture_url: picture_info,
                            character: character.name,
                          },
                        })
                      }
                    >
                      {character.description}
                    </p>
                  </article>
                );
              })}
            </div>
            {/* Pagination */}

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
          <img
            alt="captain America"
            src={captainAmerica}
            className="characters_side"
          />
        </>
      )}
    </main>
  );
};

export default Characters;
