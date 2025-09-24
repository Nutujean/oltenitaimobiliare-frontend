import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold">
            OltenitaImobiliare.ro
          </Link>

          {/* MENIU */}
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-gray-200">
              Acasă
            </Link>
            <Link to="/adauga" className="hover:text-gray-200">
              Adaugă Anunț
            </Link>
            <Link to="/anunturile-mele" className="hover:text-gray-200">
              Anunțurile Mele
            </Link>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
