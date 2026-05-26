import { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import LocationCard from './LocationCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function Dashboard() {
  // ===== STATE UNTUK KARAKTER (Endpoint 1) =====
  const [characters, setCharacters] = useState([]);
  const [charLoading, setCharLoading] = useState(true);
  const [charError, setCharError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // ===== STATE UNTUK LOKASI (Endpoint 2) =====
  const [locations, setLocations] = useState([]);
  const [locLoading, setLocLoading] = useState(true);

  // ===== FETCH DATA KARAKTER =====
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setCharLoading(true);
        // Ambil 3 halaman agar data cukup untuk demo search/filter
        const [res1, res2, res3] = await Promise.all([
          axios.get('https://rickandmortyapi.com/api/character?page=1'),
          axios.get('https://rickandmortyapi.com/api/character?page=2'),
          axios.get('https://rickandmortyapi.com/api/character?page=3'),
        ]);
        
        const allCharacters = [...res1.data.results, ...res2.data.results, ...res3.data.results];
        setCharacters(allCharacters);
      } catch (err) {
        console.error('Error fetch characters:', err);
        setCharError('Gagal menghubungi Citadel of Ricks. Periksa koneksi internet.');
      } finally {
        setCharLoading(false); // ✅ Selalu dieksekusi
      }
    };

    fetchCharacters();
  }, []);

  // ===== FETCH DATA LOKASI =====
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('https://rickandmortyapi.com/api/location');
        setLocations(res.data.results);
      } catch (err) {
        console.error('Error fetch locations:', err);
      } finally {
        setLocLoading(false); // ✅ FIX: Selalu dieksekusi, sukses atau error
      }
    };
    
    fetchLocations();
  }, []);

  // ===== LOGIKA SEARCH & FILTER =====
  const filteredCharacters = characters.filter(char => {
    const matchSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'All' || char.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchFilter;
  });

  // ===== CONDITIONAL RENDERING =====
  if (charError) {
    return <ErrorMessage message={charError} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* ===== SECTION 1: CHARACTER DIRECTORY ===== */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-green-400 mb-6 border-b border-gray-700 pb-2">
          🧬 Character Directory
        </h2>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari nama karakter..."
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-green-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">Semua Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Grid Hasil */}
        {charLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <p className="mb-4 text-gray-400">
              Menampilkan {filteredCharacters.length} dari {characters.length} karakter
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCharacters.map(char => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </div>
            {filteredCharacters.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                Tidak ada karakter yang cocok dengan pencarianmu.
              </p>
            )}
          </>
        )}
      </section>

      {/* ===== SECTION 2: LOKASI TERKENAL (Endpoint Ke-2) ===== */}
      <section>
        <h2 className="text-2xl font-bold text-purple-400 mb-6 border-b border-gray-700 pb-2">
          🌍 Known Locations
        </h2>
        {locLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.slice(0, 6).map(loc => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}