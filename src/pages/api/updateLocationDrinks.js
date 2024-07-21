// pages/api/updateLocationDrinks.js
import { connectToDatabase } from '../../../lib/mongodb';
import Location from '../../../model/locationModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { drinkID, branchId, method } = req.body;

    if (typeof drinkID !== 'string' || typeof branchId !== 'string' || !['ADD', 'REMOVE'].includes(method)) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    try {
      const update = method === 'ADD'
        ? { $addToSet: { unavailableDrinks: drinkID } }
        : { $pull: { unavailableDrinks: drinkID } };

      const updatedLocation = await Location.findByIdAndUpdate(
        branchId,
        update,
        { new: true }
      );

      if (!updatedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }

      res.status(200).json(updatedLocation);
    } catch (error) {
      console.error('Error updating location drinks:', error);
      res.status(500).json({ error: 'Failed to update location drinks' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
