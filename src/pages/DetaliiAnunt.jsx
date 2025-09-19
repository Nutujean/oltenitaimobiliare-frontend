import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);

  useEffect(() => {
    fetch(`https://imobila-market-backend.onrender.com/api/anunturi/${id}`)
      .then((res) => res.json())
      .then((data) => setAnunt(data))
      .catch((err) => console.error("Eroare la încărcarea anunțului:", err));
  }, [id]);

  if (!anunt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p>Se încarcă detaliile anunțului...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Titlu */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{anunt.titlu}</h1>

      {/* Galerie imagini */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <img
          src={anunt.imagini?.[0] || "https://via.placeholder.com/800x500"}
          alt={anunt.titlu}
          className="w-full h-80 object-cover rounded-lg shadow"
        />
        <div className="grid grid-cols-2 gap-2">
          {anunt.imagini?.slice(1, 5).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Poza ${index + 2}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Preț și locație */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold text-blue-600">{anunt.pret} €</p>
        <p className="text-gray-600">📍 {anunt.locatie || "Oltenița"}</p>
      </div>

      {/* Descriere */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Descriere</h2>
        <p className="text-gray-700 whitespace-pre-line">{anunt.descriere}</p>
      </div>

      {/* Detalii suplimentare */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-semibold">Categorie</p>
          <p>{anunt.categorie || "Nespecificat"}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-semibold">Tranzacție</p>
          <p>{anunt.tranzactie || "Nespecificat"}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-semibold">Camere</p>
          <p>{anunt.camere || "-"}</p>
        </div>
      </div>

      {/* Contact vânzător */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-2">Contact vânzător</h2>
        <p><span className="font-semibold">Nume:</span> {anunt.userId?.nume || "Utilizator"}</p>
        <p><span className="font-semibold">Telefon:</span> {anunt.userId?.telefon || "Nespecificat"}</p>
        <p><span className="font-semibold">Email:</span> {anunt.userId?.email || "Nespecificat"}</p>
      </div>
    </div>
  );
}
