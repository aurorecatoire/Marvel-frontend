// Page dédiée à l'affichage des favoris


import "./Favorites.css";
import axios from "axios";
import { useState, useEffect } from "react";
import NoFavorite from "../../assets/img/No_favorite.jpg";
import heart from "../../assets/img/Favorites/heart.jpg";


const Favorites = ({ charactersFave, comicsFave }) => {
  if (charactersFave.length === 0 && comicsFave.length === 0) //Dans le cas où aucun favoris n'a été sélectionné
    return (
      <div className="no_favorite">
        <h1>Oops… looks like your superhero squad is on vacation!</h1>
        <img
          alt="Meme of wakanda saying wakanda nonsense is this ?"
          src={NoFavorite}
        />
      </div>
    ); 

  const [dataComics, setDataComics] = useState([]);
  const [dataCharacter, setDataCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { /* Pour aller chercher les informations sur un personnage*/
    const fetchCharacter = async () => {
      const characters = [];
      try {
        for (const characters_id of charactersFave) {
          const result = await axios.get(
            `https://site--marvel-backend--pkglxxvkdlsq.code.run/character/${characters_id}`
          );
          characters.push(result.data);
        }
        setDataCharacter(characters);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchCharacter();
  }, [charactersFave]);

  useEffect(() => {
    const fetchComics = async () => {/* Pour aller chercher les informations sur un comic*/
      const comics = [];
      try {
        for (const comic_id of comicsFave) {
          const result = await axios.get(
            `https://site--marvel-backend--pkglxxvkdlsq.code.run/comic/${comic_id}`
          );
          comics.push(result.data);
        }
        setDataComics(comics);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchComics();
  }, [comicsFave]);
  return (
    <main className="favoriteMain">
      {isLoading ? (
        <div className="Loading">
          <p>Superheroes on standby… Evil forces approaching…</p>
        </div>
      ) : (
        <>
          <img alt="ironman heart" src={heart} className="ironHeart" />

          <div className="favorites_container">
            <h1>My Marvel Vault</h1>
            <h2>Squad</h2>
            <section className="characterShow">
              {dataCharacter.map((character) => { //Affichage des différents personnages préférés
                const picture_info =
                  character.thumbnail.path +
                  "." +
                  character.thumbnail.extension;
                return (
                  <article>
                    <img
                      alt={character.name}
                      src={picture_info}
                      className="character_picture"
                    />
                    <h3>{character.name}</h3>
                  </article>
                );
              })}
            </section>
            <h2>Adventures</h2>

            <section className="comicShow">
              {dataComics.map((comic) => { //Affichage des différents comics préférés
                const picture_info =
                  comic.thumbnail.path + "." + comic.thumbnail.extension;
                return (
                  <article>
                    <img
                      alt={comic.title}
                      src={picture_info}
                      className="comic_picture"
                    />
                    <h3>{comic.title}</h3>
                  </article>
                );
              })}
            </section>
          </div>
          <img alt="ironman heart" src={heart} className="ironHeart" />
        </>
      )}
    </main>
  );
};

export default Favorites;
