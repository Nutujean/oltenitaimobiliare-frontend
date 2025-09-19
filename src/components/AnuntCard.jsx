import { Link } from "react-router-dom";

export default function AnuntCard({ anunt }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col">
      {/* Imagine */}
      <div className="relative">
        <img
          src={anunt.imagini?.[0] || "https://via.placeholder.com/400x250"}
          alt={anunt.titlu}
          className="w-full h-48 object-cover rounded-lg"
        />
        {anunt.pachet && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-blue-900 text-xs font-semibold px-2 py-1 rounded">
            {anunt.pachet}
          </span>
        )}
      </div>

      {/* Conținut */}
      <div className="flex-1 mt-3 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {anunt.titlu}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{anunt.locatie}</p>
        <p className="text-blue-600 font-bold text-lg mb-4">{anunt.pret} €</p>

        {/* Buton Detalii */}
        <Link
          to={`/anunt/${anunt._id}`}
          className="mt-auto bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
        >
          Vezi detalii
        </Link>
      </div>
    </div>
  );
}
