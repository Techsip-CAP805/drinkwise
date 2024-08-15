// pages/api/getCustomerByID.js
import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../model/customerModel';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'GET') {
        try {
            const {id} = req.query;
            const customer = await Customer.findOne({ _id: id }).select('-password').exec();
            res.status(200).json(customer);
        } catch (error) {
            console.error('Error fetching customer:', error);
            res.status(500).json({ error: 'Failed to fetch customer' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}