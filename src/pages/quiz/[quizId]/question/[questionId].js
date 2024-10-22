import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Question from '@/models/question';

// Array of questions
const questions = [
  new Question(
    1,
    'Care este cel mai lung fluviu din Europa?',
    ['Dunarea', 'Volga', 'Tisa', 'Tamisa'],
    'Volga',
  ),
  new Question(
    2,
    'Cine a pictat celebrul tablou “Mona Lisa”?',
    ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
    'Leonardo da Vinci',
  ),
  new Question(
    3,
    'Cine a fost primul președinte al Statelor Unite ale Americii?',
    ['George Washington', 'Thomas Jefferson', 'John Adams', 'James Madison'],
    'George Washington',
  ),
];

export default function QuestionPage() {
  const router = useRouter();
  const { questionId } = router.query;

  // Find the question using the questionId
  const question = questions.find((q) => q.id === parseInt(questionId));

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [questionId]);

  // Log the question object to verify if options is an array
  console.log('Current question:', question);

  if (!question) return <p>Întrebarea nu a fost găsită</p>;

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setIsAnswered(true);
  };

  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6">{question.question}</h1>
        <ul className="flex flex-col space-y-4 mb-6">
          {question.options.map((option, index) => (
            <li key={index}>
              <button
                className={`block w-full py-3 rounded-lg transition duration-300 ${
                  isAnswered
                    ? option === question.answer
                      ? 'bg-green-500'
                      : option === selectedAnswer
                      ? 'bg-red-500'
                      : 'bg-gray-200'
                    : 'bg-blue-500 hover:bg-blue-700'
                } text-white font-semibold`}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>

        {isAnswered ? (
          <div>
            <p className="mb-4">
              {isCorrect ? 'Răspuns corect! 🎉' : `Răspuns greșit! Răspunsul corect este: ${question.answer}`}
            </p>
            {parseInt(questionId) < questions.length ? (
              <Link href={`/quiz/1/question/${parseInt(questionId) + 1}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                  Următoarea întrebare
                </button>
              </Link>
            ) : (
              <p>Ai terminat testul!</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
