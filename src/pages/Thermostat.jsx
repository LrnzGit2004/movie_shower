import { useState } from "react";

export default function ThermostatApp() {
  const [mois, setMois] = useState("");
  const [jour, setJour] = useState("");
  const [heure, setHeure] = useState("");
  const [resultat, setResultat] = useState(null);

  const moisOptions = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const jourOptions = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  const determinerHeureCategorie = (heureNum) => {
    if (heureNum >= 9 && heureNum < 17) return "entre9et5";
    if (heureNum < 9) return "avant9";
    return "après5";
  };

  const determinerJourType = (jour) => {
    return ["samedi", "dimanche"].includes(jour)
      ? "weekend"
      : "jour_de_travail";
  };

  const determinerOperation = (aujourdhui, heureCat) => {
    if (aujourdhui === "jour_de_travail" && heureCat === "entre9et5")
      return "heure_de_travail";
    return "pas_heure_de_travail";
  };

  const determinerSaison = (mois) => {
    if (["janvier", "février", "mars"].includes(mois))
      return "grande_saison_sèche";
    if (["avril", "mai", "juin"].includes(mois)) return "petite_saison_sèche";
    if (["juillet", "août", "septembre"].includes(mois))
      return "grande_saison_de_pluie";
    return "petite_saison_de_pluie"; // oct, nov, déc
  };

  const determinerThermostat = (saison, operation) => {
    const règles = {
      petite_saison_sèche: {
        heure_de_travail: "20°C",
        pas_heure_de_travail: "15°C",
      },
      grande_saison_de_pluie: {
        heure_de_travail: "24°C",
        pas_heure_de_travail: "27°C",
      },
      petite_saison_de_pluie: {
        heure_de_travail: "20°C",
        pas_heure_de_travail: "16°C",
      },
      grande_saison_sèche: {
        heure_de_travail: "18°C",
        pas_heure_de_travail: "14°C",
      },
    };
    return règles[saison]?.[operation] || "Inconnu";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mois || !jour || !heure) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const heureNum = parseInt(heure);
    if (isNaN(heureNum) || heureNum < 0 || heureNum > 23) {
      alert("Veuillez entrer une heure valide (0–23).");
      return;
    }

    const heureCat = determinerHeureCategorie(heureNum);
    const aujourdhui = determinerJourType(jour);
    const operation = determinerOperation(aujourdhui, heureCat);
    const saison = determinerSaison(mois);
    const thermostat = determinerThermostat(saison, operation);

    setResultat({ saison, aujourdhui, operation, thermostat });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">
        🌞 Thermostat - Système de régulation de la température
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-4 w-full max-w-md"
      >
        <div>
          <label className="block font-semibold mb-1">Mois :</label>
          <select
            value={mois}
            onChange={(e) => setMois(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Sélectionnez un mois --</option>
            {moisOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Jour :</label>
          <select
            value={jour}
            onChange={(e) => setJour(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Sélectionnez un jour --</option>
            {jourOptions.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Heure (0–23) :</label>
          <input
            type="number"
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Ex : 14"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg cursor-pointer"
        >
          Calculer la température
        </button>
      </form>

      {resultat && (
        <div className="mt-6 bg-white shadow-md rounded-2xl p-4 w-full max-w-md text-center">
          <h2 className="font-bold text-lg mb-2">Résultat :</h2>
          <p>
            <strong>Saison :</strong> {resultat.saison.replaceAll("_", " ")}
          </p>
          <p>
            <strong>Jour :</strong> {resultat.aujourdhui.replaceAll("_", " ")}
          </p>
          <p>
            <strong>Opération :</strong>{" "}
            {resultat.operation.replaceAll("_", " ")}
          </p>
          <p className="text-xl font-semibold mt-2">
            🌡️ Température à régler : {resultat.thermostat}
          </p>
        </div>
      )}
    </div>
  );
}
