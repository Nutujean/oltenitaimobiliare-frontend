import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [listings, setListings] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/listings`)
      .then((res) => {
        setListings(res.data);
        setFilteredListings(res.data);
      })
      .catch((err) => console.error("Eroare API:", err));
  }, []);

  const handleSearch = () => {
    const results = listings.filter((l) => {
      const matchSearch = l.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = category ? l.category === category : true;
      return matchSearch && matchCategory;
    });

    setFilteredListings(results);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section className="relative h-[400px] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
          alt="Apartament elegant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Anunțuri imobiliare în Oltenița
          </h1>
          <p className="text-lg mb-6">
            Vinde, cumpără sau închiriază apartamente, case și terenuri.
          </p>
          <a
            href="/adauga"
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
          >
            Adaugă un anunț
          </a>
        </div>
      </section>

      {/* BARA DE CĂUTARE */}
      <section className="bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          <input
            type="text"
            placeholder="Caută după titlu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded w-full"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded w-full"
          >
            <option value="">Toate categoriile</option>
            <option value="Apartamente">Apartamente</option>
            <option value="Case">Case</option>
            <option value="Terenuri">Terenuri</option>
            <option value="Garsoniere">Garsoniere</option>
            <option value="Garaje">Garaje</option>
            <option value="Spațiu comercial">Spațiu comercial</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-700 text-white px-6 rounded hover:bg-blue-800"
          >
            Caută
          </button>
        </div>
      </section>

      {/* LISTA DE ANUNȚURI */}
      <section className="max-w-7xl mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Anunțuri recente</h2>
        {filteredListings.length === 0 ? (
          <p className="text-gray-500">Nu s-au găsit anunțuri.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-xl shadow hover:shadow-lg transition bg-white overflow-hidden"
              >
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                    Fără imagine
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {listing.description}
                  </p>
                  <p className="text-xl font-bold text-green-600 mt-2">
                    {listing.price} €
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {listing.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
