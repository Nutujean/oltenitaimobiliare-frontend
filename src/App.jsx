import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnunturileMele from "./pages/AnunturileMele";
import AdaugaAnunt from "./pages/AdaugaAnunt";   // <-- adăugat
console.log("🔑 Backend URL:", import.meta.env.VITE_BACKEND_URL);


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adauga" element={<AdaugaAnunt />} />   {/* nou */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/anunturile-mele" element={<AnunturileMele />} />
        </Routes>
      </main>
    </div>
  );
}
