import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const { quizId } = router.query;

  useEffect(() => {
    if (quizId) {
      fetch('/api/questions')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Eroare la obținerea datelor');
          }
          return res.json();
        })
        .then((data) => {
          const category = data.categories.find((category) =>
            category.quizzes.some((quiz) => quiz.quiz_id === parseInt(quizId))
          );

          if (category) {
            const quiz = category.quizzes.find((quiz) => quiz.quiz_id === parseInt(quizId));
            setQuizData({ categoryName: category.name, quizId: quiz.quiz_id });
          } else {
            setError('Nu s-a găsit testul');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError('A apărut o eroare la obținerea datelor');
          setLoading(false);
        });
    }
  }, [quizId]);

  if (loading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div>Eroare: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6">
          Test: {quizData.quizId}
        </h1>
        <p className="mb-6">Testul constă din 3 întrebări. Fiecare întrebare are 4 variante de răspuns, dar doar una este corectă.</p>
        <p className="mb-6">Categoria testului: {quizData.categoryName}</p>
        <Link href={`/quiz/${quizData.quizId}/question/1`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
            Începe Test
          </button>
        </Link>
      </div>
    </div>
  );
}
