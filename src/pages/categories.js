import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/questions.json');
        if (!res.ok) throw new Error('Eroare la obținerea datelor');

        const data = await res.json();
        const serializedCategories = data.categories.map(({ id, name }) => ({ id, name }));

        const storedQuestions = localStorage.getItem('questions');
        const userQuestions = storedQuestions ? JSON.parse(storedQuestions) : [];

        const userQuestionsCategory = userQuestions.length > 0
          ? { id: 'user-questions', name: 'Întrebări utilizator' }
          : null;

        setCategories(userQuestionsCategory
          ? [...serializedCategories, userQuestionsCategory]
          : serializedCategories);
      } catch (err) {
        console.error('A apărut o eroare:', err);
        setError('Nu s-au putut încărca categoriile');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Se încarcă...</div>;
  if (error) return <div>Eroare: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6">Categorii</h1>
        <p className="text-lg mb-8">Alege o categorie pentru a continua:</p>
        <ul className="flex flex-col space-y-4">
          {categories.map(({ id, name }) => (
            <li key={id}>
              <Link
                href={`/category/${id}`}
                className="block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}