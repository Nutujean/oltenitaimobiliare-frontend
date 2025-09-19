import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Home, BedDouble, Tag } from "lucide-react";

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
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Col stânga: imagini + detalii */}
      <div className="lg:col-span-2">
        {/* Galerie principală */}
        <div className="mb-6">
          <img
            src={anunt.imagini?.[0] || "https://via.placeholder.com/800x500"}
            alt={anunt.titlu}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {anunt.imagini?.slice(1, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Poza ${index + 2}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Titlu + preț + locație */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{anunt.titlu}</h1>
        <p className="text-blue-600 font-bold text-2xl mb-2">
          {anunt.pret} €
        </p>
        <p className="flex items-center gap-2 text-gray-600 mb-6">
          <MapPin size={18} /> {anunt.locatie || "Oltenița"}
        </p>

        {/* Detalii rapide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
            <Home size={20} className="text-blue-600" />
            <span>{anunt.categorie || "Nespecificat"}</span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
            <Tag size={20} className="text-blue-600" />
            <span>{anunt.tranzactie || "Nespecificat"}</span>
          </div>
          {anunt.camere && (
            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
              <BedDouble size={20} className="text-blue-600" />
              <span>{anunt.camere} camere</span>
            </div>
          )}
        </div>

        {/* Descriere */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">📖 Descriere</h2>
          <p className="text-gray-700 whitespace-pre-line">{anunt.descriere}</p>
        </div>
      </div>

      {/* Col dreapta: contact */}
      <div className="lg:col-span-1">
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">📞 Contact vânzător</h2>
          <p>
            <span className="font-semibold">Nume:</span>{" "}
            {anunt.userId?.nume || "Utilizator"}
          </p>
          <p>
            <span className="font-semibold">Telefon:</span>{" "}
            {anunt.userId?.telefon || "Nespecificat"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {anunt.userId?.email || "Nespecificat"}
          </p>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Trimite mesaj
          </button>
        </div>
      </div>
    </div>
  );
}
