// pages/api/locations.js
import { connectToDatabase } from '../../../lib/mongodb';
import Location from '../../../model/locationModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const locations = await Location.find({}).exec();
      res.status(200).json(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ error: 'Failed to fetch locations' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}