// models/menuModel.js
import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  ingredientName: { type: String, required: true },
});

const sizeOptionSchema = new mongoose.Schema({
  size: String,
  price: Number,
});

const drinkSchema = new mongoose.Schema({
  drinkID: { type: Number, required: true },
  drinkName: { type: String, required: true },
  ingredients: [ingredientSchema],
  description: { type: String },
  category: { type: String },
  sizeOptions: [sizeOptionSchema],
  iceLevelOptions: [String],
  sugarLevelOptions: [String],
  onMenu: { type: Boolean, default: true },
  basePrice: { type: Number },
  imagePath: { type: String },
}, { collection: 'DRINK' });

const Drink = mongoose.models.Drink || mongoose.model('Drink', drinkSchema);

export default Drink;
