import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/anunturi/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setAnunt(data);
        } else {
          setError(data.error || "Eroare la încărcarea anunțului");
        }
      } catch {
        setError("Eroare server");
      }
    };
    fetchAnunt();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!anunt) return <p>Se încarcă...</p>;

  return (
    <div className="container detalii-anunt">
      {anunt.imagini?.length > 0 && (
        <img
          src={anunt.imagini[0]}
          alt={anunt.titlu}
          className="detalii-img"
        />
      )}

      <h2>
        {anunt.titlu}{" "}
        {anunt.pachet === "Gold" && (
          <span className="badge-gold">⭐ Gold</span>
        )}
        {anunt.pachet === "Diamond" && (
          <span className="badge-diamond">💎 Diamond</span>
        )}
      </h2>

      <p className="pret">{anunt.pret} €</p>
      <p className="badge">{anunt.categorie}</p>
      <p>{anunt.descriere}</p>
    </div>
  );
}

export default DetaliiAnunt;
