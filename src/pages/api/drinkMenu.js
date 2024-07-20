// pages/api/drinkMenu.js
import { connectToDatabase } from '../../../lib/mongodb';
import Drink from '../../../model/menuModel';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const drinks = await Drink.find({}).lean();
      res.status(200).json(drinks);
      break;
    
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}