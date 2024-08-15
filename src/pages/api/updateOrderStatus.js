import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../model/customerModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { orderId, newStatus } = req.body;

    try {
      // Find the customer who has the order with the given orderId
      const customer = await Customer.findOne({ "orders._id": orderId });

      if (!customer) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Update the status of the specific order
      customer.orders.forEach(order => {
        if (order._id.toString() === orderId) {
          order.orderStatus = newStatus;
        }
      });

      await customer.save(); // Save the updated customer document

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
