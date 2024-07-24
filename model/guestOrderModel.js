// models/orderModel.js
import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  ingredientName: { type: String, required: true },
});

const sizeOptionSchema = new mongoose.Schema({
  size: { type: String, required: true },
});

const iceLevelSchema = new mongoose.Schema({
  iceLevel: { type: Number, required: true },
});

const sugarLevelSchema = new mongoose.Schema({
  sugarLevel: { type: Number, required: true },
});

const drinkSchema = new mongoose.Schema({
  drinkID: { type: Number, required: true },
  drinkName: { type: String, required: true },
  ingredients: [ingredientSchema],
  description: { type: String },
  category: { type: String },
  sizeOptions: [sizeOptionSchema],
  iceLevelOptions: [iceLevelSchema],
  sugarLevelOptions: [sugarLevelSchema],
  onMenu: { type: Boolean, default: true },
  basePrice: { type: Number },
  imagePath: { type: String },
  quantity: { type: Number, required: true },
  selectedSugar: { type: String, required: true },
  selectedIce: { type: String, required: true },
  selectedToppings: [{ type: String }],
  toppingsTotal: { type: Number },
});

const orderSchema = new mongoose.Schema({
  contact: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  orderingMethod: { type: String, required: true },
  timeChoice: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  items: [drinkSchema],
}, { collection: 'ORDERS' });

const GuestOrder = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default GuestOrder;
