// pages/api/ingredients.js
import { connectToDatabase } from '../../../lib/mongodb';
import Ingredient from '../../../model/ingredientModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      console.log("try");
      const ingredients = await Ingredient.find({}).exec();
      res.status(200).json(ingredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      res.status(500).json({ error: 'Failed to fetch ingredients' });
    }
  } else {
    console.log("try another");
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
