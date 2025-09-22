import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Imobilia Market
        </Link>

        {/* Meniu Desktop */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li>
            <Link to="/" className="hover:text-gray-200">Acasă</Link>
          </li>
          <li>
            <Link to="/adauga-anunt" className="hover:text-gray-200">Adaugă anunț</Link>
          </li>
          <li>
            <Link to="/anunturile-mele" className="hover:text-gray-200">Anunțurile mele</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-200">Register</Link>
          </li>
        </ul>

        {/* Buton Mobil */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Meniu Mobil */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 space-y-3">
          <Link to="/" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Acasă</Link>
          <Link to="/adauga-anunt" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Adaugă anunț</Link>
          <Link to="/anunturile-mele" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Anunțurile mele</Link>
          <Link to="/login" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Register</Link>
        </div>
      )}
    </nav>
  );
}
