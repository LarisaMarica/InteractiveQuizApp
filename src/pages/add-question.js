import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddQuestion() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setCorrectAnswer] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing questions from localStorage or start with an empty array
    const questions = JSON.parse(localStorage.getItem('questions')) || [];

    // Calculate the next ID
    const newId = questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;

    // Create new question object with the calculated ID
    const newQuestion = {
      id: newId,
      question,
      options,
      answer,
      category: 'user-questions',
    };

    // Save the updated questions array to localStorage
    localStorage.setItem('questions', JSON.stringify([...questions, newQuestion]));

    alert('Întrebarea a fost adăugată cu succes!');
      
    // Reset form fields
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');

    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Adaugă o nouă întrebare</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Întrebare</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          {options.map((option, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-semibold">Variantă {index + 1}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Răspuns corect</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Adaugă Întrebarea
          </button>
        </form>
      </div>
    </div>
  );
}
