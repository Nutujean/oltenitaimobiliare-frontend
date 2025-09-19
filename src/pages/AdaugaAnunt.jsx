import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function AdaugaAnunt() {
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("Apartamente");
  const [tranzactie, setTranzactie] = useState("Vânzare");
  const [imagini, setImagini] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("pret", pret);
    formData.append("categorie", categorie);
    formData.append("tranzactie", tranzactie);
    for (let i = 0; i < imagini.length; i++) {
      formData.append("imagini", imagini[i]);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/anunturi`,
        {
          method: "POST",
          headers: { Authorization: localStorage.getItem("token") },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Eroare la adăugarea anunțului");

      navigate("/anunturile-mele");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>➕ Adaugă un anunț nou</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="form-styled">
          <input
            type="text"
            placeholder="Titlu"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
            required
          />

          <textarea
            placeholder="Descriere"
            value={descriere}
            onChange={(e) => setDescriere(e.target.value)}
            rows="4"
            required
          ></textarea>

          <input
            type="number"
            placeholder="Preț (€)"
            value={pret}
            onChange={(e) => setPret(e.target.value)}
            required
          />

          <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option>Apartamente</option>
            <option>Case</option>
            <option>Garsoniere</option>
            <option>Terenuri</option>
            <option>Garaje</option>
            <option>Spațiu comercial</option>
          </select>

          <select value={tranzactie} onChange={(e) => setTranzactie(e.target.value)}>
            <option>Vânzare</option>
            <option>Închiriere</option>
            <option>Cumpărare</option>
          </select>

          <input type="file" multiple onChange={(e) => setImagini(e.target.files)} />

          <BlueButton type="submit" style={{ marginTop: 15, width: "100%" }}>
            🚀 Publică anunțul
          </BlueButton>
        </form>
      </div>
    </div>
  );
}

export default AdaugaAnunt;
