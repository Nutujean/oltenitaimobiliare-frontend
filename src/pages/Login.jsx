import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";

function Login() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://imobila-market-backend.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, parola }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Eroare la autentificare");
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>🔑 Autentificare</h2>
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

          <BlueButton type="submit" style={{ marginTop: "15px", width: "100%" }}>
            🔓 Intră în cont
          </BlueButton>
        </form>
      </div>
    </div>
  );
}

export default Login;
