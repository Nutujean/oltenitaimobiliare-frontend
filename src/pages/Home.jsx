import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const response = await fetch("https://imobila-market-backend.onrender.com/api/anunturi");
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
    fetchAnunturi();
  }, []);

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-content">
          <h1>Anunțuri imobiliare în Oltenița</h1>
          <p>Găsește cele mai bune oferte de vânzare, cumpărare și închiriere</p>
          <BlueButton style={{ marginTop: "15px" }}>
            Vezi oferte
          </BlueButton>
        </div>
      </section>

      {/* ===== Formular Căutare Rapidă ===== */}
      <section className="search-section container">
        <h2>Caută rapid</h2>
        <form className="search-form">
          <input type="text" placeholder="Caută locația" />
          <select>
            <option>Apartamente</option>
            <option>Case</option>
            <option>Garsoniere</option>
            <option>Terenuri</option>
            <option>Garaje</option>
            <option>Spațiu comercial</option>
          </select>
          <select>
            <option>Vânzare</option>
            <option>Cumpărare</option>
            <option>Închiriere</option>
          </select>
          <BlueButton type="submit">Caută</BlueButton>
        </form>
      </section>

      {/* ===== Lista Anunțuri ===== */}
      <div className="container">
        <h2>📢 Anunțuri recente</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="grid">
          {anunturi.map((anunt) => (
            <div key={anunt._id} className="card">
              {anunt.imagini?.length > 0 && (
                <img
                  src={`https://imobila-market-backend.onrender.com${anunt.imagini[0]}`}
                  alt={anunt.titlu}
                />
              )}
              <h3>{anunt.titlu}</h3>
              <p>{anunt.descriere.substring(0, 80)}...</p>
              <p className="pret">{anunt.pret} €</p>
              <span className="badge">{anunt.categorie}</span>

              <Link to={`/anunt/${anunt._id}`}>
                <BlueButton style={{ marginTop: "10px", width: "100%" }}>
                  📄 Detalii
                </BlueButton>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
