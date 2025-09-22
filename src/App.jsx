import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pagini
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdaugaAnunt from "./pages/AdaugaAnunt";
import AnunturileMele from "./pages/AnunturileMele";
import DetaliiAnunt from "./pages/DetaliiAnunt";
import Contact from "./pages/Contact";
import DespreNoi from "./pages/DespreNoi";
import Termeni from "./pages/Termeni";
import Confidentialitate from "./pages/Confidentialitate";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar sus */}
        <Navbar />

        {/* Conținut pagină */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adauga-anunt" element={<AdaugaAnunt />} />
            <Route path="/anunturile-mele" element={<AnunturileMele />} />
            <Route path="/anunt/:id" element={<DetaliiAnunt />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/despre" element={<DespreNoi />} />
            <Route path="/termeni" element={<Termeni />} />
            <Route path="/confidentialitate" element={<Confidentialitate />} />
          </Routes>
        </main>

        {/* Footer jos */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
