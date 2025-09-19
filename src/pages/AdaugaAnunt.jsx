import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdaugaAnunt() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titlu: "",
    descriere: "",
    pret: "",
    categorie: "",
    tranzactie: "Vanzare",
  });
  const [imagini, setImagini] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files.length > 15) {
      alert("Poți încărca maximum 15 imagini!");
      e.target.value = null;
    } else {
      setImagini([...e.target.files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Trebuie să fii logat pentru a adăuga un anunț!");
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titlu", form.titlu);
      formData.append("descriere", form.descriere);
      formData.append("pret", form.pret);
      formData.append("categorie", form.categorie);
      formData.append("tranzactie", form.tranzactie);

      imagini.forEach((img) => {
        formData.append("imagini", img);
      });

      const res = await fetch(
        "https://imobila-market-backend.onrender.com/api/anunturi",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Eroare la adăugarea anunțului");
      await res.json();

      alert("Anunț adăugat cu succes!");
      navigate("/");
    } catch (err) {
      alert("Eroare: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Adaugă anunț nou</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titlu"
          value={form.titlu}
          onChange={(e) => setForm({ ...form, titlu: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          placeholder="Descriere"
          value={form.descriere}
          onChange={(e) => setForm({ ...form, descriere: e.target.value })}
          className="w-full border rounded px-3 py-2 h-32"
          required
        />
        <input
          type="number"
          placeholder="Preț (€)"
          value={form.pret}
          onChange={(e) => setForm({ ...form, pret: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />

        <select
          value={form.categorie}
          onChange={(e) => setForm({ ...form, categorie: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Alege categorie</option>
          <option>Apartament</option>
          <option>Garsoniere</option> {/* 🔹 adăugat */}
          <option>Casă</option>
          <option>Teren</option>
          <option>Garaj</option>
          <option>Spațiu comercial</option>
        </select>

        <select
          value={form.tranzactie}
          onChange={(e) => setForm({ ...form, tranzactie: e.target.value })}
          className="w-full border rounded px-3 py-2"
        >
          <option>Vanzare</option>
          <option>Inchiriere</option>
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Se adaugă..." : "Adaugă anunț"}
        </button>
      </form>
    </div>
  );
}
