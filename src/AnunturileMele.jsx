import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";

export default function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/anunturile-mele`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Eroare la încărcarea anunțurilor mele");

        const data = await res.json();
        setAnunturi(data);
      } catch (err) {
        console.error("❌", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnunturi();
  }, []);

  const stergeAnunt = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi acest anunț?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/anunturi/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Eroare la ștergerea anunțului");

      setAnunturi((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("❌", err);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">⏳ Se încarcă...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📋 Anunțurile Mele</h1>

      {anunturi.length === 0 ? (
        <p className="text-gray-500">Nu ai adăugat încă niciun anunț.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {anunturi.map((anunt) => (
            <div
              key={anunt._id}
              className="border rounded-lg shadow p-4 flex flex-col bg-white"
            >
              {/* Imagine */}
              <img
                src={
                  anunt.imagini && anunt.imagini.length > 0
                    ? `http://localhost:5000${anunt.imagini[0]}`
                    : "https://placehold.co/400x250?text=Fara+imagine"
                }
                alt={anunt.titlu}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />

              {/* Titlu și preț */}
              <h2 className="font-bold text-lg">{anunt.titlu}</h2>
              <p className="text-blue-600 font-semibold">{anunt.pret} €</p>

              {/* Butoane acțiuni */}
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/anunt/${anunt._id}`}
                  className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
                >
                  Vezi
                </Link>
                <Link
                  to={`/editare-anunt/${anunt._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Editează
                </Link>
                <button
                  onClick={() => stergeAnunt(anunt._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
