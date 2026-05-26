export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-900/50 border border-red-500 text-red-200 p-6 rounded-lg text-center my-4">
      <p className="text-lg font-bold mb-2">⚠️ {message}</p>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
      >
        Coba Lagi
      </button>
    </div>
  );
}