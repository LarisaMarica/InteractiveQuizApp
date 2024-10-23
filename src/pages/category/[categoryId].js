import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Quiz from '@/models/quiz';
import Question from '@/models/question';

export async function getServerSideProps(context) {
  const categoriesPath = path.join(process.cwd(), 'public', 'questions.json');
  const jsonData = fs.readFileSync(categoriesPath, 'utf-8');
  const categoriesJson = JSON.parse(jsonData);

  const categoryId = parseInt(context.params.categoryId); 

  const category = categoriesJson.categories.find((category) => category.id === categoryId);

  if (!category) {
    return {
      notFound: true,
    };
  }

  const quizzes = category.quizzes.map((quiz) => {
    const questions = quiz.questions.map((question) => new Question(
      question.id,
      question.question,
      question.options,
      question.answer
    ));

    return new Quiz(quiz.quiz_id, questions, categoryId);
  });

  const serializedQuizzes = quizzes.map((quiz) => ({
    id: quiz.id,
    questions: quiz.questions.map((question) => ({
      id: question.id,
      question: question.question,
      options: question.options,
      answer: question.answer,
    })),
    categoryId: quiz.category,
  }));

  return {
    props: {
      quizzes: serializedQuizzes, 
      categoryId,
      categoryName: category.name,
    },
  };
}



export default function CategoryPage({ quizzes, categoryId, categoryName }) {
  const categoryQuizzes = quizzes.filter((quiz) => quiz.categoryId === categoryId);

  if (!categoryQuizzes.length) {
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
          {categoryQuizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link
                href={`/quiz/${quiz.id}`}
                className="block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                Test {quiz.id}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

