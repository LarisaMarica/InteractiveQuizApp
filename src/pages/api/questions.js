import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'questions.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    const questions = JSON.parse(fileContents);
    
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error reading questions.json:', error);
    res.status(500).json({ message: 'Eroare la citirea fișierului questions.json', error });
  }
}
