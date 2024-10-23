import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6">Bine ai venit la Quiz App!</h1>
        <p className="text-lg mb-8">Vizualizează categoriile disponibile:</p>

        <ul className="flex flex-col space-y-4">
          <li>
            <Link href="/categories" className="block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center">
              Categorii
            </Link>
          </li>
          <li>
            <Link href="/add-question" className="block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center">
              Adaugă Întrebare Nouă
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
