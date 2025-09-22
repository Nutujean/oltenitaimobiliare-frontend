import React, { useState } from "react";
import API_URL from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Eroare la login");
        return;
      }

      // ✅ salvăm tokenul corect
      localStorage.setItem("token", data.token);
      alert("✅ Autentificat cu succes!");
      window.location.href = "/"; // redirecționare acasă
    } catch (err) {
      console.error("❌ Eroare fetch:", err);
      alert("Eroare de rețea la login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto space-y-3">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Parolă"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Autentificare
      </button>
    </form>
  );
}
