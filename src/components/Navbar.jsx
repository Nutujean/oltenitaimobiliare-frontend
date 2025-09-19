import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide">
            Oltenita<span className="text-yellow-300">Imobiliare.ro</span>
          </Link>

          {/* MENIU DESKTOP */}
          <div className="hidden md:flex space-x-6 items-center font-medium">
            <Link to="/" className="hover:text-yellow-300">Acasă</Link>
            <Link to="/adauga-anunt" className="hover:text-yellow-300">Adaugă Anunț</Link>
            <Link to="/anunturile-mele" className="hover:text-yellow-300">Anunțurile Mele</Link>
            <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-lg hover:bg-yellow-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* BUTON HAMBURGER MOBILE */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENIU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pt-2 pb-4 space-y-2 font-medium">
          <Link to="/" className="block hover:text-yellow-300">Acasă</Link>
          <Link to="/adauga-anunt" className="block hover:text-yellow-300">Adaugă Anunț</Link>
          <Link to="/anunturile-mele" className="block hover:text-yellow-300">Anunțurile Mele</Link>
          <Link to="/contact" className="block hover:text-yellow-300">Contact</Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-yellow-400 text-blue-900 px-3 py-1 rounded-lg hover:bg-yellow-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
