export default function LocationCard({ location }) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition">
      <h4 className="text-lg font-bold text-green-400 mb-1 truncate">{location.name}</h4>
      <p className="text-sm text-gray-300 mb-1">🌍 Type: {location.type || "Unknown"}</p>
      <p className="text-sm text-gray-300">📡 Dimension: {location.dimension}</p>
    </div>
  );
}