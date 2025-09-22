import React, { useEffect, useState } from "react";
import API_URL from "../api";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const res = await fetch(`${API_URL}/api/anunturi`);
        const data = await res.json();

        if (!res.ok) {
          console.error("❌ Eroare backend:", data);
          return;
        }

        setAnunturi(data);
      } catch (err) {
        console.error("❌ Eroare la încărcarea anunțurilor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnunturi();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Anunțuri imobiliare în Oltenița
      </h1>

      {loading ? (
        <p className="text-center">Se încarcă anunțurile...</p>
      ) : anunturi.length === 0 ? (
        <p className="text-center">Nu există anunțuri momentan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anunturi.map((anunt) => (
            <div
              key={anunt._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-2">{anunt.titlu}</h2>
              <p className="text-gray-600 mb-2">{anunt.descriere}</p>
              <p className="font-bold text-blue-600 mb-2">
                {anunt.pret} RON
              </p>
              <p className="text-sm text-gray-500">{anunt.categorie}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
