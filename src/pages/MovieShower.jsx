import { useState } from "react";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";
import UserForm from "../components/UserForm";

export default function MovieShower() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // ici

  const rules = [
    {
      condition: (a) => a.action && a.science_fiction,
      movie: "Matrix",
      rule: "R1",
    },
    {
      condition: (a) => a.action && a.histoire,
      movie: "Gladiator",
      rule: "R2",
    },
    {
      condition: (a) => a.comedie && a.romance,
      movie: "Quatre mariages et un enterrement",
      rule: "R3",
    },
    {
      condition: (a) => a.horreur && a.suspense,
      movie: "The Shining",
      rule: "R4",
    },
    {
      condition: (a) => a.animation && a.age < 12,
      movie: "Le Roi Lion",
      rule: "R5",
    },
    {
      condition: (a) => a.animation && a.age >= 12,
      movie: "Toy Story",
      rule: "R6",
    },
    {
      condition: (a) => a.drame && a.histoire,
      movie: "La Liste de Schindler",
      rule: "R7",
    },
    {
      condition: (a) => a.science_fiction && a.suspense,
      movie: "Inception",
      rule: "R8",
    },
  ];

  const handleSubmit = (data) => {
    setAnswers(data);
    setLoading(true); // démarrage du loader

    // Simuler un "temps de réflexion" de 2 secondes
    setTimeout(() => {
      const matched = rules
        .filter((r) => r.condition(data))
        .map((r) => ({
          ...movies.find((m) => m.name === r.movie),
          rule: r.rule,
        }));
      setResults(matched);
      setLoading(false); // arrêt du loader
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎬 Système de Recommandation de Films
      </h1>
      <UserForm onSubmit={handleSubmit} />

      {loading && (
        <div className="flex flex-col items-center justify-center mt-10 text-gray-700">
          <div className="loader mb-3"></div>
          <p>Analyse de tes préférences... 🍿</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-8 mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold">Films recommandés :</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-700">
            <h3 className="font-semibold">
              Raisonnement déclenchés par vos préférences :
            </h3>
            <ul className="list-disc ml-5">
              {results.map((m) => (
                <li key={m.rule}>{m.rule} a été déclenchée</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-10 text-center text-gray-500 text-sm">
        Made with ❤️ by Ing Eric Lorryl SOBZE - Ing KORASSI Daniel
      </div>
    </div>
  );
}
