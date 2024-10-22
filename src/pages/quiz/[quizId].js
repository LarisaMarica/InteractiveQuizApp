import { useRouter } from 'next/router';
import Link from 'next/link';

const quizCategories = {
  '1': 'Cultură generală',
};

export default function Quiz() {
  const router = useRouter();
  const { quizId } = router.query;

  const categoryName = quizCategories[quizId] || 'Categoria necunoscută';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6">
          Test: {quizId} 
        </h1>
        <p className="mb-6">Testul constă din 3 întrebări. Fiecare întrebare are 4 variante de răspuns, dar doar una este corectă.</p>
        <p className="mb-6">Categoria testului: {categoryName}</p>
        <Link href={`/quiz/${quizId}/question/1`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
            Începe Test
          </button>
        </Link>
      </div>
    </div>
  );
}
