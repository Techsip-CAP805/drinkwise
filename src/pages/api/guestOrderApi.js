// pages/api/guestOrderApi.js
import { connectToDatabase } from '../../../lib/mongodb';
import GuestOrder from '../../../model/guestOrderModel';
import Customer from '../../../model/customerModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const order = new GuestOrder({
        ...req.body,
        // orderStatus: 'pending', // Explicitly set orderStatus to 'pending'
      });
      await order.save();
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Failed to place order' });
    }
  } else if (req.method === 'GET') {
    try {
      const guestOrders = await GuestOrder.find({}).exec();
      const customerOrders = await Customer.find({ "orders.0": { $exists: true } }).exec();

      res.status(200).json({ guestOrders, customerOrders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
