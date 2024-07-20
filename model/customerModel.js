import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderID: String,
    orderDate: Date,
    items: [
        {
            itemName: String,
            quantity: Number,
        },
    ],
    totalAmount: Number,
});


const customerSchema = new mongoose.Schema({
    username: { type: String, require: true },
    customerName: { type: String },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferredBranch: String,
    accountCreationDate: Date,
    orders: [orderSchema],
}, { collection: 'CUSTOMER' }); // Specify the collection name here

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;