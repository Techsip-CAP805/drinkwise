// model/locationModel.js
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  branchName: { type: String, required: true },
  branchLocation: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    province: String,
    postalCode: String,
  },
  contactNumber: String,
  schedule: String,
  imagePath: String,
  unavailableDrinks: [{ drinkID: Number }],
  unavailableIngredients: [{ ingredientName: String }],
}, { collection: 'LOCATIONS' }); // Specify the collection name here

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);

export default Location;
