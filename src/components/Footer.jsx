import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Oltenita Imobiliare. Toate drepturile rezervate.</p>
        <ul className="footer-links">
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/despre-noi">Despre noi</Link></li>
          <li><Link to="/termeni">Termeni și condiții</Link></li>
          <li><Link to="/faq">Întrebări frecvente</Link></li>
          <li><Link to="/confidentialitate">Politica de confidențialitate</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
