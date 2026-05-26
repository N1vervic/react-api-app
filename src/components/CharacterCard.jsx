export default function CharacterCard({ character }) {
  const statusColor = character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition transform duration-200 border border-gray-700">
      <img 
        src={character.image} 
        alt={character.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1 truncate">{character.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
          <span className="text-sm text-gray-300">{character.status} - {character.species}</span>
        </div>
        <div className="text-xs text-gray-400 bg-gray-700 p-2 rounded">
          📍 Origin: {character.origin.name}
        </div>
      </div>
    </div>
  );
}