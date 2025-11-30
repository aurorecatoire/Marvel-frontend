import "./Header.css";
import Logo from "../../assets/img/Marvel_Logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Link to="/">
        <img alt="logo de Marvel" src={Logo} />
      </Link>
      <div className="menu">
        <Link to="/characters">
          <button>characters</button>
        </Link>
        <Link to="/comics">
          <button>comics</button>
        </Link>
        <Link to="/favorites">
          <button>favorites</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
