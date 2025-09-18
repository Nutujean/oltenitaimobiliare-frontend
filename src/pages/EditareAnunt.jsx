import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function EditareAnunt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [categorie, setCategorie] = useState("Apartamente");
  const [tranzactie, setTranzactie] = useState("Cumpărare");
  const [imagini, setImagini] = useState([]);
  const [error, setError] = useState("");

  // ===== Preluăm datele existente =====
  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const response = await fetch(
          `https://imobila-market-backend.onrender.com/api/anunturi/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setTitlu(data.titlu);
          setDescriere(data.descriere);
          setPret(data.pret);
          setCategorie(data.categorie);
          setTranzactie(data.tranzactie || "Cumpărare");
          setImagini(data.imagini || []);
        } else {
          setError(data.error || "Eroare la încărcarea anunțului");
        }
      } catch (err) {
        setError("Eroare server");
      }
    };
    fetchAnunt();
  }, [id]);

  // ===== Salvăm modificările =====
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
        `https://imobila-market-backend.onrender.com/api/anunturi/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Eroare la editarea anunțului");
      }

      navigate("/anunturile-mele");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>✏️ Editează anunțul</h2>
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

          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option>Apartamente</option>
            <option>Case</option>
            <option>Garsoniere</option>
            <option>Terenuri</option>
            <option>Garaje</option>
            <option>Spațiu comercial</option>
          </select>

          <select
            value={tranzactie}
            onChange={(e) => setTranzactie(e.target.value)}
          >
            <option>Cumpărare</option>
            <option>Vânzare</option>
            <option>Închiriere</option>
          </select>

          <input
            type="file"
            multiple
            onChange={(e) => setImagini(e.target.files)}
          />

          <BlueButton type="submit" style={{ marginTop: "15px", width: "100%" }}>
            💾 Salvează modificările
          </BlueButton>
        </form>
      </div>
    </div>
  );
}

export default EditareAnunt;
