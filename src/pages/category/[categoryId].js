import { useRouter } from 'next/router';
import Link from 'next/link';
import Quiz from '@/models/quiz';
import Question from '@/models/question';

const quizzes = [
  new Quiz(
    1, 
    [new Question(1,
      'Care este cel mai lung fluviu din Europa?',
      ['Dunarea', 'Volga', 'Tisa', 'Tamisa'],
      'Volga',
    ),
    new Question(2,
      'Cine a pictat celebrul tablou “Mona Lisa”?',
      ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
      'Leonardo da Vinci',
    ),
    new Question(3,
      'Cine a fost primul președinte al Statelor Unite ale Americii?',
      ['George Washington', 'Thomas Jefferson', 'John Adams', 'James Madison'],
      'George Washington',
    )],
    'general-knowledge'),
]

const categoryNames = {
  'general-knowledge': 'Cultură generală',
};

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = router.query;
  const categoryName = categoryNames[categoryId];

  const categoryQuizzes = quizzes.filter((quiz) => quiz.category === categoryId);

  if (!categoryQuizzes) {
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
