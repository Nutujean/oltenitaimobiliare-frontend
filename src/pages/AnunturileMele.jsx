import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const response = await fetch(
          "https://imobila-market-backend.onrender.com/api/anunturile-mele",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
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

  const handleDelete = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi acest anunț?")) return;

    try {
      const response = await fetch(
        `https://imobila-market-backend.onrender.com/api/anunturi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        setAnunturi(anunturi.filter((anunt) => anunt._id !== id));
      } else {
        const data = await response.json();
        alert(data.error || "Eroare la ștergere");
      }
    } catch (err) {
      alert("Eroare server");
    }
  };

  return (
    <div className="container">
      <h2>📋 Anunțurile Mele</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {anunturi.length === 0 ? (
        <p>Nu ai niciun anunț adăugat.</p>
      ) : (
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
              <p>
                <strong>Tip tranzacție:</strong> {anunt.tranzactie}
              </p>
              <span className="badge">{anunt.categorie}</span>

              <div style={{ marginTop: "10px" }}>
                <Link to={`/editare-anunt/${anunt._id}`}>
                  <BlueButton style={{ marginRight: "10px" }}>✏️ Editează</BlueButton>
                </Link>
                <BlueButton
                  onClick={() => handleDelete(anunt._id)}
                  style={{ background: "red" }}
                >
                  🗑️ Șterge
                </BlueButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnunturileMele;
