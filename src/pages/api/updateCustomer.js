// pages/api/updateCustomer.js
import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../model/customerModel';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'PUT') {
        try {
            const { _id, ...updateFields } = req.body;

            if (!_id) {
                return res.status(400).json({ error: 'Customer ID is required' });
            }

            const updatedCustomer = await Customer.findByIdAndUpdate(_id, updateFields, {
                new: true,
                runValidators: true,
            }).exec();

            if (!updatedCustomer) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
        } catch (error) {
            console.error('Error updating customer:', error);
            res.status(500).json({ error: 'Failed to update customer' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
