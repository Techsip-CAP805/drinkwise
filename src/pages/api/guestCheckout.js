// pages/api/guestOrder.js
import { connectToDatabase } from '../../../lib/mongodb';
import GuestOrder from '../../../model/guestOrderModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const order = new GuestOrder(req.body);
      await order.save();
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Failed to place order' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
