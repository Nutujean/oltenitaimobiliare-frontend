import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pagini
import Home from "./pages/Home";
import AdaugaAnunt from "./pages/AdaugaAnunt";
import AnunturileMele from "./pages/AnunturileMele";
import DetaliiAnunt from "./pages/DetaliiAnunt";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import DespreNoi from "./pages/DespreNoi";
import Termeni from "./pages/Termeni";
import Confidentialitate from "./pages/Confidentialitate";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adauga-anunt" element={<AdaugaAnunt />} />
          <Route path="/anunturile-mele" element={<AnunturileMele />} />
          <Route path="/anunt/:id" element={<DetaliiAnunt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/despre" element={<DespreNoi />} />
          <Route path="/termeni" element={<Termeni />} />
          <Route path="/confidentialitate" element={<Confidentialitate />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
