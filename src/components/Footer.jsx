export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">
            OltenitaImobiliare.ro
          </h3>
          <p className="text-sm">
            Platformă locală pentru vânzarea și închirierea de imobile în
            Oltenița și împrejurimi.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Linkuri utile</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Despre noi
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Termeni și condiții
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Politica de confidențialitate
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: contact@oltenitaimobiliare.ro</li>
            <li>Telefon: +40 721 123 456</li>
            <li>Adresă: Str. Dunării 10, Oltenița</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} OltenitaImobiliare.ro – Toate drepturile
        rezervate.
      </div>
    </footer>
  );
}
