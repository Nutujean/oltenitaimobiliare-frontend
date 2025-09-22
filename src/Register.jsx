import React, { useState } from "react";
import API_URL from "./api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [mesaj, setMesaj] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, parola }),
      });

      const data = await res.json();

      if (res.ok) {
        setMesaj("✅ Utilizator inregistrat cu succes!");
      } else {
        setMesaj(data.error || "❌ Eroare la inregistrare");
      }
    } catch (err) {
      setMesaj("❌ Eroare server");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-bold">Inregistrare</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="password"
        placeholder="Parola"
        value={parola}
        onChange={(e) => setParola(e.target.value)}
        className="w-full border p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Inregistreaza-te
      </button>
      {mesaj && <p className="mt-2">{mesaj}</p>}
    </form>
  );
}
