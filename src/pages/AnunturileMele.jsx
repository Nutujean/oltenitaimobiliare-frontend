import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/anunturile-mele`,
          {
            headers: { Authorization: localStorage.getItem("token") },
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
    if (!window.confirm("Ești sigur că vrei să ștergi acest anunț?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/anunturi/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (response.ok) {
        setAnunturi(anunturi.filter((a) => a._id !== id));
      } else {
        const data = await response.json();
        setError(data.error || "Eroare la ștergere");
      }
    } catch {
      setError("Eroare server");
    }
  };

  return (
    <div className="container">
      <h2>📋 Anunțurile mele</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {anunturi.length === 0 ? (
        <p>Nu ai niciun anunț adăugat.</p>
      ) : (
        <div className="grid">
          {anunturi.map((anunt) => (
            <div key={anunt._id} className="card">
              {anunt.imagini?.length > 0 && (
                <img src={anunt.imagini[0]} alt={anunt.titlu} />
              )}
              <h3>{anunt.titlu}</h3>
              <p>{anunt.descriere.substring(0, 60)}...</p>
              <p className="pret">{anunt.pret} €</p>
              <span className="badge">{anunt.categorie}</span>

              <div style={{ marginTop: "10px" }}>
                <Link to={`/editare-anunt/${anunt._id}`}>
                  <BlueButton style={{ width: "100%", marginBottom: "5px" }}>
                    ✏️ Editează
                  </BlueButton>
                </Link>

                <BlueButton
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    background: "red",
                  }}
                  onClick={() => handleDelete(anunt._id)}
                >
                  🗑️ Șterge
                </BlueButton>

                {/* 🔹 Buton Verde Upgrade */}
                <button
                  className="green-btn"
                  onClick={() => navigate(`/plata/${anunt._id}`)}
                >
                  🚀 Upgrade la Premium
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnunturileMele;
