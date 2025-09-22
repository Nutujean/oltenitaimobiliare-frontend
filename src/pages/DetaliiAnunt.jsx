import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../api";

export default function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const res = await fetch(`${API_URL}/api/anunturi/${id}`);
        const data = await res.json();
        setAnunt(data);
      } catch (err) {
        console.error("Eroare la încărcarea anunțului:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnunt();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Se încarcă...</p>;
  if (!anunt) return <p className="text-center mt-10">Anunțul nu există.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{anunt.titlu}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {anunt.imagini && anunt.imagini.length > 0 ? (
            <img
              src={`${API_URL}${anunt.imagini[0]}`}
              alt={anunt.titlu}
              className="w-full h-80 object-cover rounded"
            />
          ) : (
            <img
              src="https://via.placeholder.com/600x400?text=Fara+imagine"
              alt="Fără imagine"
              className="w-full h-80 object-cover rounded"
            />
          )}
        </div>
        <div>
          <p className="text-gray-700 mb-4">{anunt.descriere}</p>
          <p className="text-lg font-semibold text-blue-600 mb-2">
            {anunt.pret} €
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Categorie: {anunt.categorie}
          </p>
          <p className="text-sm text-gray-500">
            ID Utilizator: {anunt.userId}
          </p>
        </div>
      </div>

      {anunt.imagini && anunt.imagini.length > 1 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {anunt.imagini.slice(1).map((img, index) => (
            <img
              key={index}
              src={`${API_URL}${img}`}
              alt={`Imagine ${index + 2}`}
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
}
