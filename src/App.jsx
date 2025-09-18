import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Pagini principale
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdaugaAnunt from "./pages/AdaugaAnunt";
import AnunturileMele from "./pages/AnunturileMele";
import EditareAnunt from "./pages/EditareAnunt";
import DetaliiAnunt from "./pages/DetaliiAnunt";

// 🔹 Pagini legale & info
import Termeni from "./pages/Termeni";
import Confidentialitate from "./pages/Confidentialitate";
import Contact from "./pages/Contact";
import DespreNoi from "./pages/DespreNoi";

// 🔹 Componente globale
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adauga-anunt" element={<AdaugaAnunt />} />
          <Route path="/anunturile-mele" element={<AnunturileMele />} />
          <Route path="/editare-anunt/:id" element={<EditareAnunt />} />
          <Route path="/anunt/:id" element={<DetaliiAnunt />} />

          {/* Pagini statice */}
          <Route path="/termeni" element={<Termeni />} />
          <Route path="/confidentialitate" element={<Confidentialitate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/despre-noi" element={<DespreNoi />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
