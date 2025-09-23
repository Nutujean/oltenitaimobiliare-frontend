import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">Oltenita Imobiliare</Link>
      <div className="space-x-4">
        <Link to="/">Acasă</Link>
        <Link to="/adauga">Adaugă Anunț</Link>
        <Link to="/anunturile-mele">Anunțurile Mele</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
