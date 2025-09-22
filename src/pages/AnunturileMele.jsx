import React, { useEffect, useState } from "react";
import API_URL from "../api";

export default function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 📌 încărcăm anunțurile utilizatorului
  const fetchAnunturileMele = async () => {
    try {
      const res = await fetch(`${API_URL}/api/anunturi/mele`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Eroare backend:", data);
        return;
      }

      setAnunturi(data);
    } catch (err) {
      console.error("❌ Eroare fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnunturileMele();
  }, []);

  // 📌 ștergere anunț
  const handleDelete = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi acest anunț?")) return;

    try {
      const res = await fetch(`${API_URL}/api/anunturi/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Eroare la ștergere");
        return;
      }

      alert("✅ Anunț șters cu succes!");
      setAnunturi(anunturi.filter((a) => a._id !== id));
    } catch (err) {
      console.error("❌ Eroare la ștergere:", err);
      alert("Eroare de rețea");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Anunțurile Mele</h1>

      {loading ? (
        <p className="text-center">Se încarcă...</p>
      ) : anunturi.length === 0 ? (
        <p className="text-center">Nu ai anunțuri publicate.</p>
      ) : (
        <div className="space-y-4">
          {anunturi.map((anunt) => (
            <div
              key={anunt._id}
              className="border rounded-lg p-4 shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{anunt.titlu}</h2>
                <p className="text-gray-600">{anunt.descriere}</p>
                <p className="font-bold text-blue-600">{anunt.pret} RON</p>
                <p className="text-sm text-gray-500">{anunt.categorie}</p>
              </div>

              <div className="flex gap-2">
                {/* 📌 Buton de ștergere */}
                <button
                  onClick={() => handleDelete(anunt._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Șterge
                </button>

                {/* 📌 Buton de editare (îl facem după ce confirmi că merge ștergerea) */}
                <button
                  onClick={() =>
                    alert("Funcția de editare o facem imediat după test 😊")
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editează
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
