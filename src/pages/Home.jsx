import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";

const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
    <rect width="100%" height="100%" fill="#e5e7eb"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-size="22" font-family="Arial, Helvetica, sans-serif">
      Fără imagine
    </text>
  </svg>`
)}`;

function resolveImg(src, backendBase) {
  if (!src) return PLACEHOLDER;
  if (/^https?:\/\//i.test(src)) return src; // Cloudinary sau alt URL absolut
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${backendBase}${path}`;
}

function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [error, setError] = useState("");

  const backendBase = useMemo(() => {
    const b = import.meta.env.VITE_BACKEND_URL || "";
    return b.endsWith("/") ? b.slice(0, -1) : b;
  }, []);

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/anunturi`
        );
        const data = await response.json();
        if (response.ok) {
          // Diamond > Gold > restul
          const sorted = [...data].sort((a, b) => {
            const rank = (p) =>
              p === "Diamond" ? 2 : p === "Gold" ? 1 : 0;
            return rank(b.pachet) - rank(a.pachet);
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
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero-content">
          <h1>Anunțuri imobiliare în Oltenița</h1>
          <p>Găsește cele mai bune oferte de vânzare, cumpărare și închiriere</p>
          <BlueButton style={{ marginTop: 15 }}>Vezi oferte</BlueButton>
        </div>
      </section>

      {/* ===== Lista anunțuri ===== */}
      <div className="container">
        <h2>📢 Anunțuri recente</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="grid">
          {anunturi.map((anunt) => {
            const first = anunt.imagini?.[0];
            const imgUrl = resolveImg(first, backendBase);

            return (
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
                <img
                  src={imgUrl}
                  alt={anunt.titlu}
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER;
                  }}
                />

                <h3>{anunt.titlu}</h3>
                <p>{(anunt.descriere || "").substring(0, 80)}...</p>
                <p className="pret">{anunt.pret} €</p>
                <span className="badge">{anunt.categorie}</span>

                {anunt.pachet === "Gold" && (
                  <span className="badge-gold">⭐ Gold</span>
                )}
                {anunt.pachet === "Diamond" && (
                  <span className="badge-diamond">💎 Diamond</span>
                )}

                <Link to={`/anunt/${anunt._id}`}>
                  <BlueButton style={{ marginTop: 10, width: "100%" }}>
                    📄 Detalii
                  </BlueButton>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
