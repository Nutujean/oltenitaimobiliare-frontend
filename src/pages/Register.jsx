import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function Register() {
  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://oltenitaimobiliare-backend.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nume, email, parola }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Eroare la înregistrare");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>🆕 Creează cont</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="form-styled">
          <input
            type="text"
            placeholder="Nume complet"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />

          <BlueButton type="submit" style={{ width: "100%", marginTop: "10px" }}>
            Înregistrează-te
          </BlueButton>
        </form>
      </div>
    </div>
  );
}

export default Register;
