import { connectToDatabase } from '../../../lib/mongodb';
import GuestOrder from '../../../model/guestOrderModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { orderId, newStatus } = req.body;

    try {
      if (newStatus === 'rejected') {
        await GuestOrder.findByIdAndDelete(orderId);
      } else {
        await GuestOrder.findByIdAndUpdate(orderId, { orderStatus: newStatus });
      }

      res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
