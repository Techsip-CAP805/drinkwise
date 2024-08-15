// pages/api/addCustomerOrder.js
import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../model/customerModel';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'POST') {
        try {
            const { customerId, order } = req.body;

            const customer = await Customer.findOne({ _id: customerId }).exec();

            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            customer.orders.push(order);

            await customer.save();

            res.status(201).json({ message: 'Order added successfully', order });
        } catch (error) {
            console.error('Error adding order:', error);
            res.status(500).json({ error: 'Failed to add order' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
