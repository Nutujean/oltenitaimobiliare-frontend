import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function Register() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [telefon, setTelefon] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://imobila-market-backend.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, parola, telefon }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Eroare la înregistrare");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>🆕 Înregistrare</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="form-styled">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Parolă"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Telefon (opțional)"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />

          <BlueButton type="submit" style={{ marginTop: "15px", width: "100%" }}>
            📝 Creează cont
          </BlueButton>
        </form>
      </div>
    </div>
  );
}

export default Register;
