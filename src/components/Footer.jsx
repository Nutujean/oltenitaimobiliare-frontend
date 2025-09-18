import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p>
        <Link to="/termeni">Termeni și Condiții</Link> |{" "}
        <Link to="/confidentialitate">Politica de Confidențialitate</Link> |{" "}
        <Link to="/contact">Contact</Link> |{" "}
        <Link to="/despre-noi">Despre Noi</Link>
      </p>
      <p>© {new Date().getFullYear()} OltenitaImobiliare.ro</p>
    </footer>
  );
}

export default Footer;
