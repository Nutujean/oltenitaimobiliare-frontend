import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1 */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Imobilia Market</h2>
          <p className="text-sm">
            Platformă locală pentru vânzări și închirieri de apartamente,
            garsoniere, case și terenuri.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h3 className="font-semibold text-white mb-3">Link-uri utile</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/despre-noi" className="hover:text-white">
                Despre noi
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/termeni" className="hover:text-white">
                Termeni și condiții
              </Link>
            </li>
            <li>
              <Link to="/confidentialitate" className="hover:text-white">
                Politica de confidențialitate
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact rapid</h3>
          <p className="text-sm">📍 Oltenița, România</p>
          <p className="text-sm">📧 contact@imobilia.ro</p>
          <p className="text-sm">📞 +40 721 123 456</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Imobilia Market. Toate drepturile rezervate.
      </div>
    </footer>
  );
}
