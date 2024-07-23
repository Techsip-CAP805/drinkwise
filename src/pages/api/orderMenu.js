// pages/api/orderMenu.js
import { connectToDatabase } from '../../../lib/mongodb';
import Drink from '../../../model/menuModel';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'GET') {
        try {
            const drinks = await Drink.find({}).lean();
            res.status(200).json(drinks);
        } catch (error) {
            console.error('Error fetching drinks:', error);
            res.status(500).json({ error: 'Failed to fetch drinks' });
        }
    }
    else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
