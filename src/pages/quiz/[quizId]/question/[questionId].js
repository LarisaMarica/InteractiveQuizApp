import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function QuestionPage() {
  const router = useRouter();
  const { quizId, questionId } = router.query;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions`);
        if (!res.ok) throw new Error('Eroare la încărcarea întrebărilor');

        const data = await res.json();
        const quiz = data.categories
          .flatMap((category) => category.quizzes)
          .find((quiz) => quiz.quiz_id === parseInt(quizId));

        if (quiz) {
          setQuestions(quiz.questions);
        } else {
          setError('Nu am găsit testul');
        }
      } catch (err) {
        setError('Nu s-au putut încărca întrebările');
      } finally {
        setLoading(false);
      }
    };

    if (quizId) fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [questionId]);

  if (loading) return <div>Se încarcă...</div>;
  if (error) return <div>Eroare: {error}</div>;

  const question = questions.find((q) => q.id === parseInt(questionId));
  if (!question) return <p>Întrebarea nu a fost găsită</p>;

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === question.answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const isCorrect = selectedAnswer === question.answer;
  const isLastQuestion = parseInt(questionId) >= questions.length;

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

        {isAnswered && (
          <div>
            <p className="mb-4">
              {isCorrect
                ? 'Răspuns corect! 🎉'
                : `Răspuns greșit! Răspunsul corect este: ${question.answer}`}
            </p>

            {!isLastQuestion ? (
              <Link href={`/quiz/${quizId}/question/${parseInt(questionId) + 1}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                  Următoarea întrebare
                </button>
              </Link>
            ) : (
              <div>
                <p className="mt-4">Ai terminat testul!</p>
                <p className="mt-4">Scorul tău: {score}/{questions.length}</p>
                <p className="mt-4">
                  {questions.length === score
                    ? 'Felicitări! Ai răspuns corect la toate întrebările! 👏'
                    : 'Mai ai de lucru la aceste întrebări. 🤔'}
                </p>
                <Link href={`/`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                    Înapoi acasă
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
