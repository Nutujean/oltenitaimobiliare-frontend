import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [error, setError] = useState("");

  // 🔹 State pentru filtrare
  const [locatie, setLocatie] = useState("");
  const [categorie, setCategorie] = useState("");
  const [tranzactie, setTranzactie] = useState("");
  const [pretMin, setPretMin] = useState("");
  const [pretMax, setPretMax] = useState("");
  const [camere, setCamere] = useState("");
  const [suprafataMin, setSuprafataMin] = useState("");

  // 🔹 Funcție care face request la backend cu filtre
  const fetchAnunturi = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(
        `https://imobila-market-backend.onrender.com/api/anunturi?${query}`
      );
      const data = await response.json();

      if (response.ok) {
        setAnunturi(data);
      } else {
        setError(data.error || "Eroare la încărcarea anunțurilor");
      }
    } catch (err) {
      setError("Eroare server");
    }
  };

  // 🔹 La încărcare → afișăm toate anunțurile
  useEffect(() => {
    fetchAnunturi();
  }, []);

  // 🔹 Când se trimite formularul
  const handleSearch = (e) => {
    e.preventDefault();
    fetchAnunturi({
      locatie,
      categorie,
      tranzactie,
      pretMin,
      pretMax,
      camere,
      suprafataMin,
    });
  };

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-content">
          <h1>Anunțuri imobiliare în Oltenița</h1>
          <p>Găsește cele mai bune oferte de vânzare și închiriere</p>
        </div>
      </section>

      {/* ===== Formular Căutare Avansată ===== */}
      <section className="search-section container">
        <h2>Căutare avansată</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Locație (ex: Oltenița)"
            value={locatie}
            onChange={(e) => setLocatie(e.target.value)}
          />

          <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="">Categorie</option>
            <option>Apartamente</option>
            <option>Case</option>
            <option>Garsoniere</option>
            <option>Terenuri</option>
            <option>Spațiu comercial</option>
            <option>Garaje</option>
          </select>

          <select
            value={tranzactie}
            onChange={(e) => setTranzactie(e.target.value)}
          >
            <option value="">Tip tranzacție</option>
            <option>Vânzare</option>
            <option>Închiriere</option>
            <option>Cumpărare</option>
          </select>

          <input
            type="number"
            placeholder="Preț minim (€)"
            value={pretMin}
            onChange={(e) => setPretMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preț maxim (€)"
            value={pretMax}
            onChange={(e) => setPretMax(e.target.value)}
          />

          <select value={camere} onChange={(e) => setCamere(e.target.value)}>
            <option value="">Camere</option>
            <option value="1">1 cameră</option>
            <option value="2">2 camere</option>
            <option value="3">3 camere</option>
            <option value="4">4+ camere</option>
          </select>

          <input
            type="number"
            placeholder="Suprafață minimă (mp)"
            value={suprafataMin}
            onChange={(e) => setSuprafataMin(e.target.value)}
          />

          <button type="submit" className="btn">
            🔍 Caută
          </button>
        </form>
      </section>

      {/* ===== Lista Anunțuri ===== */}
      <div className="container">
        <h2>📢 Anunțuri</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="grid">
          {anunturi.map((anunt) => (
            <div key={anunt._id} className="card">
              {anunt.imagini?.length > 0 && (
                <img src={anunt.imagini[0]} alt={anunt.titlu} />
              )}
              <h3>{anunt.titlu}</h3>
              <p>{anunt.descriere.substring(0, 80)}...</p>
              <p className="pret">{anunt.pret} €</p>
              <span className="badge">
                {anunt.categorie} | {anunt.tranzactie}
              </span>

              <Link to={`/anunt/${anunt._id}`}>
                <button className="btn" style={{ width: "100%", marginTop: "8px" }}>
                  📄 Detalii
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
