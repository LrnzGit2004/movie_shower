import { useState } from "react";

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    age: "",
    action: false,
    science_fiction: false,
    histoire: false,
    comedie: false,
    romance: false,
    horreur: false,
    suspense: false,
    animation: false,
    drame: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, age: parseInt(form.age) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg p-5 rounded-lg max-w-md mx-auto"
    >
      <label className="block mb-2 font-medium">Entrez votre âge :</label>
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-4"
        required
      />

      <p className="font-semibold mb-2">Quels genres aimés-vous ? :</p>
      {[
        "action",
        "science_fiction",
        "histoire",
        "comedie",
        "romance",
        "horreur",
        "suspense",
        "animation",
        "drame",
      ].map((genre) => (
        <label key={genre} className="block">
          <input
            type="checkbox"
            name={genre}
            checked={form[genre]}
            onChange={handleChange}
            className="mr-2"
          />
          {genre.replace("_", " ")}
        </label>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Obtenir mes recommandations
      </button>
    </form>
  );
}
