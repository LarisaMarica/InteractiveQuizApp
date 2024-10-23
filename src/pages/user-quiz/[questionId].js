import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UserQuestionPage() {
  const router = useRouter();
  const { questionId } = router.query;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    try {
      const storedQuestions = localStorage.getItem('questions');
      if (storedQuestions) {
        const userQuestions = JSON.parse(storedQuestions);
        setQuestions(userQuestions);
      } else {
        setError('Nu s-au găsit întrebări adăugate de utilizator');
      }
    } catch (error) {
      console.error('A apărut o eroare la obținerea datelor din localStorage:', error);
      setError('A apărut o eroare la obținerea datelor');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [questionId]);

  if (loading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div>Eroare: {error}</div>;
  }

  const question = questions.find((q) => q.id === parseInt(questionId));

  if (!question) return <p>Întrebarea nu a fost găsită</p>;

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === question.answer) {
        setScore((prevScore) => prevScore + 1);
    }
  };

  const isLastQuestion = parseInt(questionId) >= questions.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6">Întrebarea {question.id}</h1>
        <p className="mb-6">{question.question}</p>
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


        {isAnswered && (
          <div>
            <p className="mb-4">
              {selectedAnswer === question.answer
                ? 'Răspuns corect! 🎉'
                : `Răspuns greșit! Răspunsul corect este: ${question.answer}`}
            </p>

            {!isLastQuestion ? (
              <Link href={`/user-quiz/${parseInt(questionId) + 1}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                  Următoarea întrebare
                </button>
              </Link>
            ) : (
              <Link href={`/`}>
                <p className="mt-4">Ai terminat testul!</p>
                <p className="mt-4">Scorul tău: {score}/{questions.length}</p>
                <p className="mt-4">
                  {questions.length === score
                    ? 'Felicitări! Ai răspuns corect la toate întrebările! 👏'
                    : 'Mai ai de lucru la aceste întrebări. 🤔'}
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                  Înapoi acasă
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
