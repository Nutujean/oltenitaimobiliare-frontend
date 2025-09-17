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
          "https://oltenitaimobiliare-backend.onrender.com/api/anunturi"
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
    fetchAnunturi();
  }, []);

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Anunțuri imobiliare în Oltenița</h1>
            <p>
              Vânzări, cumpărări și închirieri de apartamente, case, terenuri și
              garsoniere
            </p>
            <BlueButton style={{ marginTop: "15px" }}>Vezi oferte</BlueButton>
          </div>
        </div>
      </section>

      {/* ===== Formular Căutare Rapidă ===== */}
      <section className="search-section container">
        <form className="search-form">
          <input type="text" placeholder="Caută locația (ex: Oltenița)" />
          <select>
            <option>Apartamente</option>
            <option>Case</option>
            <option>Garsoniere</option>
            <option>Terenuri</option>
            <option>Garaje</option>
          </select>
          <select>
            <option>Cumpărare</option>
            <option>Vânzare</option>
            <option>Închiriere</option>
          </select>
          <BlueButton type="submit">🔍 Caută</BlueButton>
        </form>
      </section>

      {/* ===== Lista Anunțuri ===== */}
      <div className="container">
        <h2 className="section-title">📢 Anunțuri Premium</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="grid">
          {anunturi.map((anunt) => (
            <div key={anunt._id} className="card">
              {anunt.imagini?.length > 0 && (
                <img src={anunt.imagini[0]} alt={anunt.titlu} />
              )}
              <div className="card-body">
                <h3>{anunt.titlu}</h3>
                <p className="pret">{anunt.pret} €</p>
                <p className="descriere">
                  {anunt.descriere.length > 80
                    ? anunt.descriere.substring(0, 80) + "..."
                    : anunt.descriere}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "10px",
                  }}
                >
                  <span className="badge">{anunt.categorie}</span>
                  {anunt.tipTranzactie && (
                    <span className="badge badge-green">
                      {anunt.tipTranzactie}
                    </span>
                  )}
                </div>

                <Link to={`/anunt/${anunt._id}`}>
                  <BlueButton style={{ marginTop: "10px", width: "100%" }}>
                    📄 Detalii
                  </BlueButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
