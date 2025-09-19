import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nume: "",
    email: "",
    parola: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://imobila-market-backend.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Eroare la înregistrare");
      alert("Cont creat cu succes! Acum te poți loga.");
      navigate("/login");
    } catch (err) {
      alert("Eroare: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Înregistrare</h2>

        <input
          type="text"
          placeholder="Nume"
          value={form.nume}
          onChange={(e) => setForm({ ...form, nume: e.target.value })}
          className="border rounded px-3 py-2 w-full mb-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border rounded px-3 py-2 w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Parolă"
          value={form.parola}
          onChange={(e) => setForm({ ...form, parola: e.target.value })}
          className="border rounded px-3 py-2 w-full mb-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Se înregistrează..." : "Creează cont"}
        </button>
      </form>
    </div>
  );
}
