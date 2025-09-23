import { useEffect, useState } from "react";
import API_URL from "../api";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/anunturi`)
      .then((res) => res.json())
      .then((data) => setAnunturi(data))
      .catch((err) => console.error("Eroare la încărcarea anunțurilor:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Anunțuri Imobiliare în Oltenița</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {anunturi.map((a) => (
          <div key={a._id} className="border rounded p-4 shadow">
            <img
              src={a.imageUrl || "https://via.placeholder.com/400x250?text=Fara+imagine"}
              alt={a.titlu}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="font-bold text-lg mt-2">{a.titlu}</h2>
            <p>{a.pret} EUR</p>
            <p className="text-sm text-gray-600">{a.categorie}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
