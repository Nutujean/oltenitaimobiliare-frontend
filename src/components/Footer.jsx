import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Logo și descriere */}
        <div>
          <h2 className="text-xl font-bold mb-2">
            Oltenita<span className="text-yellow-300">Imobiliare.ro</span>
          </h2>
          <p className="text-sm text-gray-200">
            Platformă locală pentru vânzări, cumpărări și închirieri de imobile
            în Oltenița și împrejurimi.
          </p>
        </div>

        {/* Link-uri utile */}
        <div>
          <h3 className="font-semibold mb-2">Link-uri utile</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/despre" className="hover:text-yellow-300">Despre noi</Link></li>
            <li><Link to="/termeni" className="hover:text-yellow-300">Termeni și condiții</Link></li>
            <li><Link to="/confidentialitate" className="hover:text-yellow-300">Politica de confidențialitate</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300">Contact</Link></li>
          </ul>
        </div>

        {/* Contact rapid */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm">📍 Oltenița, Călărași</p>
          <p className="text-sm">📞 0722 000 000</p>
          <p className="text-sm">✉️ contact@oltenitaimobiliare.ro</p>
        </div>
      </div>

      {/* Linie de jos */}
      <div className="bg-blue-700 text-center text-sm py-3">
        © {new Date().getFullYear()} OltenitaImobiliare.ro — Toate drepturile rezervate
      </div>
    </footer>
  );
}
