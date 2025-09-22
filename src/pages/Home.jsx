import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("");
  const [tranzactie, setTranzactie] = useState("");

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const res = await fetch(`${API_URL}/api/anunturi`);
        const data = await res.json();
        setAnunturi(data);
      } catch (err) {
        console.error("Eroare la încărcarea anunțurilor:", err);
      }
    };
    fetchAnunturi();
  }, []);

  const filtrate = anunturi.filter((a) => {
    return (
      (search === "" ||
        a.titlu.toLowerCase().includes(search.toLowerCase()) ||
        a.descriere.toLowerCase().includes(search.toLowerCase())) &&
      (categorie === "" || a.categorie === categorie) &&
      (tranzactie === "" || a.tranzactie === tranzactie)
    );
  });

  return (
    <div>
      {/* HERO */}
      <div
        className="bg-cover bg-center h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold bg-black bg-opacity-50 px-6 py-2 rounded">
          Anunțuri Imobiliare în Oltenița
        </h1>
      </div>

      {/* BARA DE CĂUTARE + FILTRE */}
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 shadow-md -mt-8 relative z-10 rounded">
        <input
          type="text"
          placeholder="Caută după titlu sau descriere..."
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
          <option value="Terenuri">Terenuri</option>
          <option value="Garaje">Garaje</option>
          <option value="Spatii comerciale">Spații comerciale</option>
        </select>

        <select
          value={tranzactie}
          onChange={(e) => setTranzactie(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Toate tranzacțiile</option>
          <option value="Vanzare">Vânzare</option>
          <option value="Inchiriere">Închiriere</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setCategorie("");
            setTranzactie("");
          }}
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Resetează
        </button>
      </div>

      {/* LISTĂ ANUNȚURI */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrate.length > 0 ? (
          filtrate.map((a) => (
            <div
              key={a._id}
              className="border rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              {a.imagini && a.imagini.length > 0 ? (
                <img
                  src={`${API_URL}${a.imagini[0]}`}
                  alt={a.titlu}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/400x250?text=Fara+imagine"
                  alt="Fara imagine"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{a.titlu}</h2>
                <p className="text-sm text-gray-600">{a.categorie}</p>
                <p className="text-blue-600 font-bold">{a.pret} €</p>
                <Link
                  to={`/anunt/${a._id}`}
                  className="inline-block mt-2 bg-green-600 text-white px-3 py-1 rounded"
                >
                  Detalii
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-600">
            Nu s-au găsit anunțuri.
          </p>
        )}
      </div>
    </div>
  );
}
