import Hero from "../components/Hero";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("");
  const [pretMax, setPretMax] = useState("");

  // referință la lista de anunțuri
  const listaRef = useRef(null);

  useEffect(() => {
    fetchAnunturi();
  }, []);

  const fetchAnunturi = async () => {
    try {
      let url = "https://imobila-market-backend.onrender.com/api/anunturi?";

      if (search) url += `search=${search}&`;
      if (categorie) url += `categorie=${categorie}&`;
      if (pretMax) url += `pretMax=${pretMax}&`;

      const res = await fetch(url);
      const data = await res.json();
      setAnunturi(data);

      // scroll automat la listă
      if (listaRef.current) {
        listaRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error("Eroare la încărcarea anunțurilor:", err);
    }
  };

  const resetFiltre = () => {
    setSearch("");
    setCategorie("");
    setPretMax("");
    fetchAnunturi();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === HERO === */}
      <Hero
        search={search}
        setSearch={setSearch}
        categorie={categorie}
        setCategorie={setCategorie}
        pretMax={pretMax}
        setPretMax={setPretMax}
        onCauta={fetchAnunturi}
        onReset={resetFiltre}
      />

      <div ref={listaRef} className="max-w-7xl mx-auto px-4 py-10">
        <h2 id="anunturi" className="text-2xl font-bold mb-6">
          Anunțuri recente
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anunturi.length > 0 ? (
            anunturi.map((anunt) => (
              <div
                key={anunt._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={
                    anunt.imagini?.[0] ||
                    "https://via.placeholder.com/400x250?text=Fără+imagine"
                  }
                  alt={anunt.titlu}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{anunt.titlu}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {anunt.descriere}
                  </p>
                  <p className="font-bold text-blue-600 mt-2">
                    {anunt.pret} €
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {anunt.categorie}
                  </p>
                  <Link
                    to={`/anunt/${anunt._id}`}
                    className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Detalii
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Nu am găsit anunțuri.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
