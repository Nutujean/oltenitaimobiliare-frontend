import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🏠 Oltenita Imobiliare</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Acasă</Link></li>
        <li><Link to="/adauga-anunt">➕ Adaugă anunț</Link></li>
        {token && <li><Link to="/anunturile-mele">📋 Anunțurile mele</Link></li>}
        {!token && <li><Link to="/login">🔑 Login</Link></li>}
        {!token && <li><Link to="/register">🆕 Register</Link></li>}
      </ul>
    </nav>
  );
}

export default Navbar;
