import { useState, useEffect } from "react";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("");
  const [camere, setCamere] = useState("");
  const [pretMin, setPretMin] = useState("");
  const [pretMax, setPretMax] = useState("");
  const [sortare, setSortare] = useState("");

  useEffect(() => {
    fetchAnunturi();
  }, [search, categorie, camere, pretMin, pretMax, sortare]);

  const fetchAnunturi = async () => {
    try {
      let url = "https://imobila-market-backend.onrender.com/api/anunturi?";

      if (search) url += `search=${search}&`;
      if (categorie) url += `categorie=${categorie}&`;
      if (camere) url += `camere=${camere}&`;
      if (pretMin) url += `pretMin=${pretMin}&`;
      if (pretMax) url += `pretMax=${pretMax}&`;
      if (sortare) url += `sort=${sortare}&`;

      const res = await fetch(url);
      const data = await res.json();
      setAnunturi(data);
    } catch (err) {
      console.error("Eroare la încărcarea anunțurilor:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Formular filtre */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Căutare */}
        <input
          type="text"
          placeholder="Caută..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />

        {/* Categorie */}
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Toate categoriile</option>
          <option value="apartament">Apartamente</option>
          <option value="casa">Case</option>
          <option value="teren">Terenuri</option>
          <option value="garaj">Garaje</option>
          <option value="spatiu_comercial">Spațiu comercial</option>
        </select>

        {/* Camere */}
        <select
          value={camere}
          onChange={(e) => setCamere(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Toate</option>
          <option value="garsoniera">Garsonieră</option>
          <option value="2">2 camere</option>
          <option value="3">3 camere</option>
          <option value="4">4 camere</option>
        </select>

        {/* Preț min/max */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Preț min"
            value={pretMin}
            onChange={(e) => setPretMin(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
          <input
            type="number"
            placeholder="Preț max"
            value={pretMax}
            onChange={(e) => setPretMax(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Sortare */}
        <select
          value={sortare}
          onChange={(e) => setSortare(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Sortează după</option>
          <option value="newest">Cele mai noi</option>
          <option value="asc">Preț crescător</option>
          <option value="desc">Preț descrescător</option>
        </select>
      </div>

      {/* Listă anunțuri */}
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
                <p className="text-gray-600 text-sm truncate">
                  {anunt.descriere}
                </p>
                <p className="font-bold text-blue-600 mt-2">{anunt.pret} €</p>
                <p className="text-xs text-gray-500">{anunt.categorie}</p>
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
  );
}
