import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const response = await fetch(
          `https://imobila-market-backend.onrender.com/api/anunturi/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setAnunt(data);
        } else {
          setError(data.error || "Eroare la încărcarea anunțului");
        }
      } catch (err) {
        setError("Eroare server");
      }
    };
    fetchAnunt();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!anunt) return <p>Se încarcă...</p>;

  return (
    <div className="container">
      <div className="detalii-anunt">
        {/* ===== Galerie imagini ===== */}
        {anunt.imagini?.length > 0 && (
          <div className="galerie">
            {anunt.imagini.map((img, index) => (
              <img
                key={index}
                src={`https://imobila-market-backend.onrender.com${img}`}
                alt={`${anunt.titlu} - ${index + 1}`}
              />
            ))}
          </div>
        )}

        <h2>{anunt.titlu}</h2>
        <p className="pret">{anunt.pret} €</p>
        <p><strong>Tip tranzacție:</strong> {anunt.tranzactie}</p>
        <p><strong>Categorie:</strong> {anunt.categorie}</p>
        <p className="descriere">{anunt.descriere}</p>

        <Link to="/">
          <BlueButton style={{ marginTop: "15px" }}>⬅️ Înapoi la listă</BlueButton>
        </Link>
      </div>
    </div>
  );
}

export default DetaliiAnunt;
