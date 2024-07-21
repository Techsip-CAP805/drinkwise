// pages/api/updateLocationIngredients.js
import { connectToDatabase } from '../../../lib/mongodb';
import Location from '../../../model/locationModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { ingredientName, branchId, method } = req.body;

    try {
      const update = method === 'ADD'
        ? { $addToSet: { unavailableIngredients: { ingredientName } } }
        : { $pull: { unavailableIngredients: { ingredientName } } };

      const updatedLocation = await Location.findByIdAndUpdate(
        branchId,
        update,
        { new: true }
      );

      res.status(200).json(updatedLocation);
    } catch (error) {
      console.error('Error updating location ingredients:', error);
      res.status(500).json({ error: 'Failed to update location ingredients' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
