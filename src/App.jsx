import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="bg-green-700 shadow-lg p-4 text-center border-b-4 border-green-900">
        <h1 className="text-4xl font-extrabold tracking-wider">🟢 RICK & MORTY DASHBOARD</h1>
        <p className="text-green-200 text-sm mt-1">Integrasi API React JS • Tugas Mandiri</p>
      </header>

      {/* Main Content */}
      <main>
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 text-center p-6 mt-12 border-t border-gray-800">
        <p>&copy; 2026 Mahasiswa React • Powered by Rick and Morty API</p>
      </footer>
    </div>
  );
}

export default App;