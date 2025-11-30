import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import Favorites from "./pages/Favorites/Favorites";
import ComicsOneCharacter from "./pages/ComicsOneCharacter/ComicsOneCharacter";
import { useState } from "react";
import Footer from "./components/Footer/Footer";

function App() {
  const [comicsFave, setComicsFave] = useState("");
  const [charactersFave, setCharactersFave] = useState("");
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={
              <Characters
                charactersFave={charactersFave}
                setCharactersFave={setCharactersFave}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics comicsFave={comicsFave} setComicsFave={setComicsFave} />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                charactersFave={charactersFave}
                comicsFave={comicsFave}
              />
            }
          />
          <Route
            path="/character/:characterId"
            element={<ComicsOneCharacter />}
          />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
