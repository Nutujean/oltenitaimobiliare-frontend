import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch anunturile utilizatorului
  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        const response = await fetch(
          "https://oltenitaimobiliare-backend.onrender.com/api/anunturile-mele",
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
      } finally {
        setLoading(false);
      }
    };
    fetchMyAds();
  }, []);

  // Ștergere anunț
  const handleDelete = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi acest anunț?")) return;

    try {
      const response = await fetch(
        `https://oltenitaimobiliare-backend.onrender.com/api/anunturi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Eroare la ștergere");

      setAnunturi(anunturi.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Se încarcă...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h2 className="section-title">📋 Anunțurile mele</h2>

      {anunturi.length === 0 ? (
        <p>Nu ai niciun anunț adăugat.</p>
      ) : (
        <div className="grid">
          {anunturi.map((anunt) => (
            <div key={anunt._id} className="card">
              {anunt.imagini?.length > 0 && (
                <img src={anunt.imagini[0]} alt={anunt.titlu} />
              )}
              <div className="card-body">
                <h3>{anunt.titlu}</h3>
                <p className="pret">{anunt.pret} €</p>

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

                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  <Link to={`/editare-anunt/${anunt._id}`} style={{ flex: 1 }}>
                    <BlueButton style={{ width: "100%" }}>✏ Editare</BlueButton>
                  </Link>
                  <BlueButton
                    style={{ flex: 1, backgroundColor: "red" }}
                    onClick={() => handleDelete(anunt._id)}
                  >
                    🗑 Șterge
                  </BlueButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnunturileMele;
