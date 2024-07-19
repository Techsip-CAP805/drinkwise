import { connectToDatabase } from '../../../lib/mongodb';
import Customer from '../../../model/customerModel';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { username, emailAddress, password } = req.body;

    // Check if the email already exists
    const existingCustomer = await Customer.findOne({ emailAddress }).exec();
    if (existingCustomer) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new customer
    const newCustomer = new Customer({
      username,
      customerName: '',
      emailAddress,
      password: hashedPassword,
      preferredBranch: '',
      accountCreationDate: new Date(),
      orders: []
    });

    try {
      const savedCustomer = await newCustomer.save();
      res.status(201).json({ message: 'Customer registered successfully', customer: savedCustomer });
    } catch (error) {
      console.error('Error registering customer:', error);
      res.status(500).json({ error: 'Failed to register customer' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
