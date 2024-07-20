// pages/api/drinkMenu.js
import { connectToDatabase } from '../../../lib/mongodb';
import Drink from '../../../model/menuModel';

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const drinks = await Drink.find({}).lean();
        res.status(200).json(drinks);
      } catch (error) {
        console.error('Error fetching drinks:', error);
        res.status(500).json({ error: 'Failed to fetch drinks' });
      }
      break;
    case 'PUT':
      try {
        const { _id, ...updatedData } = req.body;
        const updatedDrink = await Drink.findByIdAndUpdate(_id, updatedData, { new: true }).lean();
        res.status(200).json(updatedDrink);
      } catch (error) {
        console.error('Error updating drink:', error);
        res.status(500).json({ error: 'Failed to update drink' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
