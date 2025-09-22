import React, { useState } from "react";
import API_URL from "../api";

export default function AdaugaAnunt() {
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/anunturi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titlu, descriere, pret, categorie }),
      });

      const data = await res.json();

      if (!res.ok) {
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Salvează
      </button>
    </form>
  );
}
