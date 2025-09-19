import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnuntCard from "../components/AnuntCard";

export default function Home() {
  const [locatie, setLocatie] = useState("");
  const [tip, setTip] = useState("");
  const [camere, setCamere] = useState("");
  const [anunturi, setAnunturi] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (locatie) query.append("locatie", locatie);
    if (tip) query.append("categorie", tip);
    if (camere) query.append("camere", camere);
    navigate(`/anunturi?${query.toString()}`);
  };

  return (
    <div>
      {/* HERO */}
      <section
        className="relative h-72 md:h-96 flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560185127-6ed189bf02d2?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-800/60"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Anunțuri imobiliare în Oltenița
          </h1>
          <p className="text-lg mb-6">
            Găsește cele mai bune oferte de vânzare, cumpărare și închiriere
          </p>
          <Link
            to="/anunturi"
            className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 inline-block"
          >
            Vezi oferte
          </Link>
        </div>
      </section>

      {/* BARA DE CĂUTARE RAPIDĂ */}
      <div className="max-w-4xl mx-auto -mt-10 bg-white shadow-lg rounded-lg p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Locație */}
          <input
            type="text"
            placeholder="Introdu locația..."
            value={locatie}
            onChange={(e) => setLocatie(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />

          {/* Tip imobil */}
          <select
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option value="">Tip imobil</option>
            <option value="apartament">Apartament</option>
            <option value="casa">Casă / Vilă</option>
            <option value="teren">Teren</option>
            <option value="garaj">Garaj</option>
          </select>

          {/* Camere */}
          <select
            value={camere}
            onChange={(e) => setCamere(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option value="">Nr. camere</option>
            <option value="1">1 cameră</option>
            <option value="2">2 camere</option>
            <option value="3">3 camere</option>
            <option value="4+">4+ camere</option>
          </select>

          {/* Buton căutare */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
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
          <p className="text-gray-600">
            Nu există anunțuri momentan sau se încarcă...
          </p>
        )}
      </section>
    </div>
  );
}
