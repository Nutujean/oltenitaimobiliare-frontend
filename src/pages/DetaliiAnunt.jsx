import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);
  const [copiat, setCopiat] = useState(false);

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const res = await fetch(
          `https://imobila-market-backend.onrender.com/api/anunturi/${id}`
        );
        const data = await res.json();
        setAnunt(data);
      } catch (err) {
        console.error("Eroare la încărcarea anunțului:", err);
      }
    };
    fetchAnunt();
  }, [id]);

  const linkPagina = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(linkPagina);
    setCopiat(true);
    setTimeout(() => setCopiat(false), 2000);
  };

  if (!anunt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-600">Se încarcă...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* === SLIDER IMAGINI === */}
      {anunt.imagini && anunt.imagini.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-96 rounded-lg shadow"
        >
          {anunt.imagini.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Imagine ${index + 1}`}
                className="w-full h-96 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src="https://via.placeholder.com/800x400?text=Fără+imagine"
          alt="placeholder"
          className="w-full h-96 object-cover rounded-lg shadow"
        />
      )}

      {/* === DETALII ANUNȚ === */}
      <h1 className="text-2xl font-bold mt-6 mb-2">{anunt.titlu}</h1>
      <p className="text-gray-700 mb-4">{anunt.descriere}</p>

      <p className="text-xl font-semibold text-blue-600 mb-2">
        {anunt.pret} €
      </p>

      <div className="text-sm text-gray-600 mb-6">
        <p>Categorie: {anunt.categorie}</p>
        <p>Camere: {anunt.camere}</p>
        {anunt.adresa && <p>Adresă: {anunt.adresa}</p>}
      </div>

      {/* === HARTA GOOGLE MAPS === */}
      {anunt.adresa && (
        <div className="my-6">
          <h2 className="text-lg font-semibold mb-2">Locație pe hartă</h2>
          <iframe
            title="Google Maps"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              anunt.adresa
            )}&output=embed`}
          ></iframe>
        </div>
      )}

      {/* === BUTOANE DISTRIBUIRE === */}
      <div className="flex flex-wrap gap-4 my-6">
        <button
          onClick={copyLink}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          {copiat ? "Link copiat!" : "Copiază link"}
        </button>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            linkPagina
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Distribuie pe Facebook
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(linkPagina)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Distribuie pe WhatsApp
        </a>
      </div>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ← Înapoi la anunțuri
      </Link>
    </div>
  );
}
