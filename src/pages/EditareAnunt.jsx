import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditareAnunt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titlu: "",
    descriere: "",
    pret: "",
    locatie: "",
    categorie: "",
    tranzactie: "",
    camere: "",
    imagini: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`https://imobila-market-backend.onrender.com/api/anunturi/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          titlu: data.titlu,
          descriere: data.descriere,
          pret: data.pret,
          locatie: data.locatie,
          categorie: data.categorie,
          tranzactie: data.tranzactie,
          camere: data.camere,
          imagini: [],
        });
      })
      .catch((err) => console.error("Eroare la încărcare anunț:", err));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagini") {
      setFormData({ ...formData, imagini: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Trebuie să fii logat.");
      return;
    }

    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "imagini") {
          for (let i = 0; i < formData.imagini.length; i++) {
            data.append("imagini", formData.imagini[i]);
          }
        } else {
          data.append(key, formData[key]);
        }
      }

      const res = await fetch(
        `https://imobila-market-backend.onrender.com/api/anunturi/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      );

      if (res.ok) {
        alert("Anunț actualizat cu succes!");
        navigate("/anunturile-mele");
      } else {
        const err = await res.json();
        alert("Eroare: " + err.message);
      }
    } catch (error) {
      console.error("Eroare la actualizare:", error);
      alert("A apărut o eroare la server.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">✏️ Editare Anunț</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titlu"
          placeholder="Titlu anunț"
          value={formData.titlu}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <textarea
          name="descriere"
          placeholder="Descriere"
          value={formData.descriere}
          onChange={handleChange}
          rows="5"
          className="w-full border rounded-lg px-3 py-2"
          required
        ></textarea>

        <input
          type="number"
          name="pret"
          placeholder="Preț (€)"
          value={formData.pret}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="text"
          name="locatie"
          placeholder="Locație"
          value={formData.locatie}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <select
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="">Categorie</option>
          <option value="apartament">Apartament</option>
          <option value="casa">Casă / Vilă</option>
          <option value="teren">Teren</option>
          <option value="garaj">Garaj</option>
        </select>

        <select
          name="tranzactie"
          value={formData.tranzactie}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="">Tip tranzacție</option>
          <option value="vanzare">Vânzare</option>
          <option value="inchiriere">Închiriere</option>
        </select>

        <select
          name="camere"
          value={formData.camere}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Nr. camere</option>
          <option value="1">1 cameră</option>
          <option value="2">2 camere</option>
          <option value="3">3 camere</option>
          <option value="4+">4+ camere</option>
        </select>

        <input
          type="file"
          name="imagini"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Salvează modificările
        </button>
      </form>
    </div>
  );
}
