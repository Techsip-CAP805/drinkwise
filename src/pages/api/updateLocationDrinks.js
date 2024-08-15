// pages/api/updateLocationDrinks.js
import { connectToDatabase } from '../../../lib/mongodb';
import Location from '../../../model/locationModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { drinkID, branchId, method } = req.body;

    // Validate request parameters
    if (typeof drinkID !== 'number' || typeof branchId !== 'string' || !['ADD', 'REMOVE'].includes(method)) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    try {
      // Define the update operation based on the method
      let update;
      if (method === 'ADD') {
        // Add the drinkID to unavailableDrinks if it is not already present
        update = { $addToSet: { unavailableDrinks: { drinkID } } };
      } else if (method === 'REMOVE') {
        // Remove the drinkID from unavailableDrinks
        update = { $pull: { unavailableDrinks: { drinkID } } };
      }

      // Update the location document
      const updatedLocation = await Location.findByIdAndUpdate(
        branchId,
        update,
        { new: true }
      );

      // Check if the location was found and updated
      if (!updatedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }

      // Respond with the updated location document
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
