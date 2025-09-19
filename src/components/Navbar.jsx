import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // fix pentru JSON.parse undefined
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Eroare la citirea userului din localStorage", err);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Oltenița Imobiliare
        </Link>

        {/* Buton hamburger (mobil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Meniu desktop */}
        <div className="hidden md:flex space-x-3 items-center">
          <Link
            to="/"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Acasă
          </Link>
          <Link
            to="/adauga"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Adaugă anunț
          </Link>
          {token && (
            <Link
              to="/anunturile-mele"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Anunțurile mele
            </Link>
          )}
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold">{user?.nume || user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Meniu mobil */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 space-y-2">
          <Link
            to="/"
            className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Acasă
          </Link>
          <Link
            to="/adauga"
            className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            Adaugă anunț
          </Link>
          {token && (
            <Link
              to="/anunturile-mele"
              className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
              onClick={() => setMenuOpen(false)}
            >
              Anunțurile mele
            </Link>
          )}
          {!token ? (
            <>
              <Link
                to="/login"
                className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="block font-semibold">{user?.nume || user?.email}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
