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
  const [tranzactie, setTranzactie] = useState("Vânzare");
  const [pachet, setPachet] = useState("Basic");
  const [imagini, setImagini] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const res = await fetch(
          `https://imobila-market-backend.onrender.com/api/anunturi/${id}`
        );
        const data = await res.json();
        if (res.ok) {
          setTitlu(data.titlu);
          setDescriere(data.descriere);
          setPret(data.pret);
          setCategorie(data.categorie);
          setTranzactie(data.tranzactie);
          setPachet(data.pachet || "Basic");
        } else {
          setError(data.error || "Eroare la încărcarea anunțului");
        }
      } catch {
        setError("Eroare server");
      }
    };
    fetchAnunt();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("pret", pret);
    formData.append("categorie", categorie);
    formData.append("tranzactie", tranzactie);
    formData.append("pachet", pachet);

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
      if (!response.ok) throw new Error(data.error || "Eroare la editare");

      if (pachet !== "Basic") {
        const plata = await fetch(
          "https://imobila-market-backend.onrender.com/api/plata",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({ pachet, anuntId: id }),
          }
        );
        const resPlata = await plata.json();
        if (resPlata.url) {
          window.location.href = resPlata.url;
          return;
        }
      }

      navigate("/anunturile-mele");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>✏️ Editează anunț</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="form-styled">
          <input
            type="text"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
            required
          />
          <textarea
            value={descriere}
            onChange={(e) => setDescriere(e.target.value)}
            rows="4"
            required
          ></textarea>
          <input
            type="number"
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

          <label>
            Tip anunț:
            <select value={pachet} onChange={(e) => setPachet(e.target.value)}>
              <option value="Basic">Basic (gratuit)</option>
              <option value="Gold">⭐ Gold (25 lei / 7 zile)</option>
              <option value="Diamond">💎 Diamond (49 lei / 20 zile)</option>
            </select>
          </label>

          <input type="file" multiple onChange={(e) => setImagini(e.target.files)} />

          <BlueButton type="submit" style={{ marginTop: "15px", width: "100%" }}>
            💾 Salvează modificările
          </BlueButton>
        </form>
      </div>
    </div>
  );
}

export default EditareAnunt;
