import fs from 'fs';  
import path from 'path';  
import Category from '@/models/category'; 
import Link from 'next/link';

export const getServerSideProps = async () => {
  const filePath = path.join(process.cwd(), 'public', 'questions.json');
  
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const categoriesJson = JSON.parse(jsonData);

  const categories = categoriesJson.categories.map(category => new Category(category.id, category.name));

  const serializedCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
  }));

  return {
    props: {
      categories: serializedCategories, 
    },
  };
};

export default function Categories({ categories }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg text-gray-800 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6">Categorii</h1>
        <p className="text-lg mb-8">Alege o categorie pentru a continua:</p>
        
        <ul className="flex flex-col space-y-4">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.id}`}
                className="block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
