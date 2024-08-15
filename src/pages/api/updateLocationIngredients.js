// pages/api/updateLocationIngredients.js
import { connectToDatabase } from '../../../lib/mongodb';
import Location from '../../../model/locationModel';
import Drink from '../../../model/menuModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { ingredientName, branchId, method } = req.body;

    try {
      const update = method === 'ADD'
        ? { $addToSet: { unavailableIngredients: { ingredientName } } }
        : { $pull: { unavailableIngredients: { ingredientName } } };

      // Update the location document for unavailableIngredients
      const updatedLocation = await Location.findByIdAndUpdate(
        branchId,
        update,
        { new: true }
      );

      if (!updatedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }

      // Get all drinks that contain the ingredient
      const drinks = await Drink.find({ 'ingredients.ingredientName': ingredientName });

      if (method === 'ADD') {
        // When making an ingredient unavailable, update unavailableDrinks
        const drinkUpdatePromises = drinks.map(drink => {
          return fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateLocationDrinks`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              drinkID: drink.drinkID,
              branchId: branchId,
              method: 'ADD', // Add drink to unavailableDrinks
            }),
          });
        });

        await Promise.all(drinkUpdatePromises);
      } else {
        // When making an ingredient available, update unavailableDrinks
        const unavailableIngredients = updatedLocation.unavailableIngredients.map(ingredient => ingredient.ingredientName);

        const drinkUpdatePromises = drinks.map(async (drink) => {
          const drinkID = drink.drinkID;

          // Check if the drink is already in unavailableDrinks
          const isInUnavailableDrinks = updatedLocation.unavailableDrinks.some(d => d.drinkID === drinkID);

          // Check if the drink still has other unavailable ingredients
          const drinkIngredients = drink.ingredients.map(ingredient => ingredient.ingredientName);
          const hasOtherUnavailableIngredients = drinkIngredients.some(ingredient => unavailableIngredients.includes(ingredient) && ingredient !== ingredientName);

          if (isInUnavailableDrinks && !hasOtherUnavailableIngredients) {
            return fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateLocationDrinks`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                drinkID: drinkID,
                branchId: branchId,
                method: 'REMOVE', // Remove drink from unavailableDrinks
              }),
            });
          }
        });

        // Filter out undefined promises (when `isInUnavailableDrinks` is false or `hasOtherUnavailableIngredients` is true)
        await Promise.all(drinkUpdatePromises.filter(promise => promise !== undefined));
      }

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
