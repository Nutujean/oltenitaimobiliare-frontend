import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          Oltenita<span>Imobiliare</span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/">🏠 Acasă</Link></li>
          <li><Link to="/adauga-anunt">➕ Adaugă anunț</Link></li>
          <li><Link to="/anunturile-mele">📋 Anunțurile mele</Link></li>
          <li><Link to="/login">🔑 Login</Link></li>
          <li><Link to="/register">🆕 Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
