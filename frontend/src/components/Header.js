import logo from "../images/logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ email, onLogout }) {
  const location = useLocation();
  if (location.pathname === "/") {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="logo" />

        <nav>
          <ul className="header__links">
            <p className="header__email">{email}</p>
            <button href="#" className="header__button" onClick={onLogout}>
              Выйти
            </button>
          </ul>
        </nav>
      </header>
    );
  }
  if (location.pathname === "/sign-up") {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="logo" />

        <nav>
          <ul className="header__links">
            <Link to="/sign-in" className="header__button">
              Войти
            </Link>
          </ul>
        </nav>
      </header>
    );
  }
  if (location.pathname === "/sign-in") {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="logo" />

        <nav>
          <ul className="header__links">
            <Link to="/sign-up" className="header__button">
              Регистрация
            </Link>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
