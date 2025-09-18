import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // importăm stilurile din fișierul CSS separat

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">OltenitaImobiliare.ro</Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Acasă</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/adauga-anunt">Adaugă anunț</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/anunturile-mele">Anunțurile mele</Link>
          </li>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {/* Linkuri informative */}
        <li>
          <Link to="/despre-noi">Despre noi</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
