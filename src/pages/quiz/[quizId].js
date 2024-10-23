import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const quizCategories = {
  '1': 'Cultură generală',
};

export async function getServerSideProps(context) {
  const categoriesPath = path.join(process.cwd(), 'public', 'questions.json');
  const jsonData = fs.readFileSync(categoriesPath, 'utf-8');
  const categoriesJson = JSON.parse(jsonData);

  const quizId = parseInt(context.params.quizId);

  const category = categoriesJson.categories.find((category) =>
    category.quizzes.some((quiz) => quiz.quiz_id === quizId)
  );

  if (!category) {
    return {
      notFound: true,
    };
  }

  const quiz = category.quizzes.find((quiz) => quiz.quiz_id === quizId);

  if (!quiz) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categoryName: category.name,
      quizId,
    },
  };
}

export default function Quiz({ quizId, categoryName }) {

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
