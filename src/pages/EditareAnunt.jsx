import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../api";

export default function EditareAnunt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("");
  const [imaginiExistente, setImaginiExistente] = useState([]);
  const [imaginiNoi, setImaginiNoi] = useState([]);

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const res = await fetch(`${API_URL}/api/anunturi/${id}`);
        const data = await res.json();
        setTitlu(data.titlu);
        setDescriere(data.descriere);
        setPret(data.pret);
        setCategorie(data.categorie);
        setImaginiExistente(data.imagini || []);
      } catch (err) {
        console.error("❌ Eroare la încărcarea anunțului:", err);
      }
    };
    fetchAnunt();
  }, [id]);

  const handleStergeImagine = (img) => {
    setImaginiExistente((prev) => prev.filter((i) => i !== img));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("pret", pret);
    formData.append("categorie", categorie);
    formData.append("imaginiExistente", JSON.stringify(imaginiExistente));

    for (let i = 0; i < imaginiNoi.length; i++) {
      formData.append("imagini", imaginiNoi[i]);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/anunturi/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Eroare la editare");

      alert("✅ Anunț actualizat cu succes!");
      navigate("/anunturile-mele");
    } catch (err) {
      console.error("❌", err);
      alert("Eroare la actualizare!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-3 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold">✏️ Editează anunțul</h1>

      <input
        type="text"
        placeholder="Titlu"
        value={titlu}
        onChange={(e) => setTitlu(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Descriere"
        value={descriere}
        onChange={(e) => setDescriere(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Preț"
        value={pret}
        onChange={(e) => setPret(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Categorie"
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* Imagini existente */}
      {imaginiExistente.length > 0 && (
        <div className="space-y-2">
          <p className="font-semibold">Imagini existente:</p>
          <div className="grid grid-cols-2 gap-3">
            {imaginiExistente.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={`http://localhost:5000${img}`}
                  alt={`Imagine ${index}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleStergeImagine(img)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload imagini noi */}
      <input
        type="file"
        multiple
        onChange={(e) => setImaginiNoi(e.target.files)}
        className="w-full"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Salvează modificările
      </button>
    </form>
  );
}
