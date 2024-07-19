// model/ingredientModel.js
import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  ingredientName: { type: String, required: true },
  description: String,
  imagePath: String,
}, { collection: 'INGREDIENTS' });

const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
