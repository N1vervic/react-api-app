export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400 animate-pulse">Mengambil data dari Portal...</p>
    </div>
  );
}