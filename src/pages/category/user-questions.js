import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UserQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

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

    if (loading) {
        return <div>Se încarcă...</div>;
    }

    if (error) {
        return <div>Eroare: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
                <h1 className="text-4xl font-bold mb-6">Întrebările adăugate de tine</h1>
                <p className="mb-6">Aici este un test format din întrebările adăugate de tine. Fiecare întrebare are 4 variante de răspuns, dar doar una este corectă.</p>
                <Link href="/user-quiz/1">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                        Începe testul
                    </button>
                </Link>
            </div>
        </div>
    );
}
