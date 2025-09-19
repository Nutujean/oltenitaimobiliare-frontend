import { useEffect, useState } from "react";
import AnuntCard from "../components/AnuntCard";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);

  useEffect(() => {
    fetch("https://imobila-market-backend.onrender.com/api/anunturi")
      .then((res) => res.json())
      .then((data) => setAnunturi(data))
      .catch((err) => console.error("Eroare la fetch anunturi:", err));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Anunțuri imobiliare în Oltenița
        </h1>
        <p className="text-lg mb-6">
          Găsește cele mai bune oferte de vânzare, cumpărare și închiriere
        </p>
        <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300">
          Vezi oferte
        </button>
      </section>

      {/* BARA DE CĂUTARE RAPIDĂ */}
      <div className="max-w-4xl mx-auto -mt-10 bg-white shadow-lg rounded-lg p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Introdu locația..."
            className="border rounded-lg px-3 py-2 w-full"
          />
          <select className="border rounded-lg px-3 py-2 w-full">
            <option>Tip imobil</option>
            <option>Apartament</option>
            <option>Casă</option>
            <option>Teren</option>
            <option>Garaj</option>
          </select>
          <select className="border rounded-lg px-3 py-2 w-full">
            <option>Nr. camere</option>
            <option>1 cameră</option>
            <option>2 camere</option>
            <option>3 camere</option>
            <option>4+ camere</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Caută
          </button>
        </div>
      </div>

      {/* ANUNȚURI RECENTE */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">📢 Anunțuri recente</h2>
        {anunturi.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {anunturi.map((anunt) => (
              <AnuntCard key={anunt._id} anunt={anunt} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nu există anunțuri momentan.</p>
        )}
      </section>
    </div>
  );
}
