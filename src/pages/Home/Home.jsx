import "./Home.css";
import presentation from "../../assets/videos/Marvel_Comics_Intro.mp4";
import spiderman from "../../assets/img/HomeSide/spiderman.jpg"
import venom from "../../assets/img/HomeSide/venom.jpg"
import scarlet from "../../assets/img/HomeSide/scarletWitch.jpg"
import hulk from "../../assets/img/HomeSide/hulk.jpg"
const Home = () => {
  return (
    <main className="mainHome">
      <img alt="spiderman" src={spiderman} className="spiderman"/>
      <img alt="venom" src={venom} className="venom"/>
    <div className="container_Home">
      <p>Heroes aren’t born. They’re made.</p>
      <video autoPlay muted loop className="videoHome">
        <source src={presentation} type="video/mp4" />
      </video>
    </div>
    <img alt="hulk" src={hulk}/>
      <img alt="scarlet" src={scarlet}/>
    </main>
  );
};

export default Home;
