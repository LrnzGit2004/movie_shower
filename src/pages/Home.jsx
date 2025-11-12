import { Link } from "react-router-dom";

export default function Home() {
  const exercices = [
    {
      name: "Movie Shower",
      path: "/movie-shower",
      image: "/images/film.png",
      description: "Système de recommandation de films basé sur les règles.",
    },
    {
      name: "Régulation du Thermostat",
      path: "/thermostat",
      image: "/images/thermomètre.png",
      description:
        "Système intelligent de contrôle automatique de la température.",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-linear-to-b from-blue-100 to-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
          Exercices Pratiques de Systèmes Intelligents
        </h1>
        <p className="text-lg opacity-90">
          Liste des exercices et TP de systèmes intelligents – M1 INFO – <br />
          Université de Ngaoundéré (2025–2026)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {exercices.map((ex, i) => (
          <Link
            key={i}
            to={ex.path}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={ex.image}
              alt={ex.name}
              className="w-full h-52 object-cover group-hover:opacity-80 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-80"></div>

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h2 className="text-2xl font-bold mb-2">{ex.name}</h2>
              <p className="text-sm opacity-90">{ex.description}</p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-xs">
              <span className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md">
                ➜ Ouvrir l’exercice
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-500 text-sm">
        Made with ❤️ by Ing Eric Lorryl SOBZE - Ing KORASSI Daniel
      </div>
    </div>
  );
}
