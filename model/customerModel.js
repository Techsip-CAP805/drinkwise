import mongoose from 'mongoose';


const ingredientSchema = new mongoose.Schema({
    ingredientName: { type: String },
});

const sizeOptionSchema = new mongoose.Schema({
    size: { type: String }
});

const iceLevelSchema = new mongoose.Schema({
    iceLevel: { type: Number },
});

const sugarLevelSchema = new mongoose.Schema({
    sugarLevel: { type: Number },
});

const drinkSchema = new mongoose.Schema({
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
    orderingMethod: { type: String },
    timeChoice: { type: String },
    paymentMethod: { type: String },
    items: [drinkSchema],
    orderStatus: { type: String },
    orderDate: Date,
});


const customerSchema = new mongoose.Schema({
    username: { type: String, require: true },
    customerName: { type: String },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String },
    preferredBranch: String,
    role: { type: String },
    accountCreationDate: Date,
    orders: [orderSchema],
}, { collection: 'CUSTOMER' }); // Specify the collection name here

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
