import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function AdaugaAnunt() {
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("Apartamente");
  const [tranzactie, setTranzactie] = useState("Vânzare");
  const [pachet, setPachet] = useState("Basic");
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
        "https://imobila-market-backend.onrender.com/api/anunturi",
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Eroare la adăugarea anunțului");

      // Dacă pachetul e Gold/Diamond → duce la Stripe
      if (pachet !== "Basic") {
        const plata = await fetch(
          "https://imobila-market-backend.onrender.com/api/plata",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({ pachet, anuntId: data._id }),
          }
        );
        const resPlata = await plata.json();
        if (resPlata.url) {
          window.location.href = resPlata.url; // redirecționează spre Stripe
          return;
        }
      }

      // Dacă e Basic → duce direct la Anunțurile Mele
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
            <option>Cumpărare</option>
            <option>Închiriere</option>
          </select>

          {/* Alegere pachet */}
          <label>
            Alege tipul anunțului:
            <select value={pachet} onChange={(e) => setPachet(e.target.value)}>
              <option value="Basic">Basic (gratuit)</option>
              <option value="Gold">⭐ Gold (25 lei / 7 zile)</option>
              <option value="Diamond">💎 Diamond (49 lei / 20 zile)</option>
            </select>
          </label>

          <input type="file" multiple onChange={(e) => setImagini(e.target.files)} />

          <BlueButton type="submit" style={{ marginTop: "15px", width: "100%" }}>
            🚀 Publică anunțul
          </BlueButton>
        </form>
      </div>
    </div>
  );
}

export default AdaugaAnunt;
