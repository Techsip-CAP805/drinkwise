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

      const updatedLocation = await Location.findByIdAndUpdate(
        branchId,
        update,
        { new: true }
      );

      // Find drinks containing the ingredient
      const drinks = await Drink.find({ 'ingredients.ingredientName': ingredientName });
      const resLoc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/currentBranch`);
      const currentBranch = await resLoc.json();

      // Update each drink's availability status
      const drinkUpdatePromises = drinks.map(async (drink) => {
        const unavailableIngredients = currentBranch[0].unavailableIngredients.map(ingredient => ingredient.ingredientName);

        const allIngredientsAvailable = drink.ingredients.every(ingredient => !unavailableIngredients.includes(ingredient.ingredientName));

        const drinkMethod = allIngredientsAvailable ? 'REMOVE' : 'ADD';

        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateLocationDrinks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            drinkID: drink.drinkID,
            branchId: currentBranch[0]._id,
            method: drinkMethod,
          }),
        });
      });

      // Wait for all updates to complete
      await Promise.all(drinkUpdatePromises);

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
