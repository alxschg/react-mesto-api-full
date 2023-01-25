import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  if (location.pathname === "/") {
    return (
      <footer className="footer">
        <p className="footer__project">
          © {new Date().getFullYear()} Mesto Russia
        </p>
      </footer>
    );
  }
}

export default Footer;
