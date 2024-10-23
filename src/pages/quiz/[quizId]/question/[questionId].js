import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Question from '@/models/question';

export async function getServerSideProps(context) {
  const filePath = path.join(process.cwd(), 'public', 'questions.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
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
  const questions = quiz.questions.map((question) => new Question(
    question.id,
    question.question,
    question.options,
    question.answer
  ));
  const serializedQuestions = questions.map((question) => ({
    id: question.id,
    question: question.question,
    options: question.options,
    answer: question.answer,
  }));

  return {
    props: {
      quizId,
      questions: serializedQuestions, 
    },
  };
}

export default function QuestionPage({ quizId, questions }) {
  const router = useRouter();
  const { questionId } = router.query;

  const question = questions.find((q) => q.id === parseInt(questionId));

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0); 

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [questionId]);

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
              {isCorrect ? 'Răspuns corect! 🎉' : `Răspuns greșit! Răspunsul corect este: ${question.answer}`}
            </p>

            {!isLastQuestion ? (
              <Link href={`/quiz/${quizId}/question/${parseInt(questionId) + 1}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                  Următoarea întrebare
                </button>
              </Link>
            ) : (
              <Link href={`/`}>
                <p className="mt-4">Ai terminat testul!</p>
                <p className="mt-4">Scorul tău: {score}/{questions.length}</p>
                <p className="mt-4">{questions.length === score ? 'Felicitări! Ai răspuns corect la toate întrebările! 👏' : 'Mai ai de lucru la aceste întrebări. 🤔'}</p>
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
