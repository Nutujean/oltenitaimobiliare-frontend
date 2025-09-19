import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700">
    <rect width="100%" height="100%" fill="#e5e7eb"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-size="24" font-family="Arial, Helvetica, sans-serif">
      Fără imagine
    </text>
  </svg>`
)}`;

function resolveImg(src, backendBase) {
  if (!src) return PLACEHOLDER;
  if (/^https?:\/\//i.test(src)) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${backendBase}${path}`;
}

function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);
  const [error, setError] = useState("");

  const backendBase = useMemo(() => {
    const b = import.meta.env.VITE_BACKEND_URL || "";
    return b.endsWith("/") ? b.slice(0, -1) : b;
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/anunturi/${id}`
        );
        const data = await r.json();
        if (r.ok) setAnunt(data);
        else setError(data.error || "Eroare la încărcarea anunțului");
      } catch {
        setError("Eroare server");
      }
    };
    load();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!anunt) return <p>Se încarcă...</p>;

  const first = anunt.imagini?.[0];
  const imgUrl = resolveImg(first, backendBase);

  return (
    <div className="container detalii-anunt">
      <img
        src={imgUrl}
        alt={anunt.titlu}
        className="detalii-img"
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER;
        }}
      />

      <h2>
        {anunt.titlu}{" "}
        {anunt.pachet === "Gold" && (
          <span className="badge-gold">⭐ Gold</span>
        )}
        {anunt.pachet === "Diamond" && (
          <span className="badge-diamond">💎 Diamond</span>
        )}
      </h2>

      <p className="pret">{anunt.pret} €</p>
      <p className="badge">{anunt.categorie}</p>
      <p>{anunt.descriere}</p>
    </div>
  );
}

export default DetaliiAnunt;
