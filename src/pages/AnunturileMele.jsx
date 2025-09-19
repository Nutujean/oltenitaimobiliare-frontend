import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://imobila-market-backend.onrender.com/api/anunturile-mele", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setAnunturi(data))
      .catch((err) => console.error("Eroare la încărcare:", err));
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Sigur vrei să ștergi acest anunț?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://imobila-market-backend.onrender.com/api/anunturi/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setAnunturi(anunturi.filter((a) => a._id !== id));
      } else {
        alert("Eroare la ștergere");
      }
    } catch (err) {
      console.error(err);
      alert("Eroare la server");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📂 Anunțurile mele</h1>
      {anunturi.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anunturi.map((anunt) => (
            <div
              key={anunt._id}
              className="bg-white rounded-lg shadow p-3 flex flex-col"
            >
              <img
                src={anunt.imagini?.[0] || "https://via.placeholder.com/400x250"}
                alt={anunt.titlu}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold mb-1 truncate">
                {anunt.titlu}
              </h3>
              <p className="text-blue-600 font-bold mb-3">{anunt.pret} €</p>
              <div className="mt-auto flex gap-2">
                <Link
                  to={`/editare-anunt/${anunt._id}`}
                  className="flex-1 bg-yellow-400 text-blue-900 text-center py-1 rounded-lg hover:bg-yellow-300"
                >
                  Editare
                </Link>
                <button
                  onClick={() => handleDelete(anunt._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
                >
                  Ștergere
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nu ai adăugat niciun anunț încă.</p>
      )}
    </div>
  );
}
