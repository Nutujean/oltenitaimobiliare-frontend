import React, { useEffect, useState } from "react";
import API_URL from "./api";

export default function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);

  // La montare, încărcăm anunțurile userului
  useEffect(() => {
    const fetchAnunturi = async () => {
      try {
        const res = await fetch(`${API_URL}/api/anunturi`);
        const data = await res.json();
        setAnunturi(data);
      } catch (err) {
        console.error("❌ Eroare la încărcarea anunțurilor:", err);
      }
    };
    fetchAnunturi();
  }, []);

  // Funcția de ștergere
  const handleDelete = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi acest anunț?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/anunturi/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ trimitem token
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Eroare la ștergere:", data);
        alert(data.error || "Eroare la ștergerea anunțului");
        return;
      }

      alert("✅ Anunț șters cu succes!");
      setAnunturi(anunturi.filter((a) => a._id !== id)); // scoatem din listă
    } catch (err) {
      console.error("❌ Eroare fetch:", err);
      alert("Eroare de rețea la ștergere");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Anunțurile Mele</h1>
      {anunturi.length === 0 ? (
        <p>Nu ai anunțuri încă.</p>
      ) : (
        <ul className="space-y-4">
          {anunturi.map((anunt) => (
            <li
              key={anunt._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{anunt.titlu}</h2>
                <p className="text-gray-600">{anunt.pret} €</p>
              </div>
              <button
                onClick={() => handleDelete(anunt._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Șterge
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
