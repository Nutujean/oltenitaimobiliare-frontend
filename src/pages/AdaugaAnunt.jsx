import React, { useState } from "react";
import API_URL from "./api"; // asigură-te că ai api.js cu export corect

export default function AdaugaAnunt() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState(""); // 📌 locație
  const [images, setImages] = useState([]); // fișierele selectate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("location", location); // 📌 trimitem locația

      images.forEach((img) => {
        formData.append("images", img);
      });

      // Debug — vezi ce se trimite
      for (let [key, value] of formData.entries()) {
        console.log("📂 FormData:", key, value);
      }

      const res = await fetch(`${API_URL}/api/listings`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Eroare la adăugare:", data);
        alert(data.error || "Eroare la adăugarea anunțului");
        return;
      }

      alert("✅ Anunț adăugat cu succes!");
      console.log("📥 Răspuns backend:", data);

      // reset formular
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setLocation("");
      setImages([]);
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Descriere"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Preț"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      {/* 📌 Input pentru locație */}
      <input
        type="text"
        placeholder="Locație (ex: Oltenița)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      {/* Dropdown categorii */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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

      {/* Upload imagini */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages(Array.from(e.target.files))}
        className="w-full border p-2 rounded"
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
