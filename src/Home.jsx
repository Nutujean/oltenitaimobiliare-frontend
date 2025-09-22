import React, { useEffect, useState } from "react";
import API_URL from "../api";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("");
  const [pretMin, setPretMin] = useState("");
  const [pretMax, setPretMax] = useState("");

  useEffect(() => {
    fetchAnunturi();
  }, []);

  const fetchAnunturi = async () => {
    try {
      const res = await fetch(`${API_URL}/api/anunturi`);
      const data = await res.json();
      setAnunturi(data);
    } catch (err) {
      console.error("Eroare la încărcarea anunțurilor:", err);
    }
  };

  const anunturiFiltrate = anunturi.filter((a) => {
    const matchSearch =
      a.titlu.toLowerCase().includes(search.toLowerCase()) ||
      a.descriere.toLowerCase().includes(search.toLowerCase());

    const matchCategorie = categorie ? a.categorie === categorie : true;

    const matchPret =
      (!pretMin || a.pret >= pretMin) && (!pretMax || a.pret <= pretMax);

    return matchSearch && matchCategorie && matchPret;
  });

  return (
    <div>
      {/* ===== Banner Hero ===== */}
      <section
        className="relative bg-cover bg-center h-[300px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Am scos complet overlay-ul negru */}
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          Anunțuri Imobiliare în Oltenița
        </h1>
      </section>

      {/* ===== Bara de căutare și filtre ===== */}
      <section className="p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Caută anunț..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Toate categoriile</option>
            <option value="Apartamente">Apartamente</option>
            <option value="Case">Case</option>
            <option value="Garsoniere">Garsoniere</option>
            <option value="Terenuri">Terenuri</option>
            <option value="Garaje">Garaje</option>
            <option value="Spatiu comercial">Spațiu comercial</option>
          </select>
          <input
            type="number"
            placeholder="Preț minim"
            value={pretMin}
            onChange={(e) => setPretMin(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Preț maxim"
            value={pretMax}
            onChange={(e) => setPretMax(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </section>

      {/* ===== Lista anunțuri ===== */}
      <section className="p-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {anunturiFiltrate.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center">
            Niciun anunț găsit.
          </p>
        ) : (
          anunturiFiltrate.map((a) => (
            <div
              key={a._id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={
                  a.imagini?.[0] ||
                  "https://via.placeholder.com/400x250?text=Fără+imagine"
                }
                alt={a.titlu}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{a.titlu}</h2>
                <p className="text-gray-600">{a.descriere}</p>
                <p className="text-blue-600 font-bold mt-2">{a.pret} €</p>
                <p className="text-sm text-gray-500">{a.categorie}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
