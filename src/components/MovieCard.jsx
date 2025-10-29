export default function MovieCard({ movie }) {
  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <img
        src={movie.image}
        alt={movie.name}
        className="w-full h-48 object-contain rounded"
      />
      <h3 className="text-lg font-bold mt-2">{movie.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{movie.synopsis}</p>
    </div>
  );
}
