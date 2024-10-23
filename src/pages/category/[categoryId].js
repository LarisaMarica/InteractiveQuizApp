import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = router.query;

  const [quizzes, setQuizzes] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryId) {
      fetch(`/api/questions`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Eroare la încărcarea datelor');
          }
          return res.json();
        })
        .then((data) => {
          const category = data.categories.find(
            (cat) => cat.id === parseInt(categoryId)
          );

          if (category) {
            setQuizzes(category.quizzes);
            setCategoryName(category.name);
            setError(null);
          } else {
            setError('Categoria nu a fost găsită');
          }
          setLoading(false);
        })
        .catch((err) => {
          setError('Nu s-au putut încărca testele');
          setLoading(false);
        });
    }
  }, [categoryId]);

  if (loading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div>Eroare: {error}</div>;
  }

  if (!quizzes.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h1 className="text-4xl font-bold">Categoria nu a fost găsită!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6">Teste pentru categoria {categoryName}</h1>
        
        <ul className="flex flex-col space-y-4">
          {quizzes.map((quiz) => (
            <li >
              <Link
                href={`/quiz/${quiz.quiz_id}`}
                className="block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                Test {quiz.quiz_id}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
