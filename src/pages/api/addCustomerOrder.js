// pages/api/addCustomerOrder.js
import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../model/customerModel';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'POST') {
        try {
            const { email, order } = req.body;

            // Find the customer by email or create a new one if not found
            const customer = await Customer.findOneAndUpdate(
                { emailAddress: email },
                { $push: { orders: order } }, // Push the order into the orders array
                { new: true, upsert: true } // Return the updated document, create if it doesn't exist
            ).exec();

            res.status(201).json({ message: 'Order added successfully', order });
        } catch (error) {
            // console.error('Error adding order:', error);
            console.log(error);
            res.status(500).json({ error: 'Failed to add order' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
