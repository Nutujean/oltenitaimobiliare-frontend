import React, { useState } from "react";
import API_URL from "./api";

export default function AdaugaAnunt() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);

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

      {/* 📌 Dropdown pentru locații */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Selectează locația</option>
        <option value="Oltenița">Oltenița</option>
        <option value="Chirnogi">Chirnogi</option>
        <option value="Ulmeni">Ulmeni</option>
        <option value="Radovanu">Radovanu</option>
        <option value="Spanțov">Spanțov</option>
        <option value="Chiselet">Chiselet</option>
        <option value="Valea Roșie">Valea Roșie</option>
        <option value="Mitreni">Mitreni</option>
        <option value="Clătești">Clătești</option>
        <option value="Curcani">Curcani</option>
        <option value="Soldanu">Soldanu</option>
        <option value="Negoești">Negoești</option>
        <option value="Căscioarele">Căscioarele</option>
      </select>

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
