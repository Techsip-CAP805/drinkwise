// models/guestOrderModel.js
import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  ingredientName: { type: String },
});

const sizeOptionSchema = new mongoose.Schema({
  size: { type: String}, _id: {type: String}
});

const iceLevelSchema = new mongoose.Schema({
  iceLevel: { type: Number }, 
});

const sugarLevelSchema = new mongoose.Schema({
  sugarLevel: { type: Number },
});

const drinkSchema = new mongoose.Schema({
  _id: {type: String},
  drinkID: { type: Number },
  drinkName: { type: String },
  ingredients: [ingredientSchema],
  description: { type: String },
  category: { type: String },
  sizeOptions: [sizeOptionSchema],
  iceLevelOptions: [iceLevelSchema],
  sugarLevelOptions: [sugarLevelSchema],
  onMenu: { type: Boolean, default: true },
  basePrice: { type: Number },
  imagePath: { type: String },
  quantity: { type: Number },
  selectedSugar: { type: String },
  selectedIce: { type: String },
  selectedToppings: [{ type: String }],
  toppingsTotal: { type: Number },
});

const orderSchema = new mongoose.Schema({
  contact: { type: String },
  email: { type: String },
  phone: { type: String },
  orderingMethod: { type: String },
  timeChoice: { type: String },
  paymentMethod: { type: String },
  items: [drinkSchema],
}, { collection: 'GUEST_ORDER' });

const GuestOrder = mongoose.models.GUEST_ORDER || mongoose.model('GUEST_ORDER', orderSchema);

export default GuestOrder;
