import { useEffect, useState } from "react";
import API_URL from "../api";

export default function Home() {
  const [anunturi, setAnunturi] = useState([]);

  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const res = await fetch(`${API_URL}/api/anunturi`);
        if (!res.ok) throw new Error("Eroare la încărcarea anunțurilor");
        const data = await res.json();
        setAnunturi(data);
      } catch (err) {
        console.error("Eroare:", err);
      }
    };
    fetchAnunturi();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-600 text-white text-center py-16 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold">Oltenita Imobiliare</h1>
        <p className="mt-4 text-lg">
          Cumpără, vinde sau închiriază apartamente, case, terenuri și garsoniere în zona Oltenița
        </p>
      </section>

      {/* Listă anunțuri */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Anunțuri recente</h2>
        {anunturi.length === 0 ? (
          <p>Nu există anunțuri momentan.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {anunturi.map((a) => (
              <div key={a._id} className="border rounded-lg shadow-md overflow-hidden">
                <img
                  src={a.imageUrl || "https://via.placeholder.com/400x250?text=Fara+imagine"}
                  alt={a.titlu}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{a.titlu}</h3>
                  <p className="text-sm text-gray-600">{a.categorie}</p>
                  <p className="mt-2 font-semibold text-blue-700">{a.pret} €</p>
                  <p className="text-sm mt-2">{a.descriere?.slice(0, 80)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
