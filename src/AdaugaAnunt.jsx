import React, { useState } from "react";
import API_URL from "./api";

export default function AdaugaAnunt() {
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("");
  const [imagini, setImagini] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("pret", pret);
    formData.append("categorie", categorie);
    for (let i = 0; i < imagini.length; i++) {
      formData.append("imagini", imagini[i]);
    }

    try {
      const token = localStorage.getItem("token");
      console.log("👉 Token folosit:", token);

      if (!token) {
        alert("Trebuie să fii logat pentru a adăuga un anunț.");
        return;
      }

      const res = await fetch(`${API_URL}/api/anunturi`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ DOAR tokenul
        },
        body: formData,
      });

      console.log("👉 Status răspuns:", res.status);
      const data = await res.json();
      console.log("👉 Răspuns complet backend:", data);

      if (!res.ok) {
        console.error("❌ Eroare backend:", data);
        alert(data.error || "Eroare la adăugarea anunțului");
        return;
      }

      alert("✅ Anunț adăugat cu succes!");
      console.log("📥 Răspuns backend:", data);

      // reset formular
      setTitlu("");
      setDescriere("");
      setPret("");
      setCategorie("");
      setImagini([]);
    } catch (err) {
      console.error("❌ Eroare fetch:", err);
      alert("Eroare de rețea la adăugarea anunțului");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-3">
      <h1 className="text-xl font-bold mb-4">Adaugă un anunț</h1>

      <input
        type="text"
        placeholder="Titlu"
        value={titlu}
        onChange={(e) => setTitlu(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Descriere"
        value={descriere}
        onChange={(e) => setDescriere(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Preț"
        value={pret}
        onChange={(e) => setPret(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      {/* Dropdown categorii */}
      <select
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Selectează categoria</option>
        <option value="Apartamente">Apartamente</option>
        <option value="Case">Case</option>
        <option value="Terenuri">Terenuri</option>
        <option value="Garsoniere">Garsoniere</option>
        <option value="Garaje">Garaje</option>
        <option value="Spațiu comercial">Spațiu comercial</option>
      </select>

      <input
        type="file"
        multiple
        onChange={(e) => setImagini(e.target.files)}
        className="w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Salvează
      </button>
    </form>
  );
}
