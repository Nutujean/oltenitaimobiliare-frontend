import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Col 1 - Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Oltenița Imobiliare</h2>
          <p className="text-sm text-gray-200">
            Platformă locală pentru anunțuri imobiliare: apartamente, case,
            terenuri și spații comerciale.
          </p>
        </div>

        {/* Col 2 - Linkuri utile */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Linkuri utile</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/despre-noi" className="hover:underline">
                Despre noi
              </Link>
            </li>
            <li>
              <Link to="/termeni" className="hover:underline">
                Termeni și condiții
              </Link>
            </li>
            <li>
              <Link to="/confidentialitate" className="hover:underline">
                Politica de confidențialitate
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 - Social + ANPC */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Urmărește-ne</h3>
          <div className="flex space-x-4 text-lg mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 w-8 h-8 flex items-center justify-center rounded-full hover:opacity-80"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/407xxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 w-8 h-8 flex items-center justify-center rounded-full hover:opacity-80"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 w-8 h-8 flex items-center justify-center rounded-full hover:opacity-80"
            >
              <FaYoutube />
            </a>
          </div>

          {/* Iconițe ANPC */}
          <div className="flex space-x-4">
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/anpc-sal.png"
                alt="ANPC SAL"
                className="h-10 bg-white p-1 rounded"
              />
            </a>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/anpc-sol.png"
                alt="ANPC SOL"
                className="h-10 bg-white p-1 rounded"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Subsol */}
      <div className="bg-blue-800 text-center py-3 text-sm">
        © {new Date().getFullYear()} Oltenița Imobiliare — Toate drepturile rezervate
      </div>
    </footer>
  );
}
