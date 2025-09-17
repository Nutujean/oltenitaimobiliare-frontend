import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pagini
import Home from "./pages/Home";
import DetaliiAnunt from "./pages/DetaliiAnunt";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdaugaAnunt from "./pages/AdaugaAnunt";
import AnunturileMele from "./pages/AnunturileMele";
import EditareAnunt from "./pages/EditareAnunt";

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anunt/:id" element={<DetaliiAnunt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adauga-anunt" element={<AdaugaAnunt />} />
          <Route path="/anunturile-mele" element={<AnunturileMele />} />
          <Route path="/editare-anunt/:id" element={<EditareAnunt />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
