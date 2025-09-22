import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Imobilia Market
        </Link>

        {/* Meniu desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Acasă
          </Link>
          <Link to="/adauga-anunt" className="hover:text-gray-200">
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

        {/* Buton mobil */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Meniu mobil */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:text-gray-200">
            Acasă
          </Link>
          <Link to="/adauga-anunt" className="block hover:text-gray-200">
            Adaugă Anunț
          </Link>
          <Link to="/anunturile-mele" className="block hover:text-gray-200">
            Anunțurile Mele
          </Link>
          <Link to="/login" className="block hover:text-gray-200">
            Login
          </Link>
          <Link to="/register" className="block hover:text-gray-200">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
