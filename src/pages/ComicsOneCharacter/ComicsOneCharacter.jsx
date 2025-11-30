import "./ComicsOneCharacter.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect} from "react";

const ComicsOneCharacter = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const comics = location.state?.comics || [];
  const picture_url = location.state?.picture_url || "";
  const character = location.state?.character || "";

  useEffect(() => {
    const fetchComics = async () => {
      const comicsData = [];

      for (const comic_id of comics) {// Pour chaque id de comics, des informations sur le comic sont récupérées.
        try {
          const res = await axios.get(
            `https://site--marvel-backend--pkglxxvkdlsq.code.run/comic/${comic_id}`
          );
          comicsData.push(res.data);
        } catch (error) {
          console.log(`Erreur pour l'ID ${comic_id}:`, error.message);
        }
      }
      setData(comicsData);
      console.log(comicsData);
      setIsLoading(false);
    };

    fetchComics();
  }, [comics]);

  return (
    <main className="mainOneCharacter">
      {isLoading ? (
        <div className="Loading">
          <p>Superheroes on standby… Evil forces approaching…</p>
        </div>
      ) : (
        <>
          <img src={picture_url} className="charater_pict" />
          <div className="container_ComicsOneCharacter">
            <h1>Where you can know more about</h1>
            <p>{character}</p>

            <section className="ComicsOneCharacter">
              {data.map((comic) => ( //Les comics associés sont affichés un à un
                <article key={`${comic._id}`}>
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt={comic.title}
                  />
                  <h3>{comic.title}</h3>
                </article>
              ))}
            </section>
          </div>
          <img src={picture_url} className="charater_pict" />
        </>
      )}
    </main>
  );
};

export default ComicsOneCharacter;
