import { useState } from "react";

export default function Home() {
  const [locatie, setLocatie] = useState("");
  const [tip, setTip] = useState("");
  const [camere, setCamere] = useState("");

  const handleSearch = () => {
    alert(`Cauți în: ${locatie}, tip: ${tip}, camere: ${camere}`);
    // aici facem redirect la pagina de listare filtrată
  };

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
        {/* aici bagi cardurile cu anunțuri */}
      </section>
    </div>
  );
}
