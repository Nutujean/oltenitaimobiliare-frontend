import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Pagini principale
import Home from "./pages/Home";
import DetaliiAnunt from "./pages/DetaliiAnunt";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdaugaAnunt from "./pages/AdaugaAnunt";
import AnunturileMele from "./pages/AnunturileMele";
import EditareAnunt from "./pages/EditareAnunt";
import Plata from "./pages/Plata";
import SuccesPlata from "./pages/SuccesPlata";
import EroarePlata from "./pages/EroarePlata";

// 🔹 Pagini secundare
import Contact from "./pages/Contact";
import DespreNoi from "./pages/DespreNoi";
import Termeni from "./pages/Termeni";
import Confidentialitate from "./pages/Confidentialitate";
import Faq from "./pages/Faq";

// 🔹 Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Pagini principale */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adauga-anunt" element={<AdaugaAnunt />} />
            <Route path="/anunturile-mele" element={<AnunturileMele />} />
            <Route path="/anunt/:id" element={<DetaliiAnunt />} />
            <Route path="/editare-anunt/:id" element={<EditareAnunt />} />

            {/* Plată și rezultate */}
            <Route path="/plata/:id" element={<Plata />} />
            <Route path="/succes-plata" element={<SuccesPlata />} />
            <Route path="/eroare-plata" element={<EroarePlata />} />

            {/* Pagini secundare */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/despre-noi" element={<DespreNoi />} />
            <Route path="/termeni" element={<Termeni />} />
            <Route path="/confidentialitate" element={<Confidentialitate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
