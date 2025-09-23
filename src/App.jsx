import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdaugaAnunt from "./pages/AdaugaAnunt";
import AnunturileMele from "./pages/AnunturileMele";
import DetaliiAnunt from "./pages/DetaliiAnunt";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adauga" element={<AdaugaAnunt />} />
          <Route path="/anunturile-mele" element={<AnunturileMele />} />
          <Route path="/anunt/:id" element={<DetaliiAnunt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
