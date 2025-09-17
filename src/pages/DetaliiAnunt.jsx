import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const response = await fetch(
          `https://oltenitaimobiliare-backend.onrender.com/api/anunturi/${id}`
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
      <div className="detalii-box">
        {/* ===== Imagine principală ===== */}
        {anunt.imagini?.length > 0 && (
          <img src={anunt.imagini[0]} alt={anunt.titlu} className="detalii-img" />
        )}

        {/* ===== Titlu + Preț ===== */}
        <h1>{anunt.titlu}</h1>
        <p className="detalii-pret">{anunt.pret} €</p>

        {/* ===== Categorie + Tip tranzacție ===== */}
        <div className="detalii-info">
          <span className="badge">{anunt.categorie}</span>
          {anunt.tipTranzactie && (
            <span className="badge badge-green">{anunt.tipTranzactie}</span>
          )}
        </div>

        {/* ===== Descriere ===== */}
        <p className="detalii-descriere">{anunt.descriere}</p>

        {/* ===== Buton Înapoi ===== */}
        <BlueButton onClick={() => window.history.back()} style={{ marginTop: "15px" }}>
          ⬅ Înapoi
        </BlueButton>
      </div>
    </div>
  );
}

export default DetaliiAnunt;
