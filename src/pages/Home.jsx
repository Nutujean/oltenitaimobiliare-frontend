import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/anunturi`
        );
        const data = await response.json();
        if (response.ok) {
          // 🔹 Sortează: Diamond > Gold > restul
          const sorted = data.sort((a, b) => {
            if (a.pachet === "Diamond" && b.pachet !== "Diamond") return -1;
            if (b.pachet === "Diamond" && a.pachet !== "Diamond") return 1;
            if (a.pachet === "Gold" && b.pachet === "Basic") return -1;
            if (b.pachet === "Gold" && a.pachet === "Basic") return 1;
            return 0;
          });
          setAnunturi(sorted);
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
          <BlueButton style={{ marginTop: "15px" }}>Vezi oferte</BlueButton>
        </div>
      </section>

      {/* ===== Lista Anunțuri ===== */}
      <div className="container">
        <h2>📢 Anunțuri recente</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="grid">
          {anunturi.map((anunt) => (
            <div
              key={anunt._id}
              className={`card ${
                anunt.pachet === "Diamond"
                  ? "card-diamond"
                  : anunt.pachet === "Gold"
                  ? "card-gold"
                  : ""
              }`}
            >
              {anunt.imagini?.length > 0 && (
                <img src={anunt.imagini[0]} alt={anunt.titlu} />
              )}
              <h3>{anunt.titlu}</h3>
              <p>{anunt.descriere.substring(0, 80)}...</p>
              <p className="pret">{anunt.pret} €</p>
              <span className="badge">{anunt.categorie}</span>

              {/* 🔹 Badge Premium */}
              {anunt.pachet === "Gold" && (
                <span className="badge-gold">⭐ Gold</span>
              )}
              {anunt.pachet === "Diamond" && (
                <span className="badge-diamond">💎 Diamond</span>
              )}

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
