import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../api";

export default function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/anunturi/${id}`)
      .then((res) => res.json())
      .then((data) => setAnunt(data))
      .catch((err) => console.error("Eroare:", err));
  }, [id]);

  if (!anunt) return <p className="p-6">Se încarcă...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={anunt.imageUrl || "https://via.placeholder.com/600x400?text=Fara+imagine"}
        alt={anunt.titlu}
        className="w-full h-80 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{anunt.titlu}</h1>
      <p className="text-xl text-green-600">{anunt.pret} EUR</p>
      <p className="text-gray-700 mt-2">{anunt.descriere}</p>
      <p className="text-sm text-gray-500 mt-2">{anunt.categorie}</p>
    </div>
  );
}
