import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + descriere */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">OltenițaImobiliare.ro</h2>
          <p className="text-sm">
            Platformă locală pentru anunțuri imobiliare în Oltenița și împrejurimi.
            Cumpără, vinde sau închiriază rapid apartamente, case, terenuri și garaje.
          </p>

          {/* Social */}
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 320 512" className="h-6 w-6" fill="#1877F2">
                <path d="M279.14 288l14.22-92.66h-88.91V127.77c0-25.35 12.42-50.06 52.24-50.06H293V6.26S273.5 0 252.36 0c-73.14 0-121.14 44.38-121.14 124.72V195.3H86.41V288h44.81v224h92.66V288z"/>
              </svg>
            </a>
            <a href="https://wa.me/407xxxxxxxx" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 448 512" className="h-6 w-6" fill="#25D366">
                <path d="M380.9 97.1C339-2.3 236.1-33.5 144.3 8.5 71.9 41.2 28.3 113.2 28.3 190c0 33.8 8.8 66.8 25.5 95.8L0 512l230.3-60.8c28.2 7.8 57.6 11.8 87.3 11.8 81.8 0 157.5-44.4 194.9-116.6 43.5-81.6 12.7-184.9-53.6-249.3zM236.1 403.1c-23.1 0-45.8-5.9-66.1-17.1l-4.7-2.6-136 35.9 36.5-132.5-3.1-5.1c-15.6-25.6-23.8-55.1-23.8-85.2 0-92.7 75.4-168.1 168.1-168.1 45 0 87.3 17.5 119.1 49.3 31.8 31.8 49.3 74.1 49.3 119.1 0 92.7-75.4 168.1-168.1 168.1z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 576 512" className="h-6 w-6" fill="#FF0000">
                <path d="M549.7 124.1c-6.3-23.6-24.8-42.1-48.3-48.3C464.2 64 288 64 288 64s-176.2 0-213.4 11.8c-23.6 6.3-42.1 24.8-48.3 48.3C15 161.3 15 256 15 256s0 94.7 11.3 131.9c6.3 23.6 24.8 42.1 48.3 48.3C111.8 448 288 448 288 448s176.2 0 213.4-11.8c23.6-6.3 42.1-24.8 48.3-48.3C561 350.7 561 256 561 256s0-94.7-11.3-131.9zM232 334V178l142 78-142 78z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Link-uri utile */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Link-uri utile</h3>
          <ul className="space-y-2">
            <li><Link to="/anunturi" className="hover:text-white">Anunțuri</Link></li>
            <li><Link to="/adauga-anunt" className="hover:text-white">Adaugă anunț</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/despre" className="hover:text-white">Despre noi</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/termeni" className="hover:text-white">Termeni și condiții</Link></li>
            <li><Link to="/confidentialitate" className="hover:text-white">Politica de confidențialitate</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Oltenița, România</li>
            <li>📧 contact@oltenitaimobiliare.ro</li>
            <li>📞 +40 7xx xxx xxx</li>
          </ul>
        </div>
      </div>

      {/* Bara de jos cu ANPC */}
      <div className="bg-gray-800 py-4 text-center text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <p>© {new Date().getFullYear()} OltenițaImobiliare.ro — Toate drepturile rezervate.</p>

        {/* Bannere ANPC din public/ */}
        {/* Bannere ANPC */}
<div className="flex gap-6 items-center">
  <a
    href="https://anpc.ro/ce-este-sal/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://i.postimg.cc/W3nr6Ynp/sal-banner.png"
      alt="Soluționarea Alternativă a Litigiilor - SAL"
      className="h-14"
    />
  </a>
  <a
    href="https://ec.europa.eu/consumers/odr"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://i.postimg.cc/jSZFm8my/sol-banner.png"
      alt="Soluționarea Online a Litigiilor - SOL"
      className="h-14"
    />
  </a>
</div>
      </div>
    </footer>
  );
}
