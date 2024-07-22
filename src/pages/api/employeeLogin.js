// pages/api/employeeLogin.js
import { connectToDatabase } from '../../../lib/mongodb';
import Employee from '../../../model/employeeModel';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await connectToDatabase();
      const employee = await Employee.findOne({ emailAddress: email });

      if (employee) {
        const enteredPassword = password;
        const storedPassword = employee.password;

        console.log('Entered password:', enteredPassword);
        console.log('Stored password:', storedPassword);
        console.log('Employee object:', JSON.stringify(employee, null, 2));

        if (enteredPassword === storedPassword) {
          return res.status(200).json({ message: 'Login successful' });
        } else {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
